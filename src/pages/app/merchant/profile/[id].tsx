import { NoSSR } from "@/components/molecules/NoSSR";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { Iuser } from "@/components/molecules/authentication/types";
import UserProfile from "@/app/features/accounts/view/profile/UserProfile";
import { ImerchantUser } from "@/app/models/user";

export default function ProfileView({ user }: { user: ImerchantUser }) {
  const Router = useRouter();

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

export const getStaticProps:
  | GetStaticProps<{ user: ImerchantUser }>
  | string = async (context) => {
  const boilerPlate: ImerchantUser = {
    id: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
    name: "",
    username: "",
    email: "",
    accountType: "merchant",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: 0,
    category: "",
    province: "",
    description: "",
    country: "south africa",
    firstContactNumber: "",
    secondContactNumber: "",
    weekdayStart: 0,
    weekdayEnd: 0,
    saturdayStart: 0,
    saturdayEnd: 0,
    sundayStart: 0,
    sundayEnd: 0,
  };

  const { data } = await axios.get(
    ` https://3f5d-41-169-13-10.ngrok-free.app/api/v1/user/id/${context?.params?.id}`
  );

  Object.keys(boilerPlate).forEach((key: string) => {
    boilerPlate[key] =
      typeof data.data[key] === "undefined" ? "" : data.data[key];
  });

  return {
    props: {
      user: { ...boilerPlate },
    },
  };
};
