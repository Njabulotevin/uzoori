import { iPost, IpublicUser } from "@/app/models/user";
import { convertToUnix } from "@/scripts/utils";
import { Data } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useGetPeopleYouMayKnowQuery } from "../../accounts/accountApiSlice";
import {
  useGetUserPostsQuery,
  useLazyGetUserPostsQuery,
} from "../contentApiSlice";

export default function useFeeds() {
  const [userPosts, setUserPosts] = useState<iPost[]>([]);
  const [endOfPosts, setEndOfPosts] = useState(false);

  const {
    data: postsData,
    isLoading,
    isSuccess,
    isUninitialized,
  } = useGetUserPostsQuery({ offset: 0 });
  const [isPending, setIsPending] = useState(isLoading);

  const isDataReady = () => {
    try {
      if (isUninitialized) {
        return false;
      } else if (isLoading) {
        return false;
      } else if (isSuccess) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    setIsPending(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (postsData) {
      if (postsData?.data.length === 0) {
        setEndOfPosts(true);
      }
      setUserPosts(postsData?.data);
    }
    setIsPending(false);
  }, [postsData, isSuccess]);

  const [getNewPosts] = useLazyGetUserPostsQuery();

  const loadMore = async () => {
    try {
      setIsPending(true);
      const { data, status } = await getNewPosts({ offset: 20 });
      if (data?.data.length === 0) {
        setEndOfPosts(true);
        setIsPending(false);
      } else {
        setUserPosts([...userPosts, ...(data?.data as iPost[])]);
        setIsPending(false);
      }
    } catch (err) {
      setIsPending(false);
      console.log(err);
    }
  };

  return { userPosts, loadMore, isPending, endOfPosts, isDataReady };
}
