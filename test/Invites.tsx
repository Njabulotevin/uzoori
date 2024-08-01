import { useGetAllInvitesAsAssistantQuery } from "@/app/features/merchant/merchantApiSlice";
import React from "react";

interface InviteProps {
  title: string;
}

export default function InvitesMerchant(props: InviteProps) {
  const {
    data: AsData,
    isLoading: isLAs,
    isError: isEAs,
    error: eAs,
  } = useGetAllInvitesAsAssistantQuery({
    limit: 1,
    offset: -1,
  });
  return (
    <div>
      <h1>{props.title}</h1>
      {props.title === "Assistant"}
    </div>
  );
}
