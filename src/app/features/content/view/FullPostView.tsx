import UserName, { UserProfileImage } from "@/components/molecules/UserName";
import Button from "@/components/molecules/Button";
import React, { useState } from "react";
import {
  BsDot,
  BsThreeDotsVertical,
  BsTagFill,
  BsHeartFill,
  BsChatDotsFill,
  BsXLg,
  BsThreeDots,
  BsChevronLeft,
} from "react-icons/bs";
import Comment from "@/components/common/Comment";
import usePostView from "../hooks/usePostView";
import { iPost, IpublicUser } from "@/app/models/user";
import { PostHeader } from "@/components/common/PostWrapper";
import { Input } from "@/components/molecules/Form";
import { IoSend } from "react-icons/io5";
import { isCommentsOnAtom } from "../PostStore";
import { useAtom } from "jotai";
import BookingForm from "../../booking/view/BookingForm";
import { getAuth, getRelativeDate, isLoggedIn } from "@/scripts/utils";
import useActivePostView from "../hooks/useActivePostView";
import usePostInteraction from "../hooks/usePostInteraction";
import clsx from "clsx";
import Like from "./Like";
import { BuyButton } from "./ProductPost";
import { Iproduct } from "@/app/models/product";
import { useRouter } from "next/navigation";
import { SpinningWheel } from "@/components/SpinningWheel";
import { iComment } from "@/app/models/content";

