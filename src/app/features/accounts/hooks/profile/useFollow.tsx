import { getAuth } from "@/scripts/utils";
import axios from "axios";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import {
  useFollowMutation,
  useGetUserByUsernameQuery,
  useUnFollowMutation,
} from "../../accountApiSlice";
import { followCountAtom } from "../../view/FollowButton";

export default function useFollow(
  userId: string,
  username: string,
  followers: number,
  followId?: string
) {
  const [followerCount, setFollowerCount] = useAtom(followCountAtom);
  const [isFollowing, setIsFollowing] = useState(followId ? true : false);
  const [isPending, setIsPending] = useState(false);
  const { data, isLoading, isSuccess } = useGetUserByUsernameQuery({
    username: username,
    userId: getAuth()?.id as string,
  });

  useEffect(() => {
    setFollowerCount(followers);
    setIsFollowing(followId ? true : false);
  }, [followers, userId]);

  useEffect(() => {
    if (data?.status === "SUCCESS") {
      if (data?.data.followId) {
        setIsFollowing(true);
      }
    }
  }, [data, isLoading, userId]);

  const [follow] = useFollowMutation();
  const [unfollow] = useUnFollowMutation();
  const handleFollow = async (userId: string) => {
    try {
      setIsPending(true);
      if (isFollowing) {
        // unfollow
        setFollowerCount(followerCount - 1);
        const { data, status } = await unfollow({ userId: userId }).unwrap();
        if (status === "SUCCESS") {
          setIsFollowing(false);
          setIsPending(false);
        }
      } else {
        // follow
        setFollowerCount(followerCount + 1);
        const { data, status } = await follow({ userId: userId }).unwrap();
        if (status === "SUCCESS") {
          setIsFollowing(true);
          setIsPending(false);
        }
      }
    } catch (err) {
      setIsPending(false);
      console.log(err);
    }
  };
  return { isFollowing, handleFollow, followerCount };
}
