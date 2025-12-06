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
        className="flex gap-2 justify-between"
        onSubmit={handleSubmit(addComment)}
      >
        <input
          {...register("content")}
          type="text"
          className="w-[80%] input-field"
          placeholder="Comment ..........."
        />
        <input
          {...register("post")}
          type="hidden"
          value={postId}
          className="w-[80%] bg-transparent"
        />
        <button type="submit" className="btn-ghost">
          Add Comment
        </button>
      </form>
    </>
  );
}
