import React, { useContext } from "react";
import style from "./Profile.module.css";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import UserPosts from "../UserPosts/UserPosts";
import ChangePassword from "../ChangePassword/ChangePassword";
import UploadProfilePicture from "./../uploadProfilePicture/uploadProfilePicture";
import CreatePost from "../CreatePost/CreatePost";

export default function Profile() {
  const { token } = useContext(UserContext);

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
      <div className="w-full md:w-[80%] lg:w-[50%] mx-auto px-5 mb-6">
        <div className="border-2 border-slate-300 rounded-lg p-5 space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={data?.photo}
              className="size-[60px] rounded-full"
              alt=""
            />
            <h2 className="text-xl">{data?.name}</h2>
          </div>
          <div className="text-slate-600 flex justify-between flex-wrap">
            <h2>Email: {data?.email}</h2>
            <h2>Gender: {data?.gender}</h2>
            <h2>Birthday: {data?.dateOfBirth}</h2>
          </div>
          <div className="flex flex-col gap-2">
            <ChangePassword />
            <UploadProfilePicture />
          </div>
        </div>
      </div>
      {data && <UserPosts id={data?._id} />}
    </>
  );
}
