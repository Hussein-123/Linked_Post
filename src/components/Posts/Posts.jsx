import React from "react";
import style from "./Posts.module.css";
import Comment from "../Comment/Comment";
import { Link } from "react-router-dom";
import CreateComment from "../CreateComment/CreateComment";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import PostOptions from "../PostOptions/PostOptions";

export default function Posts({ postInfo }) {
  const { userId } = useContext(UserContext);

  return (
    <>
      <div className="bg-white p-5 rounded-lg mb-7 space-y-5 shadow-md">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <img
              src={postInfo?.user.photo}
              className="size-[50px] rounded-full"
              alt=""
            />
            <div>
              <h3 className="text-lg font-semibold">{postInfo?.user.name}</h3>
              <h4 className="text-slate-500">
                {new Date(postInfo?.createdAt).toLocaleString()}
              </h4>
            </div>
          </div>
          {userId == postInfo.user._id ? (
            <PostOptions postId={postInfo.id} />
          ) : (
            ""
          )}
        </div>
        <div>
          {postInfo?.body && <h2 className="mb-4">{postInfo?.body}</h2>}
          {postInfo?.image && (
            <img src={postInfo?.image} alt="" className="w-full rounded-lg" />
          )}
        </div>
        <div className="flex justify-between md:px-4 text-slate-600">
          <div className="flex gap-1 items-center cursor-pointer">
            <i className="fa-solid fa-thumbs-up text-xl"></i>
            <h5 className="text-lg">Like</h5>
          </div>
          <div className="flex gap-1 items-center cursor-pointer">
            <i className="fa-solid fa-comment text-xl"></i>
            <h5 className="text-lg">Comment</h5>
          </div>
          <div className="flex gap-1 items-center cursor-pointer">
            <i className="fa-solid fa-share text-xl"></i>
            <h5 className="text-lg">Share</h5>
          </div>
        </div>
        <div className="border-b border-b-slate-300"></div>
        <CreateComment postId={postInfo?.id} />
        {postInfo?.comments.length > 0 && (
          <Comment commentInfo={postInfo?.comments[0]} />
        )}
        <Link
          to={`/postdetails/${postInfo?.id}`}
          className="text-blue-600 font-semibold"
        >
          View More Comments
        </Link>
      </div>
    </>
  );
}
