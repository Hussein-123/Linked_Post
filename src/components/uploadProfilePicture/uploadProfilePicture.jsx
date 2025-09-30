// import React, { useContext, useEffect } from "react";
// import style from "./uploadProfilePicture.module.css";
// import { UserContext } from "../../context/UserContext";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { initFlowbite } from "flowbite";
// import { useQueryClient } from "@tanstack/react-query";

// export default function UploadProfilePicture() {
//   useEffect(() => {
//     initFlowbite();
//   }, []);

//   let queryClient = useQueryClient();
//   const { token } = useContext(UserContext);

//   const form = useForm({
//     defaultValues: {
//       photo: "",
//     },
//   });
//   let { register, handleSubmit } = form;

//   async function uploadProfilePicture(values) {
//     let formData = new FormData();
//     formData.append("photo", values.photo[0]);
//     try {
//       let { data } = await axios.put(
//         `https://linked-posts.routemisr.com/users/upload-photo`,
//         formData,
//         {
//           headers: {
//             token,
//           },
//         }
//       );
//       if (data.message === "success") {
//         toast.success("Profile Image is change");
//         queryClient.invalidateQueries({ queryKey: ["userData", "userPosts"] });
//       }
//     } catch (error) {
//       toast.error("Image must be JPG , JPEG , PNG");
//     }
//   }

//   return (
//     <>
//       <div>
//         <button
//           data-modal-target="default-modal"
//           data-modal-toggle="default-modal"
//           className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full cursor-pointer"
//           type="button"
//         >
//           Upload Profile Picture
//         </button>
//         <div
//           id="default-modal"
//           tabIndex={-1}
//           aria-hidden="true"
//           className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
//         >
//           <div className="relative p-4 w-full max-w-2xl max-h-full">
//             <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
//               <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                   Upload Picture
//                 </h3>
//                 <button
//                   type="button"
//                   className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                   data-modal-hide="default-modal"
//                 >
//                   <svg
//                     className="w-3 h-3"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 14 14"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                     />
//                   </svg>
//                   <span className="sr-only">Close modal</span>
//                 </button>
//               </div>
//               <div className="p-4 md:p-5 space-y-4">
//                 <form
//                   className="space-y-4"
//                   onSubmit={handleSubmit(uploadProfilePicture)}
//                 >
//                   <div className="flex items-center justify-center w-full">
//                     <label
//                       htmlFor="photo"
//                       className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
//                     >
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <svg
//                           className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//                           aria-hidden="true"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 20 16"
//                         >
//                           <path
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                           />
//                         </svg>
//                         <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                           <span className="font-semibold">Click to upload</span>{" "}
//                           or drag and drop
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                           PNG, JPG or JPEG (MAX. 800x400px)
//                         </p>
//                       </div>
//                       <input
//                         {...register("photo")}
//                         id="photo"
//                         type="file"
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
//                   >
//                     Upload Photo
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useContext, useEffect, useState } from "react";
import style from "./uploadProfilePicture.module.css";
import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { initFlowbite } from "flowbite";
import { useQueryClient } from "@tanstack/react-query";

export default function UploadProfilePicture() {
  useEffect(() => {
    initFlowbite();
  }, []);

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
      }
    } catch (error) {
      toast.error("Image must be JPG, JPEG, or PNG");
    }
  }

  return (
    <>
      <div>
        <button
          data-modal-target="default-modal"
          data-modal-toggle="default-modal"
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full cursor-pointer"
          type="button"
        >
          Upload Profile Picture
        </button>
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Upload Picture
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
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
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                  >
                    Upload Photo
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
