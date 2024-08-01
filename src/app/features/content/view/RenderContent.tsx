import { Iproduct } from "@/app/models/product";
import { iPost, Iuser } from "@/app/models/user";
import Button from "@/components/molecules/Button";
import FollowUserCard from "@/components/molecules/FollowUserCard";
import { Skeleton } from "components/ui/skeleton";
import { useRouter } from "next/navigation";
import React from "react";
import useFeeds from "../hooks/useFeeds";
import useRefinePostList from "../hooks/useRefinePostList";
import ProductPost from "./ProductPost";
import RefinedPosts from "./RefinedPosts";

export default function RenderContent() {
  const Router = useRouter();
  const { userPosts, loadMore, isPending, endOfPosts, isDataReady } =
    useFeeds();

  if (!isDataReady()) {
    return (
      <div className=" flex flex-col gap-4 p-2">
        <div className="box-small max-w-[700px] w-full mx-auto">
          {[1, 2, 3, 4, 5].map((item) => {
            return <PostSkeleton key={item} />;
          })}
        </div>
      </div>
    );
  } else if (userPosts?.length === 0) {
    return (
      <div className="flex flex-col gap-4 lg:w-[600] mx-auto h-screen w-full items-center">
        <div
          style={{
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="bg-[url('/emptyFeeds.svg')] dark:bg-[url('/emptyFeeds_black.svg')] w-[300px] h-[300px]"
        ></div>
        <h4 className="text-gray-700 text-base dark:text-gray-100 font-semibold">
          No userPosts found!
        </h4>
        <p className="text-gray-700 text-xs dark:text-gray-100 font-semibold">
          Create a new userPost
        </p>
        <Button
          onClick={() => Router.push("/app/create_userPost")}
          size={"default"}
          variant={"primary"}
        >
          Create Post
        </Button>
      </div>
    );
  } else {
    return (
      <div className="">
        <div className="flex items-center flex-col gap-4">
          <div className="box-small rounded-0 border-none gap-0">
            {/* posts here */}
            {userPosts?.map((userPost: iPost, i) => {
              return (
                <div
                  key={`${userPost.id}_${i}`}
                  className="border-b border-gray-200 dark:border-gray-600 px-auto w-full"
                >
                  <ProductPost
                    wrapperClass={"shadow-none mx-auto border-none"}
                    key={i}
                    id={userPost?.id}
                    post={userPost}
                    media={userPost?.media}
                    user={userPost?.user}
                    date={new Date(userPost?.createdAt * 1000)}
                    product={userPost?.postProduct?.product as Iproduct}
                    content={{
                      message: userPost?.message as string,
                      price: userPost?.postProduct?.product.price as number,
                      name: userPost?.postProduct?.product.name as string,
                    }}
                  />
                </div>
              );
            })}
            {/* <div className="border-b border-gray-200 dark:border-gray-600 gap-2 w-full py-4">
              <h4 className="text-base font-semibold text-gray-700">
                People You May follow
              </h4>
              <div className="flex xl:justify-between gap-4 overflow-auto">
                {users.map((user, i) => {
                  return (
                    <FollowUserCard
                      key={i}
                      user={user as Iuser}
                      display={"vertical"}
                    />
                  );
                })}
              </div>
            </div> */}
            {/* posts here */}

            {!endOfPosts && (
              <Button
                onClick={() => {
                  loadMore();
                }}
                size={"default"}
                variant={"primary"}
                isPending={isPending}
                className="my-3"
              >
                Load more
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function PostSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center space-x-4  ">
        <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-600" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]  bg-gray-200 dark:bg-gray-600 rounded" />
          <Skeleton className="h-4 w-[200px]  bg-gray-200 dark:bg-gray-600 rounded" />
        </div>
      </div>
      <div className="flex items-center space-x-4  ">
        <div style={{ width: "100%" }} className="space-y-2">
          <div className="lg:min-w-[536px]  h-[300px] md:h-[500px] bg-gray-200 dark:bg-gray-600 rounded" />
        </div>
      </div>
    </div>
  );
}

const users = [
  {
    username: "johndoe123",
    name: "John Doe",
    email: "johndoe123@example.com",
    accountType: "general",
    description:
      "I'm an avid reader and love to explore new genres. Looking for book recommendations!",
    displayImageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    username: "janedoe456",
    name: "Jane Doe",
    email: "janedoe456@example.com",
    accountType: "general",
    description:
      "I'm a travel enthusiast and always on the lookout for new destinations to visit.",
    displayImageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    username: "bobsmith789",
    name: "Bob Smith",
    email: "bobsmith789@example.com",
    accountType: "general",
    description:
      "I'm a foodie and love to try out new restaurants and recipes.",
    displayImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    username: "sarahjones101",
    name: "Sarah Jones",
    email: "sarahjones101@example.com",
    accountType: "general",
    description:
      "I'm a fitness enthusiast and enjoy trying out new workout routines.",
    displayImageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    username: "alexanderbrown",
    name: "Alexander Brown",
    email: "alexanderbrown@example.com",
    accountType: "general",
    description:
      "I'm a tech enthusiast and always interested in the latest gadgets and software.",
    displayImageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];
