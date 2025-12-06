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
      <div className="w-full md:w-[90%] lg:w-[70%] px-3 sm:px-6 mx-auto mb-10 mt-12">
        <div className="p-8 surface-card">
          <form onSubmit={handleSubmit(addPost)}>
            <div className="flex justify-between items-center gap-3 mb-6">
              <input
                {...register("body")}
                type="text"
                placeholder="What's on your mind?"
                className="input-field"
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
            <button className="btn-primary">Add Post</button>
          </form>
        </div>
      </div>
    </>
  );
}
