import { getCookie, setCookies } from "cookies-next";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getIncryptedData, setIncryptedData } from "@/scripts/utils";
import {
  useLazySearchUserQuery,
  useSearchPostQuery,
  useSearchProductQuery,
  useSearchUserQuery,
} from "../searchApiSlice";
import { iPost, IpublicUser } from "@/app/models/user";
import { Iproduct } from "@/app/models/product";

export default function useSearch() {
  const Router = useRouter();
  const searchParams = useSearchParams();
  const {
    data: searchPost,
    isLoading: searchPostLoading,
    isSuccess: searchPostSuccess,
  } = useSearchPostQuery({
    q: searchParams.get("q") ?? "",
  });
  const [searchUsers] = useLazySearchUserQuery();
  const {
    data: searchUser,
    isLoading: searchUserLoading,
    isSuccess: searchUserSuccess,
  } = useSearchUserQuery({
    q: searchParams.get("q") ?? "",
  });
  const {
    data: searchProduct,
    isLoading: searchProductLoading,
    isSuccess: searchProductSuccess,
  } = useSearchProductQuery({
    q: searchParams.get("q") ?? "",
  });

  const [activeTab, setActiveTab] = useState("People");

  const Tabs = ["People", "Posts", "Products"];
  const [history, setHistory] = useState<{ id: string; question: string }[]>(
    []
  );

  const [searchPostsResults, setSearchPostsResults] = useState<Array<iPost>>(
    []
  );
  const [searchUserResults, setSearchUserResults] = useState<IpublicUser[]>([]);
  const [searchProductResults, setSearchProductResults] = useState<Iproduct[]>(
    []
  );

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (searchProduct && searchProduct.data) {
      setSearchProductResults(searchProduct.data as Iproduct[]);
    }
  }, [searchProduct, searchProductLoading]);
  useEffect(() => {
    if (searchUser && searchUser.data) {
      setSearchUserResults(searchUser.data);
    }
  }, [searchUser, searchUserLoading]);

  const { handleSubmit, values, handleChange, setValues } = useFormik({
    initialValues: { question: searchParams.get("q") ?? "" },
    onSubmit: (values) => {
      try {
        Router.push(encodeURI(`/app/search?q=${values.question}`));
        if (values.question !== "") {
          setIncryptedData(
            "search_history",
            JSON.stringify([
              ...history,
              { id: uuidv4(), question: values.question },
            ])
          );
        }
        setIsActive(false);
      } catch (err) {
        console.log(err);
      }
    },
  });
  const [suggestedUsers, setSuggestedUsers] = useState<IpublicUser[]>([]);
  const getSuggestedUsers = async (q: string) => {
    try {
      const { data } = await searchUsers({ q: q });
      setSuggestedUsers(data?.data as IpublicUser[]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (searchPost && searchPost.data) {
      setSearchPostsResults(searchPost.data);
    }
  }, [searchPost, searchPostLoading]);

  const getSearchResults = (): iPost[] | IpublicUser[] | Iproduct[] => {
    if (activeTab === "Posts") {
      return searchPostsResults as iPost[];
    } else if (activeTab === "Products") {
      return searchProductResults as Iproduct[];
    } else {
      return searchUserResults as IpublicUser[];
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(
      searchPostLoading && searchUserLoading && searchProductLoading
    );
  }, [searchPostLoading, searchUserLoading, searchProductLoading]);

  return {
    handleSubmit,
    values,
    handleChange,
    activeTab,
    setActiveTab,
    Tabs,
    history,
    setValues,
    isActive,
    setIsActive,
    getSearchResults,
    isLoading,
    suggestedUsers,
    getSuggestedUsers,
  };
}
