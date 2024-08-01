import { IpublicUser } from "@/app/models/user";
import { setAuth } from "@/scripts/utils";
import React, { useEffect, useState } from "react";
import { useLoadUserWithCookieQuery } from "../accountApiSlice";

export default function useAutoLogin() {
  const { data, isLoading, isSuccess, isUninitialized } =
    useLoadUserWithCookieQuery("");
  const [user, setUser] = useState<IpublicUser | null>(null);

  useEffect(() => {
    if (data) {
      setAuth(data?.data);
    }
  }, [data, isLoading]);

  const getUser = (): IpublicUser | string => {
    if (isLoading || isUninitialized) {
      return "loading";
    } else {
      return user as IpublicUser;
    }
  };

  return { getUser, isSuccess };
}
