import { iPost, IpublicUser } from "@/app/models/user";
import React, { useEffect, useState } from "react";
import useFeeds from "./useFeeds";

export type followPeople = {
  user: IpublicUser;
  type: "vertical" | "horizontal";
};

export interface contentType {
  type: "follow_suggestion" | "posts";
  content: iPost[] | followPeople;
}

type listOfListPosts = Array<iPost[]>;

export default function useRefinePostList(userPosts: iPost[]) {
  const [content, setContent] = useState<contentType[]>([]);
  const [dividedPosts, setDividedPosts] = useState<listOfListPosts>([]);

  const division = Math.floor(Math.random() * userPosts.length - 1);

  useEffect(() => {
    const arr = userPosts;
    const chunk = userPosts.slice(0, division);
    const other = userPosts.slice(division, arr.length);
    setDividedPosts([chunk, other]);
  }, [userPosts]);

  useEffect(() => {
    setContent([
      { type: "posts", content: dividedPosts[0] },
      { type: "follow_suggestion", content: [] },
      { type: "posts", content: dividedPosts[1] },
    ]);
  }, [dividedPosts]);

  return { content };
}
