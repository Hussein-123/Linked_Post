import React, { useContext } from "react";
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
      <div className="w-full md:w-[90%] lg:w-[70%] mx-auto px-3 sm:px-6 mb-8 mt-12">
        <div className="surface-card p-8 space-y-5">
          <div className="flex items-center gap-4">
            <img
              src={data?.photo}
              className="size-[70px] rounded-full object-cover subtle-border"
              alt=""
            />
            <div>
              <h2 className="text-xl font-semibold">{data?.name}</h2>
              <p className="muted-text">Your public profile</p>
            </div>
          </div>
          <div className="text-slate-700 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="subtle-border rounded-lg p-3 bg-white/70">
              <p className="muted-text text-sm uppercase">Email</p>
              <p className="font-semibold">{data?.email}</p>
            </div>
            <div className="subtle-border rounded-lg p-3 bg-white/70">
              <p className="muted-text text-sm uppercase">Gender</p>
              <p className="font-semibold capitalize">{data?.gender}</p>
            </div>
            <div className="subtle-border rounded-lg p-3 bg-white/70 md:col-span-2">
              <p className="muted-text text-sm uppercase">Birthday</p>
              <p className="font-semibold">{data?.dateOfBirth}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <ChangePassword />
            <UploadProfilePicture />
          </div>
        </div>
      </div>
      <CreatePost />
      {data && <UserPosts id={data?._id} />}
    </>
  );
}
