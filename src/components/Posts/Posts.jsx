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
      <div className="surface-card p-4 sm:p-5 md:p-7 mb-8 space-y-5 sm:space-y-6">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex gap-3 sm:gap-4 items-center">
            <img
              src={postInfo?.user.photo}
              className="size-[36px] sm:size-[48px] rounded-full object-cover subtle-border"
              alt=""
            />
            <div>
              <h3 className="text-base sm:text-lg font-semibold">
                {postInfo?.user.name}
              </h3>
              <h4 className="muted-text text-xs sm:text-sm md:text-base">
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
            <h2 className="mb-4 sm:mb-5 text-base sm:text-lg leading-7 md:leading-8 text-slate-800">
              {postInfo?.body}
            </h2>
          )}
          {postInfo?.image && (
            <img src={postInfo?.image} alt="" className="w-full rounded-lg" />
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 md:px-2 text-slate-600">
          <div className="flex items-center justify-center gap-2 py-2 rounded-lg cursor-pointer hover:bg-slate-50 hover:text-sky-700 transition-colors">
            <i className="fa-solid fa-thumbs-up text-base sm:text-lg md:text-xl"></i>
            <h5 className="text-sm sm:text-base md:text-lg font-semibold">
              Like
            </h5>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 rounded-lg cursor-pointer hover:bg-slate-50 hover:text-sky-700 transition-colors">
            <i className="fa-solid fa-comment text-base sm:text-lg md:text-xl"></i>
            <h5 className="text-sm sm:text-base md:text-lg font-semibold">
              Comment
            </h5>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 rounded-lg cursor-pointer hover:bg-slate-50 hover:text-sky-700 transition-colors">
            <i className="fa-solid fa-share text-base sm:text-lg md:text-xl"></i>
            <h5 className="text-sm sm:text-base md:text-lg font-semibold">
              Share
            </h5>
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
