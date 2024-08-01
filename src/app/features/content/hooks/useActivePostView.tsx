import { iPost } from "@/app/models/user";
import { useAtom } from "jotai";
import React, { useState } from "react";
import {
  activePostAtom,
  isCommentsOnAtom,
  userCommentAtom,
  userCommentType,
} from "../PostStore";

export default function useActivePostView() {
  const [activePost, setActivePost] = useAtom(activePostAtom);
  const [isCommentsOn, setIsCommentsOn] = useAtom(isCommentsOnAtom);
  const [userComment, setUserComment] = useAtom(userCommentAtom);

  const openComments = (post: iPost) => {
    setActivePost(post);
    setIsCommentsOn(true);
  };

  const makeUserComment = (comment: string, postId: string) => {
    setUserComment([{ postId: postId, comment: comment }, ...userComment]);
  };

  const getUserPostComments = (id: string): userCommentType[] => {
    try {
      const comments = userComment.filter((comment) => comment.postId === id);
      return comments;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  return {
    activePost,
    openComments,
    getUserPostComments,
    makeUserComment,
  };
}
