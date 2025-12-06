import React, { useContext } from "react";
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
      <div className="w-full md:w-[90%] lg:w-[70%] px-3 sm:px-5 mx-auto">
        <div className="surface-card p-4 sm:p-5 md:p-7 space-y-5 sm:space-y-6">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <div className="flex gap-3 sm:gap-4 items-center">
              <img
                src={data?.user.photo}
                className="size-[36px] sm:size-[48px] rounded-full object-cover subtle-border"
                alt=""
              />
              <div>
                <h3 className="text-base sm:text-lg font-semibold">
                  {data?.user.name}
                </h3>
                <h4 className="muted-text text-xs sm:text-sm md:text-base">
                  {new Date(data?.createdAt).toLocaleString()}
                </h4>
              </div>
            </div>
            <div className="shrink-0">
              <PostOptions postId={data?._id} />
            </div>
          </div>
          <div>
            {data?.body && (
              <h2 className="mb-4 sm:mb-5 text-base sm:text-lg leading-7 md:leading-8 text-slate-800">
                {data?.body}
              </h2>
            )}
            {data?.image && (
              <img src={data?.image} alt="" className="w-full rounded-lg" />
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
          <CreateComment postId={data._id} />
          {data?.comments.map((comment) => (
            <Comment commentInfo={comment} key={comment._id} />
          ))}
        </div>
      </div>
    </>
  );
}
