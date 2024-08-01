import { ImerchantUser, IpublicUser, Iuser } from "@/app/models/user";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import { loadingAtom } from "../../PopUp/stores/LoadingStore";
import {
  useGetAllAssistantLinkedToMerchantQuery,
  useInviteAssistantAsMerchantMutation,
} from "../merchantApiSlice";
import React, { useState, useEffect } from "react";
// import {
//   useGetAssistantQuery,
//   useGetMerchantAssistantsQuery,
// } from "../usersSlice";
import { useGetAssistantAsMerchantQuery } from "../merchantApiSlice";
import { UserType } from "../../accounts/types";
import useToast from "../../PopUp/hooks/useToast";
import { getAuth } from "@/scripts/utils";

export default function useMerchantAssistants() {
  const [isActive, setIsActive] = useState<Iuser | null>(null);
  const {
    data: assistants,
    isLoading,
    isError,
    error,
  } = useGetAssistantAsMerchantQuery({ limit: 1, offset: -1 });

  const [inviteAssistant] = useInviteAssistantAsMerchantMutation();

  const [activeTab, setActiveTab] = useState("Members");
  const { data: memberAssistants, isSuccess: membersAssistantsSuccess } =
    useGetAllAssistantLinkedToMerchantQuery({ id: getAuth()?.id as string });

  const [isPending, setIsPending] = useAtom(loadingAtom);
  const { openToast, setToast } = useToast();

  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: { email: "" },
    onSubmit: async (values) => {
      try {
        setIsPending(true);
        // make request to send invitation
        const { data, status } = await inviteAssistant({
          email: values.email,
        }).unwrap();
        if (status === "SUCCESS") {
          setToast({
            modalChild: <div></div>,
            type: "SUCCESS",
            message: `Invite has been successfully sent to ${values.email}`,
          });
          openToast();
          resetForm();
          console.log(data);
        }
        console.log(values);
        setIsPending(false);
      } catch (err) {
        setToast({
          modalChild: <div></div>,
          type: "ERROR",
          message: `Oops! could not send invite to ${values.email}, something went wrong!`,
        });
        openToast();

        setIsPending(false);
        console.log(err);
      }
    },
  });

  const [assistantList, setAssistantList] = useState<IpublicUser[]>([]);
  const [pendingAssistantList, setPendingAssistantList] = useState<
    IpublicUser[]
  >([]);

  useEffect(() => {
    if (assistants) {
      const mappedPendingUsers: IpublicUser[] | null = assistants?.data.map(
        (item: any) => {
          return {
            name: item.assistantUser.name,
            username: item.assistantUser.username,
            displayImageUrl: item.assistantUser.displayImageUrl
              ? item.assistantUser.displayImageUrl
              : "",
            id: item.user?.id,
          } as IpublicUser;
        }
      );
      setPendingAssistantList(mappedPendingUsers);
    }
  }, [assistants, isLoading]);

  useEffect(() => {
    const mappedMemberUsers = memberAssistants?.data.map((item: any) => {
      return {
        name: item.user?.name,
        username: item.user?.username,
        displayImageUrl: item.user?.displayImageUrl
          ? item.user?.displayImageUrl
          : "",
        id: item.user?.id,
      };
    });

    setAssistantList(mappedMemberUsers as IpublicUser[]);
  }, [membersAssistantsSuccess, memberAssistants]);

  return {
    isActive,
    setIsActive,
    isLoading,
    isError,
    error,
    assistantList,
    pendingAssistantList,
    values,
    handleChange,
    handleSubmit,
    setActiveTab,
    activeTab,
  };
}
function getAllAssistantLinkedToMerchant(arg0: { id: string | undefined }): {
  data: any;
  isSuccess: any;
} {
  throw new Error("Function not implemented.");
}
