import React, { useContext } from "react";
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

    if (values.image[0]) {
      formData.append("image", values.image[0]);
    }

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
      <div className="w-full md:w-[90%] lg:w-[70%] px-3 sm:px-5 mx-auto mb-10 mt-10">
        <div className="p-5 sm:p-6 md:p-8 surface-card">
          <form onSubmit={handleSubmit(addPost)}>
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
              <input
                {...register("body")}
                type="text"
                placeholder="What's on your mind?"
                className="input-field"
              />
              <div className="shrink-0 flex items-center justify-center">
                <label htmlFor="photo" className="cursor-pointer">
                  <i className="fa-solid fa-images fa-xl text-green-600"></i>
                </label>
                <input
                  {...register("image")}
                  type="file"
                  id="photo"
                  className="hidden"
                />
              </div>
            </div>
            <button className="btn-primary">Add Post</button>
          </form>
        </div>
      </div>
    </>
  );
}
