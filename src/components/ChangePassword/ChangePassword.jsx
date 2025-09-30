import React, { useContext, useEffect, useState } from "react";
import style from "./ChangePassword.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { initFlowbite } from "flowbite";

export default function ChangePassword() {
  useEffect(() => {
    initFlowbite();
  }, []);
  const { token } = useContext(UserContext);
  const schema = z.object({
    password: z
      .string()
      .nonempty("Password is Required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    newPassword: z
      .string()
      .nonempty("New Password is Required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });
  const form = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(schema),
  });
  let { register, handleSubmit, formState } = form;

  async function handleChangePassword(values) {
    try {
      let { data } = await axios.patch(
        `https://linked-posts.routemisr.com/users/change-password`,
        values,
        {
          headers: {
            token,
          },
        }
      );
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        toast.success("Password is change");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <>
      <div>
        <button
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
          type="button"
        >
          Change Password
        </button>
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 left-0 w-full h-full z-50 justify-center items-center md:inset-0 max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Change Password
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <i className="fas fa-close"></i>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form
                  className="space-y-4"
                  onSubmit={handleSubmit(handleChangePassword)}
                >
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
                    {formState.errors.password &&
                    formState.touchedFields.password ? (
                      <p className="text-red-500 font-semibold">
                        {formState.errors.password.message}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        {...register("newPassword")}
                        id="newPassword"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2 text-slate-400"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <i className="fa-solid fa-eye-slash"></i>
                        ) : (
                          <i className="fa-solid fa-eye"></i>
                        )}
                      </button>
                    </div>
                    {formState.errors.newPassword &&
                    formState.touchedFields.newPassword ? (
                      <p className="text-red-500 font-semibold">
                        {formState.errors.newPassword.message}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                  >
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
