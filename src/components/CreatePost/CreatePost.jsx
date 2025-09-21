import React, { useContext } from "react";
import style from "./CreatePost.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function CreatePost() {
  const { token } = useContext(UserContext);

  const form = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });
  let { register, handleSubmit } = form;
  let queryClient = useQueryClient();
  async function addPost(values) {
    let formData = new FormData();
    formData.append("body", values.body);
    formData.append("image", values.image[0]);
    try {
      let { data } = await axios.post(
        "https://linked-posts.routemisr.com/posts",
        formData,
        {
          headers: {
            token,
          },
        }
      );
      if (data.message === "success") {
        toast.success("Post add successfully");
        queryClient.invalidateQueries({ queryKey: ["getPosts"] });
      }
    } catch (error) {
      toast.error("Image must be JPG , JPEG , PNG");
    }
  }
  return (
    <>
      <div className="w-full md:w-[80%] lg:w-[50%] px-5 mx-auto mb-9">
        <div className="p-5 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit(addPost)}>
            <div className="flex justify-between items-center gap-4 mb-4">
              <input
                {...register("body")}
                type="text"
                placeholder="What's on your mind?"
                className="bg-slate-100 rounded-4xl border-slate-400 w-full"
              />
              <div>
                <label htmlFor="photo">
                  <i className="fa-solid fa-images fa-xl text-green-600 cursor-pointer"></i>
                </label>
                <input
                  {...register("image")}
                  type="file"
                  id="photo"
                  className="hidden"
                />
              </div>
            </div>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
              Add Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
