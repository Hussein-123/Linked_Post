import React, { useContext } from "react";
import style from "./Comment.module.css";
import user from "../../assets/user.png";
import { UserContext } from "../../context/UserContext";
import CommentOptions from "../CommentOptions/CommentOptions";

export default function Comment({ commentInfo }) {
  const { userId } = useContext(UserContext);
  return (
    <>
      <div className="my-3 p-3 bg-slate-100 rounded-lg space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <img
              onError={(e) => {
                e.target.src = user;
              }}
              src={commentInfo?.commentCreator.photo}
              className="size-[40px] rounded-full"
              alt=""
            />
            <div>
              <h3 className="text-md font-medium">
                {commentInfo?.commentCreator.name}
              </h3>
              <h4 className="text-slate-500">
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
        <p>{commentInfo?.content}</p>
      </div>
    </>
  );
}
