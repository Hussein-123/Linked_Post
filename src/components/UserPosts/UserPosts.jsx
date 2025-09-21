import React, { useContext } from "react";
import style from "./UserPosts.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../../context/UserContext";
import Posts from "../Posts/Posts";

export default function UserPosts({ id }) {
  const { token } = useContext(UserContext);

  async function getUserPosts() {
    const options = {
      url: `https://linked-posts.routemisr.com/users/${id}/posts`,
      method: "GET",
      headers: {
        token,
      },
    };
    return await axios.request(options);
  }
  let { data } = useQuery({
    queryKey: ["userPosts"],
    queryFn: getUserPosts,
    select: (data) => data?.data?.posts,
  });

  return (
    <>
      <div className="w-full md:w-[80%] lg:w-[50%] px-5 mx-auto">
        {data?.map((post) => (
          <Posts postInfo={post} key={post._id} />
        ))}
      </div>
    </>
  );
}
