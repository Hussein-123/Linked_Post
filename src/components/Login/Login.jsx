import React, { useContext, useState } from "react";
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
  const [showPassword, setShowPassword] = useState(true);

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
      <div className="w-full md:w-[75%] lg:w-[50%] mx-auto my-12 px-4">
        <div className="surface-card p-8 space-y-6 text-center">
          <div className="space-y-2">
            <div className="pill justify-center mx-auto w-fit">
              Welcome back
            </div>
            <h1 className="section-title">Sign in to continue</h1>
            <p className="muted-text text-sm">Access your feed & share posts</p>
          </div>

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="space-y-4 text-left"
          >
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-800"
              >
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="input-field"
                placeholder="Enter your email"
              />
              {formState.errors.email && formState.touchedFields.email ? (
                <p className="text-red-500 font-semibold">
                  {formState.errors.email.message}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-800"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "password" : "text"}
                  {...register("password")}
                  id="password"
                  className="input-field pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-slate-400"
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
              {accountExistError && (
                <p className="text-red-500 font-semibold text-center">
                  {accountExistError}
                </p>
              )}
            </div>
            <button disabled={isLoading} type="submit" className="btn-primary">
              {isLoading ? (
                <i className="fa-solid fa-circle-notch fa-spin text-white"></i>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
