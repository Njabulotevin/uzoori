import React, { useEffect, useState } from "react";
import { UserType } from "../../accounts/types";
import {
  useAcceptInviteMutation,
  useGetAllInvitesAsAssistantQuery,
} from "../../merchant/merchantApiSlice";

export interface IassistantInvite {
  id: string;
  createdAt: number;
  updatedAt: number;
  deletedAt: null;
  merchant: {
    id: string;
    deletedAt: null;
    name: string;
    username: string;
  };
  merchantUserId: string;
  assistantUser: null;
  assistantUserId: string;
}

export default function useAssistantInvitation() {
  const [assistantInvites, setAssistantInvites] = useState<IassistantInvite[]>(
    []
  );

  const { data, isLoading, isSuccess } = useGetAllInvitesAsAssistantQuery({
    limit: 20,
    offset: 1,
  });

  const [accept] = useAcceptInviteMutation();

  useEffect(() => {
    if (data) {
      setAssistantInvites([...data.data]);
    }
  }, [data, isSuccess]);

  const handleAccept = async (id: string) => {
    // ! request to accept
    try {
      const { data, status } = await accept({ id: id }).unwrap();

      if (status === "SUCCESS") {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = () => {
    // ! request to reject
  };

  return { handleAccept, handleReject, assistantInvites };
}
