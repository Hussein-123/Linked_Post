import React, { useState } from "react";
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
      <div className="w-full md:w-[75%] lg:w-[55%] mx-auto my-12 px-4">
        <div className="surface-card p-8 space-y-6 text-center">
          <div className="space-y-2">
            <div className="pill justify-center mx-auto w-fit">
              Join the community
            </div>
            <h1 className="section-title">Create your account</h1>
          </div>

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="space-y-4 text-left"
          >
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-800"
              >
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className="input-field"
                placeholder="Enter your name"
              />
              {formState.errors.name && formState.touchedFields.name ? (
                <p className="text-red-500 font-semibold">
                  {formState.errors.name.message}
                </p>
              ) : (
                ""
              )}
            </div>
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
              {accountExistError && (
                <p className="text-red-500 font-semibold">
                  {accountExistError}
                </p>
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
            </div>
            <div className="space-y-2">
              <label
                htmlFor="rePassword"
                className="block text-sm font-semibold text-slate-800"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "password" : "text"}
                  {...register("rePassword")}
                  id="rePassword"
                  className="input-field pr-12"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-slate-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </button>
              </div>
              {formState.errors.rePassword &&
              formState.touchedFields.rePassword ? (
                <p className="text-red-500 font-semibold">
                  {formState.errors.rePassword.message}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="w-full md:w-1/2 space-y-2">
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-semibold text-slate-800"
                >
                  Birthday
                </label>
                <input
                  {...register("dateOfBirth")}
                  type="date"
                  id="dateOfBirth"
                  className="input-field"
                  placeholder="Enter your birthday"
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
              <div className="w-full md:w-1/2 space-y-2">
                <label
                  htmlFor="gender"
                  className="block text-sm font-semibold text-slate-800"
                >
                  Gender
                </label>
                <select
                  {...register("gender")}
                  id="gender"
                  className="input-field"
                >
                  <option defaultValue={""} disabled>
                    Choose your gender
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
            <button disabled={isLoading} type="submit" className="btn-primary">
              {isLoading ? (
                <i className="fa-solid fa-circle-notch fa-spin text-white"></i>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
