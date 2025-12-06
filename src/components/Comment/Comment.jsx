import React, { useContext } from "react";
import user from "../../assets/user.png";
import { UserContext } from "../../context/UserContext";
import CommentOptions from "../CommentOptions/CommentOptions";

export default function Comment({ commentInfo }) {
  const { userId } = useContext(UserContext);
  return (
    <>
      <div className="my-3 p-3 subtle-border rounded-lg bg-white/70 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <img
              onError={(e) => {
                e.target.src = user;
              }}
              src={commentInfo?.commentCreator.photo}
              className="size-[40px] rounded-full object-cover subtle-border"
              alt=""
            />
            <div>
              <h3 className="text-base font-semibold">
                {commentInfo?.commentCreator.name}
              </h3>
              <h4 className="muted-text text-base">
                {new Date(commentInfo?.createdAt).toLocaleString()}
              </h4>
            </div>
          </div>
          {userId == commentInfo.commentCreator._id ? (
            <CommentOptions commentId={commentInfo._id} />
          ) : (
            ""
          )}
        </div>
        <p className="text-slate-800 text-base leading-7">
          {commentInfo?.content}
        </p>
      </div>
    </>
  );
}
