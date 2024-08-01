import { Iproduct } from "@/app/models/product";
import { iPost, IpublicUser } from "@/app/models/user";
import Comment from "@/components/common/Comment";
import { PostHeader } from "@/components/common/PostWrapper";
import Button from "@/components/molecules/Button";
import { UserProfileImage } from "@/components/molecules/UserName";
import { SpinningWheel } from "@/components/SpinningWheel";
import { getAuth, isLoggedIn } from "@/scripts/utils";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import {
  BsChatDotsFill,
  BsHeartFill,
  BsTagFill,
  BsX,
  BsXLg,
} from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import useActivePostView from "../hooks/useActivePostView";
import usePostInteraction from "../hooks/usePostInteraction";
import usePostView from "../hooks/usePostView";
import usePostViewMediaPlay from "../hooks/usePostViewMediaPlay";
import { isCommentsOnAtom } from "../PostStore";
import FullPostView, {
  LoadingMediaPlayComment,
  MediaPlayComment,
} from "./FullPostView";
import Like from "./Like";
import { BuyButton } from "./ProductPost";

export default function PostViewMediaPlay() {
  const { mediaPosts } = usePostViewMediaPlay();

  const [isCommentsOn, setIsCommentsOn] = useAtom(isCommentsOnAtom);

  return (
    <div
      className={`fixed  left-0 w-full h-screen z-[200] ${
        isCommentsOn ? "overflow-hidden" : "overflow-auto container_scroll"
      } noScrollBar `}
    >
      {isCommentsOn && (
        <div className="fixed bottom-0 z-[500] left-0 lg:hidden flex">
          <CommentsSection setOff={setIsCommentsOn} />
        </div>
      )}
      <div className="lg:hidden flex">
        {mediaPosts.map((post) => {
          return (
            <MobileMediaPlayer
              id={post.post?.id}
              post={post.post}
              media={post.post?.media}
              user={post.post?.user}
              date={new Date(post.post?.createdAt * 1000)}
              content={{
                message: post.post?.message,
                price: post.post?.postProduct?.product.price as number,
                name: post.post?.postProduct?.product.name as string,
              }}
              key={post.post?.id}
            />
          );
        })}
      </div>
      <div className="hidden lg:flex">
        {mediaPosts.map((post) => {
          return (
            <FullPostView
              comments={post.comments}
              id={post.post?.id}
              post={post.post}
              media={post.post?.media}
              user={post.post?.user}
              date={new Date(post.post?.createdAt * 1000)}
              content={{
                message: post.post?.message,
                price: post.post?.postProduct?.product.price as number,
                name: post.post?.postProduct?.product.name as string,
              }}
              key={post.post?.id}
            />
          );
        })}
      </div>
    </div>
  );
}

function CommentsSection({ setOff }: { setOff: (res: boolean) => void }) {
  const { activePost: post } = useActivePostView();
  const { getComments, comments, makeComment, isPending } = usePostInteraction(
    post?.like ? true : false,
    post?.id as string,
    post?.likeCount ? post?.likeCount : 0
  );
  const [comment, setComment] = useState("");
  const { getUserPostComments, makeUserComment } = useActivePostView();

  return (
    <div className="flex flex-col  h-[70vh] px-2 py-2 dark:bg-darkMode-900 bg-white w-[100vw]  rouned p-5">
      <div className="py-3 relative text-gray-700 dark:text-gray-100">
        <h4 className="text-center  text-xs font-semibold ">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </h4>
        <button
          onClick={() => setOff(false)}
          className="absolute right-5 top-3"
        >
          <BsXLg className=" " />
        </button>
      </div>
      <div className="flex flex-col gap-5 overflow-y-auto px-4 h-[488px]">
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
              user={comment?.user as IpublicUser}
              date={new Date((comment?.createdAt as number) * 1000)}
              message={comment.message}
            />
          );
        })}
      </div>
      <div className="border-t border-slate-200 dark:border-gray-500">
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
            className="flex gap-3 items-center py-5"
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
                className="border-none rounded-md text-xs dark:bg-gray-700 bg-gray-100 lg:text-sm text-gray-700 p-3 font-medium w-full focus:ring-0 focus:outline-none placeholder:text-gray-300"
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
  );
}

