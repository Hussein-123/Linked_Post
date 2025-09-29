import React, { useContext, useEffect } from "react";
import style from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { initFlowbite } from "flowbite";

export default function Navbar() {
  useEffect(() => {
    initFlowbite();
  }, []);

  let { token, setToken } = useContext(UserContext);
  let navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  async function getUserData() {
    const options = {
      url: "https://linked-posts.routemisr.com/users/profile-data",
      method: "GET",
      headers: {
        token,
      },
    };
    return await axios.request(options);
  }
  let { data } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    select: (data) => data?.data?.user,
  });
  return (
    <>
      <nav className="bg-white sticky top-0 dark:bg-gray-900  w-full z-20 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-700 dark:text-white">
              Linked Posts
            </span>
          </Link>
          <div className="flex gap-4 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {token !== null ? (
              <>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="size-[38px] rounded-full"
                    src={data?.photo}
                    alt={data?.photo}
                  />
                </button>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {data?.name}
                    </span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                      {data?.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <span
                        onClick={signOut}
                        className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <ul className="flex gap-4 dark:text-white text-lg md:text-xl">
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
