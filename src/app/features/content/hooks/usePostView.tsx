import { iComment } from "@/app/models/content";
import { iPost } from "@/app/models/user";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import {
  useLazyGetPostByIdQuery,
  useLazyGetPostCommentsQuery,
} from "../contentApiSlice";
import { isPostViewOnAtom, mediaPostsAtom } from "../PostStore";
import useFeeds from "./useFeeds";

export default function usePostView() {
  const [isPostViewOn, setIsPostViewOn] = useAtom(isPostViewOnAtom);
  const [mediaPosts, setMediaPosts] = useAtom(mediaPostsAtom);
  const [getPost] = useLazyGetPostByIdQuery();
  const [getPostComments] = useLazyGetPostCommentsQuery();
  useEffect(() => {
    if (!isPostViewOn) {
      document.body.style.overflow = "auto";
    }
  }, []);

  const openPost = (post: iPost) => {
    // const selectedPost: iPost = userPosts.find(
    //   (post) => post.id === id
    // ) as iPost;
    // const otherPosts: iPost[] = userPosts.filter(
    //   (post) => post.id !== id
    // ) as iPost[];
    // setMediaPosts([post]);
    setIsPostViewOn(true);
    document.body.style.overflow = "hidden";
  };

  const openPostById = async (postId: string) => {
    try {
      const { data } = await getPost({ postId: postId });
      const { data: commentsData } = await getPostComments({ id: postId });
      setMediaPosts([
        {
          post: data?.data as iPost,
          comments: commentsData?.data as iComment[],
        },
      ]);
      setIsPostViewOn(true);
      console.log(data);
      document.body.style.overflow = "hidden";
    } catch (err) {
      console.log(err);
    }
  };

  const closePost = () => {
    setIsPostViewOn(false);
    document.body.style.overflow = "auto";
  };
  return { isPostViewOn, openPost, closePost, openPostById };
}