function MobileMediaPlayer({
  user,
  date,
  content,
  media,
  post,
}: {
  id: string;
  user: IpublicUser;
  date: Date;
  media: string[];
  post: iPost;
  content: { message: string; price: number; name: string };
}) {
  const [images, setImages] = useState<string[]>(media);
  let message = content.message ?? "";

  message = message.replace(/(#\w+)/g, '<span class="hashtag">$1</span>');
  const { closePost } = usePostView();
  const [liked, setLiked] = useState(false);
  // const [likedCount, setLikedCount] = useState(200);

  const handleImageError = () => {
    setImages(["/noImage.jpg"]);
  };
  const Router = useRouter();

  const { openComments, getUserPostComments, makeUserComment } =
    useActivePostView();

  const {
    isLiked,
    setIsLiked,
    handlePostLike,
    likedCount,
    setLikedCount,
    makeComment,
    getComments,
    comments,
    isPending,
  } = usePostInteraction(
    post?.like ? true : false,
    post?.id as string,
    post?.likeCount ? post?.likeCount : 0
  );

  const [comment, setComment] = useState("");

  return (
    <div
      style={{ height: window.innerHeight }}
      className=" bg-black py-4 flex flex-col overflow-y-auto relative w-full min-w-[360px] lg:max-w-[400px]"
    >
      <div className="flex justify-between mb-5 px-4">
        {isLoggedIn() && (
          <div className="">
            <PostHeader user={post.user} date={date} />
          </div>
        )}
        <div
          onClick={() => closePost()}
          className=" bg-gray-100/80 rounded-md w-8 h-8 top-2  flex items-center justify-center cursor-pointer"
        >
          <span className="text-slate-700">
            <BsXLg />
          </span>
        </div>
      </div>
      <div
        style={{
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
        }}
        className="overflow-y-auto flex gap-4 noScrollBar flex-1 "
      >
        {images.map((image, key) => {
          return (
            <img
              style={{
                scrollSnapAlign: "center",
                scrollSnapStop: "always",
              }}
              key={key}
              src={image}
              className="mx-auto object-contain w-[100vw] sm:w-[360px]"
            />
          );
        })}
      </div>
      <div
        style={{ bottom: post.postProduct ? "0px" : "14vh" }}
        className={clsx(
          "absolute right-0 flex flex-col gap-10 justify-between  h-[350px] w-full",
          post.postProduct && "py-5"
        )}
      >
        <div className="flex flex-col gap-3 items-end px-5 ">
          <div
            onClick={() => {
              setLiked(!liked);
              if (liked) {
                setLikedCount((likedCount as number) - 1);
              } else {
                setLikedCount((likedCount as number) + 1);
              }
            }}
            className={`flex flex-col gap-1 items-center text-xs font-semibold ${
              liked ? "text-red-600/90" : "text-white"
            } shadow-sm`}
          >
            <div className="w-[40px] flex flex-col items-center">
              <BsHeartFill
                onClick={async () => {
                  if (isLoggedIn()) {
                    const res = await handlePostLike();
                    if (res) {
                      if (isLiked) {
                        setIsLiked(!isLiked);

                        setLikedCount(likedCount - 1);
                      } else {
                        setIsLiked(!isLiked);

                        setLikedCount(likedCount + 1);
                      }
                    }
                  } else {
                    Router.push("/account/login");
                  }
                }}
                className={` ${
                  isLiked ? "text-red-600" : "text-white "
                } cursor-pointer`}
                size={35}
              />
            </div>

            <p className={`text-white `}>{likedCount}</p>
          </div>
          <div
            onClick={() => {
              openComments(post);
            }}
            className="flex flex-col gap-1 items-center text-xs font-semibold text-white shadow-sm cursor-pointer"
          >
            <BsChatDotsFill className="" size={35} />
            <p className="text-white">{comments.length}</p>
          </div>
        </div>
        <div className="flex lg:hidden flex-col gap-3 p-3">
          {post.postProduct && (
            <div className="text-sm text-slate-300 font-semibold flex justify-between">
              <h4>{post?.postProduct?.product?.name}</h4>
              <h4 className="p-2 flex gap-2 items-center rounded-[4px] bg-violet-100 text-violet-600">
                <BsTagFill />
                <span>{post?.postProduct?.product?.price}</span>
              </h4>
            </div>
          )}

          <p
            dangerouslySetInnerHTML={{ __html: message }}
            className="text-xs font-semibold text-slate-200 "
          ></p>

          {post.postProduct && (
            <BuyButton
              product={post.postProduct.product as Iproduct}
              media={media}
              userId={user.id}
            />
          )}
        </div>
      </div>
      {!isLoggedIn() && (
        <div className="w-full p-5">
          <PostHeader user={post.user} date={date} />
        </div>
      )}
      {!post.postProduct && isLoggedIn() && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await makeComment(comment);
            if (res) {
              makeUserComment(res.message, post?.id as string);
            }
            setComment("");
            openComments(post);
          }}
          className="flex gap-3 items-center py-5 px-2 relative"
        >
          <UserProfileImage
            imgSrc={getAuth()?.displayImageUrl as string}
            name={""}
            type={"general"}
            isVerified={true}
          />
          <div className="flex-1">
            <input
              style={{ paddingRight: "40px", paddingLeft: "16px" }}
              type="text"
              className=" rounded-md  bg-transparent border border-gray-200 text-sm text-white py-3  font-medium w-full focus:ring-0 focus:outline-none   placeholder:text-gray-300"
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
  );
}
