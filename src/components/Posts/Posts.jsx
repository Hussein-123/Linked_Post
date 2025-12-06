import React from "react";
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
      <div className="surface-card p-8 mb-9 space-y-6">
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <img
              src={postInfo?.user.photo}
              className="size-[60px] rounded-full object-cover subtle-border"
              alt=""
            />
            <div>
              <h3 className="text-lg font-semibold">{postInfo?.user.name}</h3>
              <h4 className="muted-text text-sm md:text-base">
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
          {postInfo?.body && (
            <h2 className="mb-5 text-lg leading-7 md:leading-8 text-slate-800">
              {postInfo?.body}
            </h2>
          )}
          {postInfo?.image && (
            <img src={postInfo?.image} alt="" className="w-full rounded-lg" />
          )}
        </div>
        <div className="flex justify-between md:px-2 text-slate-600">
          <div className="flex gap-3 items-center cursor-pointer hover:text-sky-700 transition-colors">
            <i className="fa-solid fa-thumbs-up text-xl"></i>
            <h5 className="text-base md:text-lg font-semibold">Like</h5>
          </div>
          <div className="flex gap-3 items-center cursor-pointer hover:text-sky-700 transition-colors">
            <i className="fa-solid fa-comment text-xl"></i>
            <h5 className="text-base md:text-lg font-semibold">Comment</h5>
          </div>
          <div className="flex gap-3 items-center cursor-pointer hover:text-sky-700 transition-colors">
            <i className="fa-solid fa-share text-xl"></i>
            <h5 className="text-base md:text-lg font-semibold">Share</h5>
          </div>
        </div>
        <div className="border-b border-b-slate-300"></div>
        <CreateComment postId={postInfo?.id} />
        {postInfo?.comments.length > 0 && (
          <Comment commentInfo={postInfo?.comments[0]} />
        )}
        <Link to={`/postdetails/${postInfo?.id}`} className="accent-link">
          View More Comments
        </Link>
      </div>
    </>
  );
}
