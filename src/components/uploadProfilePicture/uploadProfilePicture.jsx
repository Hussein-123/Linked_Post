import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function UploadProfilePicture() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalButtonRef = useRef(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      modalButtonRef.current?.focus();
    }, 100);
  };

  let queryClient = useQueryClient();
  const { token } = useContext(UserContext);

  const form = useForm({
    defaultValues: {
      photo: "",
    },
  });
  let { register, handleSubmit, reset } = form;

  const [preview, setPreview] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  async function uploadProfilePicture(values) {
    let formData = new FormData();
    formData.append("photo", values.photo[0]);
    try {
      let { data } = await axios.put(
        `https://linked-posts.routemisr.com/users/upload-photo`,
        formData,
        {
          headers: {
            token,
          },
        }
      );
      if (data.message === "success") {
        toast.success("Profile Image changed");
        queryClient.invalidateQueries({ queryKey: ["userData"] });
        queryClient.invalidateQueries({ queryKey: ["userPosts"] });
        reset();
        setPreview(null);
        closeModal();
      }
    } catch (error) {
      toast.error("Image must be JPG, JPEG, or PNG");
    }
  }

  return (
    <>
      <div>
        <button
          ref={modalButtonRef}
          onClick={() => setIsModalOpen(true)}
          className="btn-primary w-full"
          type="button"
        >
          Upload Profile Picture
        </button>

        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden={!isModalOpen}
          className={`
            ${isModalOpen ? "flex bg-black/50" : "hidden"} 
            overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center max-h-full
            /* FIX: Replaced complex positioning (top-0 right-0 left-0 w-full h-[calc(100%-1rem)]) with robust 'inset-0' to guarantee full-screen backdrop coverage. */
          `}
        >
          {isModalOpen && (
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Upload Picture
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-4 md:p-5 space-y-4">
                  <form
                    className="space-y-4"
                    onSubmit={handleSubmit(uploadProfilePicture)}
                  >
                    <div className="flex flex-col items-center justify-center w-full gap-4">
                      <label
                        htmlFor="photo"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 overflow-hidden"
                      >
                        {preview ? (
                          <img
                            src={preview}
                            alt="Preview"
                            className="object-contain w-full h-full"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG or JPEG (MAX. 800x400px)
                            </p>
                          </div>
                        )}
                        <input
                          {...register("photo", {
                            onChange: handleFileChange,
                          })}
                          id="photo"
                          type="file"
                          accept="image/png, image/jpeg, image/jpg"
                          className="hidden"
                        />
                      </label>
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Upload Photo
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
