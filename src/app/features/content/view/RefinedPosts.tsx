import { Iproduct } from "@/app/models/product";
import { iPost, Iuser } from "@/app/models/user";
import Button from "@/components/molecules/Button";
import FollowUserCard from "@/components/molecules/FollowUserCard";
import React from "react";
import useRefinePostList from "../hooks/useRefinePostList";
import ProductPost from "./ProductPost";

export default function RefinedPosts({
  userPosts,
  loadMore,
}: {
  userPosts: iPost[];
  loadMore: Function;
}) {
  const { content } = useRefinePostList(userPosts);
  return (
    <div className="box-small gap-0">
      <div className=""></div>
      <Button
        onClick={() => {
          loadMore();
          console.log();
        }}
        size={"default"}
        variant={"primary"}
      >
        Load more
      </Button>
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

// {content.map((item, i) => {
//   if (item.type === "posts") {
//     const content =
//       item.type === "posts" ? (item.content as iPost[]) : [];
//     return content?.map((userPost: iPost, i) => {
//       return (
//         <div
//           key={userPost.id}
//           className="border-b border-gray-200 dark:border-gray-600 px-auto w-full"
//         >
//           <ProductPost
//             wrapperClass={"shadow-none mx-auto border-none"}
//             key={i}
//             id={userPost?.id}
//             post={userPost}
//             media={userPost?.media}
//             user={userPost?.user}
//             date={new Date(userPost?.createdAt * 1000)}
//             product={userPost?.postProduct?.product as Iproduct}
//             content={{
//               message: userPost.message,
//               price: userPost?.postProduct?.product.price as number,
//               name: userPost?.postProduct?.product.name as string,
//             }}
//           />
//         </div>
//       );
//     });
//   } else {
//     return (
//       <div className="border-b border-gray-200 dark:border-gray-600 gap-2 w-full xl:w-[600px] py-4">
//         <h4 className="text-base font-semibold text-gray-700">
//           People You May follow
//         </h4>
//         <div className="flex xl:justify-between gap-4 overflow-auto">
//           {users.map((user, i) => {
//             return (
//               <FollowUserCard
//                 key={i}
//                 user={user as Iuser}
//                 display={"vertical"}
//               />
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// })}
