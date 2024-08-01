import { iPost } from "@/app/models/user";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { mediaPostsAtom } from "../PostStore";

export default function usePostViewMediaPlay() {
  const [mediaPosts, setMediaPosts] = useAtom(mediaPostsAtom);

  return { mediaPosts };
}
