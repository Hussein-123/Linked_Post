import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [accountExistError, setAccountExistError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { token, setToken } = useContext(UserContext);

  const schema = z.object({
    email: z.email("Invalid Email").nonempty("Email is Required"),
    password: z
      .string()
      .nonempty("Password is Required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  let { register, handleSubmit, formState } = form;

  async function handleLogin(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        `https://linked-posts.routemisr.com/users/signin`,
        values
      );
      if (data.message === "success") {
        toast.success("Login Successfully");
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.error);
      setAccountExistError(error.response.data.error);
    }
  }

  return (
    <>
      <h1 className="text-center text-4xl text-blue-700 font-medium">Login</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="max-w-md md:max-w-xl mx-auto my-14"
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Email"
          />
          {formState.errors.email && formState.touchedFields.email ? (
            <p className="text-red-500 font-semibold">
              {formState.errors.email.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Password"
          />
          {formState.errors.password && formState.touchedFields.password ? (
            <p className="text-red-500 font-semibold">
              {formState.errors.password.message}
            </p>
          ) : (
            ""
          )}
          {accountExistError && (
            <p className="text-red-500 font-semibold text-center">
              {accountExistError}
            </p>
          )}
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? (
            <i className="fa-solid fa-circle-notch fa-spin text-white"></i>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </>
  );
}