export default function FullPostView({
  user,
  date,
  content,
  media,
  post,
  comments,
}: {
  id: string;
  user: IpublicUser;
  date: Date;
  media: string[];
  post: iPost;
  comments: iComment[];
  content: { message: string; price: number; name: string };
}) {
  const [images, setImages] = useState<string[]>(media);
  let message = content.message ?? "";

  message = message.replace(/(#\w+)/g, '<span class="hashtag">$1</span>');
  const { closePost } = usePostView();
  const [liked, setLiked] = useState(false);
  // const [likedCount, setLikedCount] = useState(200);
  const [comment, setComment] = useState("");
  const handleImageError = () => {
    setImages(["/noImage.jpg"]);
  };

  const [activeImage, setActiveImage] = useState(images[0]);
  const { openComments, getUserPostComments, makeUserComment } =
    useActivePostView();

  const {
    isLiked,
    setIsLiked,
    handlePostLike,
    likedCount,
    setLikedCount,
    getCommentCount,
    getFirstComment,
    getComments,
    makeComment,
    isPending,
  } = usePostInteraction(
    post?.like ? true : false,
    post?.id as string,
    post?.likeCount ? post?.likeCount : 0
  );

  const Router = useRouter();

  return (
    <div
      style={{
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "100% 25%",
        // backgroundImage: `url(${images})`,
        scrollSnapAlign: "center",
        scrollSnapStop: "always",
      }}
      className={`lg:bg-gray-700/90 overflow-y-hidden bg-black   lg:dark:bg-slate-500/60 w-full p-5 lg:p-0 h-screen flex items-center`}
    >
      <div
        onClick={() => closePost()}
        className="fixed z-[1000] bg-gray-800/80 dark:bg-gray-100/80 rounded-[14px] w-10 h-10 top-4  right-4 flex items-center justify-center cursor-pointer"
      >
        <span className="text-slate-300 dark:text-slate-700">
          <BsXLg />
        </span>
      </div>
      <div className="flex mx-auto h-[90vh] overflow-hidden">
        <div className=" relative lg:h-[100%]  lg:flex gap-4 flex-col lg:justify-center ">
          <div
            onKeyDown={(e) => {
              console.log(e);
            }}
            className="w-[100%] flex flex-col h-[100%] items-end gap-2 relative"
          >
            <img
              src={activeImage}
              className="object-contain h-[100%] w-[100%]"
            />
            <div className="flex gap-3 px-2 overscroll-x-auto flex-wrap">
              {images.map((image, key) => {
                return (
                  <img
                    style={{
                      scrollSnapAlign: "center",
                      scrollSnapStop: "always",
                    }}
                    onClick={() => {
                      setActiveImage(image);
                    }}
                    key={key}
                    src={image}
                    className={clsx(
                      "object-cover w-[60px] h-[60px] rounded-md cursor-pointer",
                      activeImage === image &&
                        "border-2 border-violet-600 dark:border-violet-400"
                    )}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex lg:hidden flex-col gap-3 p-3 ">
            {post.postProduct ? (
              <>
                <div className="text-sm text-slate-300 font-semibold flex justify-between">
                  <h4>{post?.postProduct?.product?.name}</h4>
                  <h4 className="p-2 flex gap-2 items-center rounded-[4px] bg-violet-100 text-violet-600">
                    <BsTagFill />
                    <span>{post?.postProduct?.product?.price}</span>
                  </h4>
                </div>
                <p
                  dangerouslySetInnerHTML={{ __html: message }}
                  className="  text-sm text-slate-200"
                ></p>
              </>
            ) : (
              <p
                dangerouslySetInnerHTML={{ __html: message }}
                className=" text-sm text-slate-800 bg-white "
              ></p>
            )}

            {post.postProduct && (
              <Button onClick={() => {}} size={"default"} variant={"primary"}>
                Book Now
              </Button>
            )}
          </div>
        </div>

        <div className="flex relative flex-col justify-between gap-5 w-[500px] bg-white dark:bg-darkMode-900 p-10">
          <div className="">
            <PostHeader user={user} date={date} />

            <div className="flex flex-col gap-4">
              <p
                dangerouslySetInnerHTML={{ __html: message }}
                className="text-sm  text-gray-500 dark:text-slate-200"
              ></p>
              {post.postProduct && (
                <div className="flex flex-col gap-4">
                  <div className="text-sm text-gray-700 dark:text-slate-300 font-semibold flex justify-between">
                    <h4>{post?.postProduct?.product?.name}</h4>
                    <h4 className="p-2 flex gap-2 items-center rounded-[4px] bg-violet-100 text-violet-600">
                      <BsTagFill />
                      <span>{post?.postProduct?.product?.price}</span>
                    </h4>
                  </div>

                  <BuyButton
                    product={post.postProduct.product as Iproduct}
                    media={media}
                    userId={user.id}
                  />
                </div>
              )}
              <div className="flex flex-col gap-6 py-5 border-b border-gray-100 dark:border-gray-600">
                <div className="flex gap-10 items-center">
                  <div className="flex gap-2 items-center text-xs font-semibold text-gray-500">
                    <BsHeartFill
                      onClick={() => {
                        if (isLoggedIn()) {
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
                        } else {
                          Router.push("/account/login");
                        }
                      }}
                      className={` ${
                        isLiked
                          ? "text-red-600"
                          : "text-gray-300 hover:text-gray-400"
                      } cursor-pointer`}
                      size={20}
                    />
                    <p className="">{likedCount}</p>
                    <p className="">
                      {(likedCount as number) > 1 ? "Likes" : "Like"}
                    </p>
                  </div>
                  <div className="flex gap-1 items-center text-xs font-semibold text-gray-500">
                    <BsChatDotsFill className="text-gray-300" size={20} />
                    <p className="">{getCommentCount()}</p>
                    <p className="">
                      {getCommentCount() > 1 ? "Comments" : "Comment"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col  justify-between gap-3   px-2 ">
                <div className="flex  flex-col max-h-[400px] overflow-y-auto">
                  {getUserPostComments(post?.id as string).map((comment, i) => {
                    return (
                      <Comment
                        user={getAuth() as IpublicUser}
                        date={new Date()}
                        key={comment.postId + i}
                        message={comment.comment}
                      />
                    );
                  })}
                  {comments.map((comment) => {
                    return (
                      <Comment
                        key={comment.commentId}
                        user={comment.user}
                        date={new Date(comment.createdAt * 1000)}
                        message={comment.message}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {isLoggedIn() && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await makeComment(comment);
                if (res) {
                  makeUserComment(res.message, post?.id as string);
                }
                setComment("");
              }}
              className="flex gap-3  items-center w-full "
            >
              <UserProfileImage
                imgSrc={getAuth()?.displayImageUrl as string}
                name={""}
                type={"general"}
                isVerified={true}
              />
              <div className="flex-1">
                <input
                  type="text"
                  className="border-none rounded-md text-xs dark:bg-darkMode-500 bg-gray-100 lg:text-sm text-gray-100 p-3 font-medium w-full focus:ring-0 focus:outline-none placeholder:text-gray-300"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </div>

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
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function MediaPlayComment({
  user,
  date,
  message,
}: {
  user: IpublicUser;
  date: Date;
  message: string;
}) {
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex justify-between">
        <div className="flex">
          <UserName
            name={user.name}
            userName={user.username}
            imgSrc={user.displayImageUrl}
            type={user.accountType}
            isVerified={false}
            size="small"
          />
        </div>

        <div className="text-xs">
          <BsThreeDots />
        </div>
      </div>
      <div className="">
        <p className="font-medium lg:text-sm">{message}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-5">
          <p className="text-xs text-gray-400 font-medium flex ">
            <span>
              {getRelativeDate(date) === "less than a minute ago"
                ? "Now"
                : getRelativeDate(date)}
            </span>
          </p>
          <p className="text-xs text-gray-400 font-medium flex underline cursor-pointer">
            Reply
          </p>
        </div>
        <div className="flex justify-end">
          <div className="flex gap-1 items-center text-xs font-semibold text-gray-500">
            <BsHeartFill className="text-gray-300" size={20} />
            <p className=""></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingMediaPlayComment() {
  return (
    <div className="flex flex-col gap-4 py-4  w-[413px] h-[148px] ">
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex gap-2">
            <div className="w-[35px] h-[35px] rounded-full bg-gray-200"></div>
            <div className="flex flex-col gap-2">
              <div className="w-[120px] h-[13px] rounded-full bg-gray-200 "></div>
              <div className="w-[70px] h-[10px] rounded-full bg-gray-200"></div>
            </div>
          </div>
        </div>

        <div className="">
          <BsThreeDots />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-full h-[10px] rounded-full bg-gray-200"></div>
        <div className="w-full h-[10px] rounded-full bg-gray-200"></div>
        <div className="w-full h-[10px] rounded-full bg-gray-200"></div>
        <div className="w-full h-[10px] rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
}

function setModal(arg0: {
  modalChild: JSX.Element;
  title: string;
  subtitle: string;
  action: () => void;
}) {
  throw new Error("Function not implemented.");
}

function openModal() {
  throw new Error("Function not implemented.");
}
