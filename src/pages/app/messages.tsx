
import React, { useEffect } from "react";

type invitation = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  merchant: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    name: string;
    username:string;
  };
  merchantUserId: string;
  assistantUser: null;
  assistantUserId: string;
};

export default function Messages() {

const [invites, setInvites] = React.useState<invitation[]>([])









  return (
    <div>
      {/* {invites.map((invite: invitation, i: number) => {
        return (
          <div key={i} className="flex gap-4 border justify-between items-center border-gray-200 rounded p-6">
            <p>{invite.merchant.name} sent you an invitation to be an assistant</p>
            <div className="flex gap-4">
              <button onClick={()=>handleAcceptInvite(invite.id)} className="btn btn-primary">Accept</button>
              <button className="btn btn-secondary">Reject</button>
            </div>
          </div>
        );
      })} */}
    </div>
  );
}
