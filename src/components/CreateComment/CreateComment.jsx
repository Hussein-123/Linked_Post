import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateComment({ postId }) {
  const { token } = useContext(UserContext);
  let queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      content: "",
      post: postId,
    },
  });

  let { register, handleSubmit } = form;

  async function addComment(value) {
    try {
      let { data } = await axios.post(
        `https://linked-posts.routemisr.com/comments`,
        value,
        {
          headers: {
            token,
          },
        }
      );
      if (data.message === "success") {
        toast.success("Comment Added Successfully");
        queryClient.invalidateQueries({
          queryKey: ["getPosts"],
        });
      }
    } catch (error) {
      toast.error("Comment Doesn't Add");
    }
  }

  return (
    <>
      <form
        className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 lg:gap-5 bg-slate-50/80 border border-slate-200 rounded-2xl px-3 py-3 sm:px-4 sm:py-3 lg:px-5 lg:py-4 shadow-sm"
        onSubmit={handleSubmit(addComment)}
      >
        <input
          {...register("content")}
          type="text"
          className="w-full sm:flex-1 input-field bg-white min-h-[46px] sm:min-h-[48px] lg:min-h-[52px]"
          placeholder="Write a comment..."
        />
        <input
          {...register("post")}
          type="hidden"
          value={postId}
          className="w-full bg-transparent"
        />
        <button
          type="submit"
          className="btn-primary comment-action sm:h-[48px] lg:h-[52px]"
        >
          Add Comment
        </button>
      </form>
    </>
  );
}
