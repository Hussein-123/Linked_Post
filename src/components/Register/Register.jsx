import React, { useState } from "react";
import style from "./Register.module.css";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [accountExistError, setAccountExistError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const schema = z
    .object({
      name: z
        .string()
        .nonempty("Name is Required")
        .min(3, "Name must be at least 3 char")
        .max(20, "Maximum number of char is 20"),
      email: z.email("Invalid Email").nonempty("Email is Required"),
      password: z
        .string()
        .nonempty("Password is Required")
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
        ),
      rePassword: z.string().nonempty("RePassword is Required"),
      dateOfBirth: z
        .string()
        .nonempty("Date is Required")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid Date")
        .refine((date) => {
          const userDate = new Date(date);
          const nowDate = new Date();
          nowDate.setHours(0, 0, 0, 0);
          return userDate < nowDate;
        }, "Can't be Future date"),
      gender: z.string().nonempty("Gender is Required"),
    })
    .refine((object) => object.password === object.rePassword, {
      error: "Password and rePassword not Matched",
      path: ["rePassword"],
    });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
  });

  let { register, handleSubmit, formState } = form;

  async function handleRegister(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        `https://linked-posts.routemisr.com/users/signup`,
        values
      );
      if (data.message === "success") {
        toast.success("Account Created Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.error);
      setAccountExistError(error.response.data.error);
    }
  }

  return (
    <>
      <h1 className="text-center text-4xl text-blue-700 font-medium">
        Register
      </h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="w-full md:w-[80%] lg:w-[45%] mx-auto my-14 px-5"
      >
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Name"
          />
          {formState.errors.name && formState.touchedFields.name ? (
            <p className="text-red-500 font-semibold">
              {formState.errors.name.message}
            </p>
          ) : (
            ""
          )}
        </div>
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
          {accountExistError && (
            <p className="text-red-500 font-semibold">{accountExistError}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "password" : "text"}
              {...register("password")}
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Your Password"
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-slate-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>
          </div>
          {formState.errors.password && formState.touchedFields.password ? (
            <p className="text-red-500 font-semibold">
              {formState.errors.password.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "password" : "text"}
              {...register("rePassword")}
              id="rePassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Confirm Password"
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-slate-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>
          </div>
          {formState.errors.rePassword && formState.touchedFields.rePassword ? (
            <p className="text-red-500 font-semibold">
              {formState.errors.rePassword.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="flex gap-4">
          <div className="mb-5 w-1/2">
            <label
              htmlFor="dateOfBirth"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Birthday
            </label>
            <input
              {...register("dateOfBirth")}
              type="date"
              id="dateOfBirth"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Your Birthday"
            />
            {formState.errors.dateOfBirth &&
            formState.touchedFields.dateOfBirth ? (
              <p className="text-red-500 font-semibold">
                {formState.errors.dateOfBirth.message}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-5 w-1/2">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select Your Gender
            </label>
            <select
              {...register("gender")}
              id="gender"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue={""} disabled>
                Choose Your Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {formState.errors.gender && formState.touchedFields.gender ? (
              <p className="text-red-500 font-semibold">
                {formState.errors.gender.message}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? (
            <i className="fa-solid fa-circle-notch fa-spin text-white"></i>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </>
  );
}
