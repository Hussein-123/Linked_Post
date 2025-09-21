import React, { useContext } from "react";
import style from "./PostDetails.module.css";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import Comment from "../Comment/Comment";
import PostOptions from "../PostOptions/PostOptions";
import CreateComment from "../CreateComment/CreateComment";

export default function PostDetails() {
  let { id } = useParams();
  const { token } = useContext(UserContext);

  async function getSinglePost() {
    const options = {
      url: `https://linked-posts.routemisr.com/posts/${id}`,
      method: "GET",
      headers: {
        token,
      },
    };
    return await axios.request(options);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["getSinglePost"],
    queryFn: getSinglePost,
    select: (data) => data?.data?.post,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full md:w-[80%] lg:w-[50%]  p-5 mx-auto">
        <div className="bg-white p-5 rounded-lg space-y-5 shadow-md">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <img
                src={data?.user.photo}
                className="size-[50px] rounded-full"
                alt=""
              />
              <div>
                <h3 className="text-lg font-semibold">{data?.user.name}</h3>
                <h4 className="text-slate-500">{data?.createdAt}</h4>
              </div>
            </div>
            <div>
              <PostOptions />
            </div>
          </div>
          <div>
            {data?.body && <h2 className="mb-4">{data?.body}</h2>}
            {data?.image && (
              <img src={data?.image} alt="" className="w-full rounded-lg" />
            )}
          </div>
          <div className="flex justify-between px-4 text-slate-600">
            <div className="flex gap-2 items-center cursor-pointer">
              <i className="fa-solid fa-thumbs-up text-xl"></i>
              <h5 className="text-lg">Like</h5>
            </div>
            <div className="flex gap-2 items-center cursor-pointer">
              <i className="fa-solid fa-comment text-xl"></i>
              <h5 className="text-lg">Comment</h5>
            </div>
            <div className="flex gap-2 items-center cursor-pointer">
              <i className="fa-solid fa-share text-xl"></i>
              <h5 className="text-lg">Share</h5>
            </div>
          </div>
          <div className="border-b border-b-slate-300"></div>
          <CreateComment postId={data._id} />
          {data?.comments.map((comment) => (
            <Comment commentInfo={comment} key={comment._id} />
          ))}
        </div>
      </div>
    </>
  );
}
