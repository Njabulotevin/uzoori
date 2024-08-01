import { ImerchantUser, iPost, IpublicUser } from "@/app/models/user";
import {
  capitalizeWords,
  getAuth,
  getRelativeDate,
  isLoggedIn,
} from "@/scripts/utils";
import { format } from "date-fns";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import {
  BsChatDotsFill,
  BsChatSquareDotsFill,
  BsDot,
  BsHeartFill,
  BsThreeDots,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import Button from "../molecules/Button";
import { Input } from "../molecules/Form";
import UserName, {
  StackedProfile,
  UserProfileImage,
} from "../molecules/UserName";
import Comment from "@/components/common/Comment";
import usePostInteraction from "@/app/features/content/hooks/usePostInteraction";
import Like from "@/app/features/content/view/Like";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { iComment } from "@/app/models/content";
import { SpinningWheel } from "../SpinningWheel";

export default function PostWrapper({
  children,
  user,
  date,
  post,
  wrapperClass,
}: {
  children: ReactNode;
  user: IpublicUser;
  date: Date;
  post: iPost;
  wrapperClass?: string;
}) {
  const [comment, setComment] = useState("");
  const {
    isLiked,
    setIsLiked,
    handlePostLike,
    likedCount,
    setLikedCount,
    getCommentCount,
    getFirstComment,
    openComments,
    makeComment,
    isPending,
  } = usePostInteraction(
    post.like ? true : false,
    post.id,
    post?.likeCount ? post?.likeCount : 0
  );

  const [userComment, setUserComment] = useState<{
    message: string;
    id: string;
  }>({
    message: "",
    id: "",
  });
  const commentCount = getCommentCount();

  const [show, setShow] = useState(false);
  const Router = useRouter();

  return (
    <div
      className={`box-small gap-4 py-4 px-2 lg:p-8 min-w-[340px] w-full lg:w-[600px] ${wrapperClass}`}
    >
      <div className="flex justify-between items-center">
        <PostHeader user={user} date={date} />
        <div className="flex justify-between">
          <BsThreeDotsVertical
            size={15}
            className="text-xs text-gray-400 font-medium"
          />
        </div>
      </div>
      <div className="">{children}</div>
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <div className="flex gap-1 items-center text-xs font-semibold text-gray-500">
            <BsHeartFill
              onClick={async () => {
                if (isLoggedIn()) {
                  const res = await handlePostLike();
                  if (res) {
                    if (isLiked) {
                      setIsLiked(!isLiked);
                      // setLikeState(postId);
                      setLikedCount(likedCount - 1);
                    } else {
                      setIsLiked(!isLiked);
                      // setLikeState(postId);
                      setLikedCount(likedCount + 1);
                    }
                  }
                } else {
                  Router.push("/account/login");
                }
              }}
              className={` ${
                isLiked ? "text-red-600" : "text-gray-300 hover:text-gray-400"
              } cursor-pointer`}
              size={20}
            />
          </div>

          <div
            onClick={() => openComments()}
            className="flex gap-2 cursor-pointer items-center text-xs font-semibold text-gray-500"
          >
            <BsChatSquareDotsFill className="text-gray-300" size={23} />
            <p className="">{getCommentCount()}</p>
            <p className="">{getCommentCount() > 1 ? "Comments" : "Comment"}</p>
          </div>
        </div>
        {(likedCount as number) > 0 && (
          <div className="flex gap-1 items-center">
            <StackedProfile
              extra={false}
              image1=""
              image2=""
              type={"general"}
              size="extraSmall"
              count={likedCount as number}
            />
            {isLiked ? (
              <p className="text-xs px-2 text-gray-400 dark:text-gray-300 font-semibold hover:underline cursor-pointer">
                {(likedCount as number) > 1
                  ? `Liked by You and ${(likedCount as number) - 1} others`
                  : ` ${likedCount} Like`}
              </p>
            ) : (
              <p className="text-xs text-gray-400 dark:text-gray-300 font-semibold hover:underline cursor-pointer">
                {likedCount} {(likedCount as number) > 1 ? "Likes" : "Like"}
              </p>
            )}
            {/* <p className="text-xs text-gray-400 dark:text-gray-300 font-semibold ">
            Liked by{" "}
            <span className="font-bold dark:text-violet-400 text-violet-600">
              John Doe
            </span>{" "}
            and 3,456 others
          </p> */}
          </div>
        )}
        {getFirstComment()?.commentId !== userComment.id && (
          <div className="">
            {getFirstComment() && (
              <div className="text-xs lg:text-sm text-gray-700 dark:text-gray-300 font-semibold flex justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-bold dark:text-violet-400 text-violet-600">
                    {capitalizeWords(getFirstComment()?.user.name)}
                  </span>
                  <span className="font-normal">
                    {getFirstComment()?.message}
                  </span>
                </div>

                <span className="text-xs  text-gray-400 font-medium flex ">
                  {getRelativeDate(
                    new Date(getFirstComment()?.createdAt * 1000)
                  )}
                </span>
              </div>
            )}
          </div>
        )}
        {userComment.message !== "" && !isPending && (
          <div className="text-xs text-gray-700 dark:text-gray-300 font-semibold flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-bold dark:text-violet-400 text-violet-600">
                You
              </span>
              <span className="text-normal"> {userComment.message}</span>
            </div>

            <span className="text-xs text-gray-400 font-medium flex ">
              {getRelativeDate(new Date()) === "less than a minute ago"
                ? "Now"
                : getRelativeDate(new Date())}
            </span>
          </div>
        )}

        {commentCount > 1 && (
          <p
            onClick={() => openComments()}
            className="text-xs text-gray-300 font-medium cursor-pointer hover:underline"
          >
            {commentCount > 2
              ? `View all ${commentCount} comments`
              : "View all Comments"}
          </p>
        )}
      </div>{" "}
      {getAuth() && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await makeComment(comment);
            if (res) {
              setUserComment({ message: res.message, id: res.commentId });
            }
            setComment("");
          }}
          className="flex gap-3 items-center"
        >
          <UserProfileImage
            imgSrc={getAuth()?.displayImageUrl as string}
            name={getAuth()?.name as string}
            type={"general"}
            isVerified={false}
          />
          <div className="flex-1">
            <Input
              value={comment}
              placeholder={"Write Your comment"}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              name={""}
              type="text"
              isRequired={false}
              isError={false}
              error={""}
              onBlur={() => {}}
              label=""
            />
          </div>
          {comment !== "" && (
            <div className="">
              {isPending ? (
                <div className="">
                  <span>
                    <SpinningWheel
                      className="w-[20px] h-[20px] fill-gray-50 spin-fast"
                      outerColor="fill-violet-400"
                    />
                  </span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="text-violet-600 dark:text-violet-400"
                >
                  <IoSend size={20} />
                </button>
              )}
            </div>
          )}
        </form>
      )}
      {
        <div className="flex text-2xl gap-4">
          <p
            onClick={() => {
              setComment(`${comment} 😍`);
            }}
            className="cursor-pointer"
          >
            😍
          </p>
          <p
            onClick={() => {
              setComment(`${comment} 😂`);
            }}
            className="cursor-pointer"
          >
            😂
          </p>
          <p
            onClick={() => {
              setComment(`${comment} 😊`);
            }}
            className="cursor-pointer"
          >
            😊
          </p>
          <p
            onClick={() => {
              setComment(`${comment} 😭`);
            }}
            className="cursor-pointer"
          >
            😭
          </p>
          <p
            onClick={() => {
              setComment(`${comment} 😜`);
            }}
            className="cursor-pointer"
          >
            😜
          </p>
        </div>
      }
    </div>
  );
}

export function PostHeader({ user, date }: { user: IpublicUser; date: Date }) {
  return (
    <div className="flex w-full">
      <UserName
        name={user.name}
        userName={user.username}
        imgSrc={user.displayImageUrl}
        type={user.accountType}
        isVerified={true}
        id={user.id}
        follow={{
          followerCount: user?.followerCount as number,
          followingCount: user?.followingCount as number,
        }}
      />

      <p className="text-xs text-gray-400 font-medium flex ">
        <BsDot className="text-xs text-gray-400 font-medium" />
        <span>{getRelativeDate(date).replace("about", "")}</span>
      </p>
    </div>
  );
}
