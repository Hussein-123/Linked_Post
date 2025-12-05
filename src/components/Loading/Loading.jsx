import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <>
      <div className="w-full md:w-[80%] lg:w-[50%] mx-auto rounded-lg p-5">
        <Skeleton baseColor="#ddd" className="h-80 my-4" count={8} />
      </div>
    </>
  );
}
