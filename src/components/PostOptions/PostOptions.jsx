// import React, { useContext, useEffect } from "react";
// import style from "./PostOptions.module.css";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { UserContext } from "../../context/UserContext";
// import { initFlowbite } from "flowbite";
// import { useForm } from "react-hook-form";
// import { useQueryClient } from "@tanstack/react-query";

// export default function PostOptions({ postId }) {
//   useEffect(() => {
//     initFlowbite();
//   }, []);

//   const { token } = useContext(UserContext);
//   let queryClient = useQueryClient();

//   async function deletePost() {
//     try {
//       let { data } = await axios.delete(
//         `https://linked-posts.routemisr.com/posts/${postId}`,
//         {
//           headers: {
//             token,
//           },
//         }
//       );
//       if (data.message === "success") {
//         toast.success("Post deleted successfully");
//         queryClient.invalidateQueries({ queryKey: ["getPosts"] });
//       }
//     } catch (error) {
//       toast.error(error.data.error);
//     }
//   }

//   const form = useForm({
//     defaultValues: {
//       body: "",
//       image: "",
//     },
//   });
//   let { register, handleSubmit } = form;

//   async function updatePost(values) {
//     let formData = new FormData();
//     formData.append("body", values.body);

//     if (values.image && values.image.length > 0) {
//       formData.append("image", values.image[0]);
//     } else {
//       toast.error("Please select an image before updating.");
//     }
//     try {
//       let { data } = await axios.put(
//         `https://linked-posts.routemisr.com/posts/${postId}`,
//         formData,
//         {
//           headers: {
//             token,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       if (data.message === "success") {
//         toast.success("Post updated successfully");
//         queryClient.invalidateQueries({ queryKey: ["getPosts"] });
//       }
//     } catch (error) {
//       toast.error(error.data.error);
//     }
//   }

//   return (
//     <>
//       <button
//         id="dropdownMenuIconButton"
//         data-dropdown-toggle={"dropdown" + postId}
//         className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 dark:text-white dark:bg-gray-800 cursor-pointer"
//         type="button"
//       >
//         <svg
//           className="w-5 h-5"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 4 15"
//         >
//           <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
//         </svg>
//       </button>
//       <div
//         id={"dropdown" + postId}
//         className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
//       >
//         <ul
//           className="py-2 text-sm text-gray-700 dark:text-gray-200"
//           aria-labelledby="dropdownMenuIconButton"
//         >
//           <li
//             data-modal-target="modal"
//             data-modal-toggle="modal"
//             className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
//           >
//             <i className="fa-solid fa-pen me-2"></i> Update
//           </li>
//           <li
//             onClick={deletePost}
//             className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
//           >
//             <i className="fa-solid fa-trash me-2"></i> Delete
//           </li>
//         </ul>
//       </div>
//       <div
//         id="modal"
//         tabIndex={-1}
//         aria-hidden="true"
//         className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
//       >
//         <div className="relative p-4 w-full max-w-2xl max-h-full">
//           <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
//             <form onSubmit={handleSubmit(updatePost)}>
//               <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                   Update Post
//                 </h3>
//                 <button
//                   type="button"
//                   className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                   data-modal-hide="modal"
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
//                 <input
//                   {...register("body")}
//                   type="text"
//                   placeholder="What's on your mind?"
//                   className="bg-slate-100 rounded-4xl border-slate-400 w-full"
//                 />

//                 <div className="flex items-center justify-center w-full">
//                   <label
//                     htmlFor="photo"
//                     className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
//                   >
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <svg
//                         className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 20 16"
//                       >
//                         <path
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                         />
//                       </svg>
//                       <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                         <span className="font-semibold">Click to upload</span>{" "}
//                         or drag and drop
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         PNG, JPG or JPEG (MAX. 800x400px)
//                       </p>
//                     </div>
//                     <input
//                       {...register("image")}
//                       id="photo"
//                       type="file"
//                       className="hidden"
//                     />
//                   </label>
//                 </div>
//               </div>
//               <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
//                 <button
//                   data-modal-hide="modal"
//                   type="submit"
//                   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
//                 >
//                   Update
//                 </button>
//                 <button
//                   data-modal-hide="modal"
//                   type="button"
//                   className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
//                 >
//                   Decline
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// import React, { useContext, useEffect, useState } from "react";
// import style from "./PostOptions.module.css";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { UserContext } from "../../context/UserContext";
// import { initFlowbite } from "flowbite";
// import { useForm } from "react-hook-form";
// import { useQueryClient } from "@tanstack/react-query";

// export default function PostOptions({ postId }) {
//   useEffect(() => {
//     initFlowbite();
//   }, []);

//   const { token } = useContext(UserContext);
//   let queryClient = useQueryClient();

//   const [file, setFile] = useState(null);

//   async function deletePost() {
//     try {
//       let { data } = await axios.delete(
//         `https://linked-posts.routemisr.com/posts/${postId}`,
//         {
//           headers: {
//             token,
//           },
//         }
//       );
//       if (data.message === "success") {
//         toast.success("Post deleted successfully");
//         queryClient.invalidateQueries({ queryKey: ["getPosts"] });
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Delete failed");
//     }
//   }

//   const form = useForm({
//     defaultValues: {
//       body: "",
//     },
//   });
//   let { register, handleSubmit } = form;

//   async function updatePost(values) {
//     let formData = new FormData();
//     formData.append("body", values.body);

//     if (file) {
//       formData.append("image", file);
//     }

