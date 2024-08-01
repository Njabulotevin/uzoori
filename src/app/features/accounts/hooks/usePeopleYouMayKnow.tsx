import { IpublicUser } from "@/app/models/user";
import { convertToUnix } from "@/scripts/utils";
import React, { useEffect, useState } from "react";
import {
  useGetPeopleYouMayKnowQuery,
  useLazyGetPeopleYouMayKnowQuery,
} from "../accountApiSlice";

export default function usePeopleYouMayKnow(limit: number) {
  const [peopleYouMayKnow, setPeopleYouMayKnow] = useState<IpublicUser[]>([]);

  const {
    data: followPeople,
    isLoading: isLoadingFollowPeople,
    refetch,
  } = useGetPeopleYouMayKnowQuery(
    {
      limit: limit,
      offset: convertToUnix(new Date()),
    },
    { refetchOnMountOrArgChange: true }
  );

  // const [getPeople] = useLazyGetPeopleYouMayKnowQuery();

  useEffect(() => {
    if (followPeople) {
      setPeopleYouMayKnow(followPeople.data);
    }
  }, [followPeople, isLoadingFollowPeople]);

  const getPeopleYouMayKnow = async () => {
    refetch();
  };
  return { peopleYouMayKnow, getPeopleYouMayKnow };
}
