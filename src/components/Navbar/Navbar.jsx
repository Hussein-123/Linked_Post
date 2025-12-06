import React, { useContext, useEffect } from "react";
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
      <nav className="glass-nav sticky top-0 w-full z-30">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="pill">LP</div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-900">
              Linked Posts
            </span>
          </Link>
          <div className="flex gap-4 items-center md:order-2">
            {token !== null ? (
              <>
                <button
                  type="button"
                  className="flex text-sm bg-white subtle-border rounded-full md:me-0 focus:ring-4 focus:ring-sky-100 shadow-sm"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="size-[38px] rounded-full object-cover"
                    src={data?.photo}
                    alt={data?.photo}
                  />
                </button>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900">
                      {data?.name}
                    </span>
                    <span className="block text-sm  text-gray-500 truncate">
                      {data?.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <span
                        onClick={signOut}
                        className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <ul className="flex gap-3 text-base md:text-lg font-semibold">
                <li>
                  <NavLink
                    to="/login"
                    className="btn-ghost px-4 py-2 hover:no-underline"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="btn-primary w-auto px-4 py-2 hover:no-underline"
                  >
                    Register
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