//     for (let [key, val] of formData.entries()) {
//       console.log(key, val);
//     }

//     try {
//       let { data } = await axios.put(
//         `https://linked-posts.routemisr.com/posts/${postId}`,
//         formData,
//         {
//           headers: {
//             token,
//           },
//         }
//       );
//       if (data.message === "success") {
//         toast.success("Post updated successfully");
//         queryClient.invalidateQueries({ queryKey: ["getPosts"] });
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Update failed");
//     }
//   }

//   return (
//     <>
//       <button
//         id="dropdownMenuIconButton"
//         data-dropdown-toggle={"dropdown" + postId}
//         className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 dark:text-white dark:bg-gray-800 cursor-pointer"
//         type="button"
//       >
//         <svg
//           className="w-5 h-5"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 4 15"
//         >
//           <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
//         </svg>
//       </button>
//       <div
//         id={"dropdown" + postId}
//         className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
//       >
//         <ul
//           className="py-2 text-sm text-gray-700 dark:text-gray-200"
//           aria-labelledby="dropdownMenuIconButton"
//         >
//           <li
//             data-modal-target="modal"
//             data-modal-toggle="modal"
//             className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
//           >
//             <i className="fa-solid fa-pen me-2"></i> Update
//           </li>
//           <li
//             onClick={deletePost}
//             className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
//           >
//             <i className="fa-solid fa-trash me-2"></i> Delete
//           </li>
//         </ul>
//       </div>
//       <div
//         id="modal"
//         tabIndex={-1}
//         aria-hidden="true"
//         className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
//       >
//         <div className="relative p-4 w-full max-w-2xl max-h-full">
//           <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
//             <form onSubmit={handleSubmit(updatePost)}>
//               <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                   Update Post
//                 </h3>
//                 <button
//                   type="button"
//                   className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                   data-modal-hide="modal"
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
//                 <input
//                   {...register("body")}
//                   type="text"
//                   placeholder="What's on your mind?"
//                   className="bg-slate-100 rounded-4xl border-slate-400 w-full"
//                 />

//                 <div className="flex items-center justify-center w-full">
//                   <label
//                     htmlFor="photo"
//                     className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
//                   >
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <svg
//                         className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 20 16"
//                       >
//                         <path
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                         />
//                       </svg>
//                       <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                         <span className="font-semibold">Click to upload</span>{" "}
//                         or drag and drop
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         PNG, JPG or JPEG (MAX. 800x400px)
//                       </p>
//                     </div>
//                     <input
//                       id="photo"
//                       type="file"
//                       className="hidden"
//                       onChange={(e) => setFile(e.target.files[0])}
//                     />
//                   </label>
//                 </div>
//               </div>
//               <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
//                 <button
//                   data-modal-hide="modal"
//                   type="submit"
//                   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
//                 >
//                   Update
//                 </button>
//                 <button
//                   data-modal-hide="modal"
//                   type="button"
//                   className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
//                 >
//                   Decline
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useContext, useEffect, useState } from "react";
import style from "./PostOptions.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import { initFlowbite } from "flowbite";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

export default function PostOptions({ postId }) {
  useEffect(() => {
    initFlowbite();
  }, []);

  const { token } = useContext(UserContext);
  let queryClient = useQueryClient();

  // 🆕 state لتخزين الصورة
  const [file, setFile] = useState(null);

  async function deletePost() {
    try {
      let { data } = await axios.delete(
        `https://linked-posts.routemisr.com/posts/${postId}`,
        {
          headers: {
            token,
          },
        }
      );
      if (data.message === "success") {
        toast.success("Post deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["getPosts"] });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Delete failed");
    }
  }

  const form = useForm({
    defaultValues: {
      body: "",
    },
  });
  let { register, handleSubmit } = form;

  async function updatePost(values) {
    let formData = new FormData();
    formData.append("body", values.body);

    if (file) {
      formData.append("image", file);
    }

    // Debug للتأكد إن الصورة موجودة
    for (let [key, val] of formData.entries()) {
      console.log(key, val);
    }

    try {
      let { data } = await axios.put(
        `https://linked-posts.routemisr.com/posts/${postId}`,
        formData,
        {
          headers: {
            token, // من غير Content-Type
          },
        }
      );
      if (data.message === "success") {
        toast.success("Post updated successfully");
        queryClient.invalidateQueries({ queryKey: ["getPosts"] });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Update failed");
    }
  }

  return (
    <>
      <button
        id="dropdownMenuIconButton"
        data-dropdown-toggle={"dropdown" + postId}
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 dark:text-white dark:bg-gray-800 cursor-pointer"
        type="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
      <div
        id={"dropdown" + postId}
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconButton"
        >
          <li
            data-modal-target="modal"
            data-modal-toggle="modal"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          >
            <i className="fa-solid fa-pen me-2"></i> Update
          </li>
          <li
            onClick={deletePost}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          >
            <i className="fa-solid fa-trash me-2"></i> Delete
          </li>
        </ul>
      </div>
      <div
        id="modal"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <form onSubmit={handleSubmit(updatePost)}>
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Update Post
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="modal"
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
                <input
                  {...register("body")}
                  type="text"
                  placeholder="What's on your mind?"
                  className="bg-slate-100 rounded-4xl border-slate-400 w-full"
                />

                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor={`photo-${postId}`}
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                  >
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
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG or JPEG (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id={`photo-${postId}`}
                      type="file"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="modal"
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                >
                  Update
                </button>
                <button
                  data-modal-hide="modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
                >
                  Decline
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
