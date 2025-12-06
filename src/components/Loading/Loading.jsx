import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <>
      <div className="w-full md:w-[90%] lg:w-[70%] px-3 sm:px-6 mx-auto space-y-6 sm:space-y-8 py-8 sm:py-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="surface-card p-5 sm:p-6 space-y-4">
            {/* Header skeleton */}
            <div className="flex gap-4 items-center">
              <Skeleton
                baseColor="#e4e7ec"
                highlightColor="#f1f5f9"
                circle
                height={50}
                width={50}
              />
              <div className="flex-1 space-y-2">
                <Skeleton
                  baseColor="#e4e7ec"
                  highlightColor="#f1f5f9"
                  height={20}
                  width="60%"
                />
                <Skeleton
                  baseColor="#e4e7ec"
                  highlightColor="#f1f5f9"
                  height={16}
                  width="40%"
                />
              </div>
            </div>
            {/* Content skeleton */}
            <div className="space-y-3">
              <Skeleton
                baseColor="#e4e7ec"
                highlightColor="#f1f5f9"
                height={16}
                count={2}
              />
              <Skeleton
                baseColor="#e4e7ec"
                highlightColor="#f1f5f9"
                height={200}
              />
            </div>
            {/* Actions skeleton */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-between pt-4">
              <Skeleton
                baseColor="#e4e7ec"
                highlightColor="#f1f5f9"
                height={16}
                width="20%"
              />
              <Skeleton
                baseColor="#e4e7ec"
                highlightColor="#f1f5f9"
                height={16}
                width="20%"
              />
              <Skeleton
                baseColor="#e4e7ec"
                highlightColor="#f1f5f9"
                height={16}
                width="20%"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
