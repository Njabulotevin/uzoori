import { isPostLiked, setLikeState } from "@/scripts/utils";
import clsx from "clsx";
import { useLottie, useLottieInteractivity } from "lottie-react";
import React, { CSSProperties, useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";

export default function Like({
  isLiked,
  setIsLiked,
  likedCount,
  setLikedCount,
  handlePostLike,
  size,
  postId,
}: {
  isLiked: boolean;
  setIsLiked: (x: boolean) => void;
  likedCount: number;
  setLikedCount: (x: number) => void;
  handlePostLike: Function;
  size?: string;
  postId: string;
}) {
  // const checkIsLiked = isLiked || isPostLiked(postId);
  return (
    <div className="flex relative gap-1 items-center text-xs font-semibold text-gray-500 ">
      <div className="w-[20px]">
        <div className={clsx("", isLiked ? "fill-red-600" : "fill-gray-300")}>
          <AnimatedHeart
            size={size}
            handleClick={() => {
              if (isLiked) {
                setIsLiked(!isLiked);
                // setLikeState(postId);
                setLikedCount(likedCount - 1);
              } else {
                setIsLiked(!isLiked);
                // setLikeState(postId);
                setLikedCount(likedCount + 1);
              }
              handlePostLike();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export interface MyCustomCSS extends CSSProperties {
  "--total-particles": number;
}

export interface MyOtherCSS extends CSSProperties {
  "--i": number;
  "--color": string;
}

export function AnimatedHeart({
  handleClick,
  size,
}: {
  handleClick: Function;
  size?: string;
}) {
  // useEffect(() => {
  //   const btn = document.getElementById("like-button");
  //   btn?.focus();
  // }, []);
  return (
    <button
      onFocus={() => {
        handleClick();
      }}
      id="like-button"
      className="like-button "
    >
      <div className="like-wrapper">
        <div className="ripple"></div>
        <svg
          className="heart"
          width={size ? size : "24"}
          height={size ? size : "24"}
          style={{
            width: size ? size + "px" : "26px",
            height: size ? size + "px" : "26px",
          }}
          viewBox="0 0 24 24"
        >
          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
        </svg>
        <div
          className="particles"
          style={{ "--total-particles": 6 } as MyCustomCSS}
        >
          <div
            className="particle"
            style={{ "--i": 1, "--color": "#de604f" } as MyOtherCSS}
          ></div>
          <div
            className="particle"
            style={{ "--i": 2, "--color": "#de604f" } as MyOtherCSS}
          ></div>
          <div
            className="particle"
            style={{ "--i": 3, "--color": "#de604f" } as MyOtherCSS}
          ></div>
          <div
            className="particle"
            style={{ "--i": 4, "--color": "#de604f" } as MyOtherCSS}
          ></div>
          <div
            className="particle"
            style={{ "--i": 5, "--color": "#de604f" } as MyOtherCSS}
          ></div>
          <div
            className="particle"
            style={{ "--i": 6, "--color": "#de604f" } as MyOtherCSS}
          ></div>
        </div>
      </div>
    </button>
  );
}
