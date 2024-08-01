import { iComment } from "@/app/models/content";
import { iPost } from "@/app/models/user";
import { isPostLiked, setLikeState } from "@/scripts/utils";
import { DataNode } from "domhandler";
import React, { useEffect, useState } from "react";
import useModal from "../../PopUp/hooks/useModal";
import {
  useCreateCommentMutation,
  useGetPostByIdQuery,
  useGetPostCommentsQuery,
  usePostLikeMutation,
  usePostUnLikeMutation,
} from "../contentApiSlice";
import Comments from "../view/Comments";

export interface iLike {
  id: string;
  userId: string;
  postId: string;
}

export default function usePostInteraction(
  liked: boolean,
  postId: string,
  likeCount: number
) {
  const {
    data: Post,
    isLoading: PostLoading,
    isSuccess: PostSuccess,
  } = useGetPostByIdQuery({
    postId: postId,
  });
  const [isLiked, setIsLiked] = useState(liked ? true : false);
  const [like] = usePostLikeMutation();
  const [unLike] = usePostUnLikeMutation();
  const [likedCount, setLikedCount] = useState<number>(likeCount ?? 0);
  const [comments, setComments] = useState<iComment[]>([]);
  const { openModal } = useModal();
  const [isPending, setIsPending] = useState(false);
  const [userComment, setUserComment] = useState("");

  const { data, isLoading, isSuccess } = useGetPostCommentsQuery({
    id: postId,
  });

  useEffect(() => {
    if (Post) {
      setIsLiked(Post?.data.like ? true : false);
    }
  }, [Post]);

  const [createComment] = useCreateCommentMutation();

  const handlePostLike = async (): Promise<
    iLike | null | { postId: string }
  > => {
    try {
      if (isLiked) {
        const { data, status } = await unLike({ postId: postId }).unwrap();
        return data;
      } else {
        const { data, status } = await like({ postId: postId }).unwrap();
        return data;
      }
    } catch (err: unknown) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    if (data) {
      setComments(data?.data);
    }
  }, [data, isSuccess, postId]);

  const getCommentCount = () => {
    return comments.length;
  };

  const getFirstComment = () => {
    return comments[0];
  };

  const getComments = () => {
    return comments;
  };

  const openComments = () => {
    try {
      openModal({
        modalChild: (
          <div className="h-[80vh] lg:h-auto">
            <Comments comments={comments} />
          </div>
        ),
        title: `${getCommentCount()} Comments`,
        subtitle: "",
        action: () => {},
      });
    } catch (err) {
      console.log(err);
    }
  };

  const makeComment = async (message: string): Promise<iComment | null> => {
    try {
      setIsPending(true);
      const { data, status } = await createComment({
        postId: postId,
        message: message,
      }).unwrap();

      if (status === "SUCCESS") {
        setIsPending(false);
        console.log(data);
      }
      return data as iComment;
    } catch (err) {
      setIsPending(false);
      console.log(err);
      return null;
    }
  };

  return {
    isLiked,
    setIsLiked,
    handlePostLike,
    likedCount,
    setLikedCount,
    getCommentCount,
    getFirstComment,
    openComments,
    getComments,
    comments,
    makeComment,
    isPending,
  };
}
