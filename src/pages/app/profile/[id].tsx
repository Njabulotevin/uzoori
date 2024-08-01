import { NoSSR } from "@/components/molecules/NoSSR";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect } from "react";
import axios from "axios";
import { ImerchantUser, Iuser } from "@/app/models/user";
import UserProfile from "@/app/features/accounts/view/profile/UserProfile";

export default function ProfileView({ user }: { user: ImerchantUser }) {
  return (
    <NoSSR>
      <div className="">
        <UserProfile user={user} />
      </div>
    </NoSSR>
  );
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps<{ user: Iuser }> | string = async (
  context
) => {
  const boilerPlate: Iuser = {
    id: "",
    name: "",
    username: "",
    email: "",
    accountType: "general",
    password: "",
    confirmPassword: "",
    description: "",
  };

  // const { data } = await axios.get(
  //   `http://localhost:5000/api/v1/user/id/${context?.params?.id}`
  // );

  // Object.keys(boilerPlate).forEach((key: string) => {
  //   boilerPlate[key] =
  //     typeof data.data[key] === "undefined" ? "" : data.data[key];
  // });

  return {
    props: {
      user: { ...boilerPlate },
    },
  };
};
