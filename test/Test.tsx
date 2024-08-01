import React from "react";
import Invites from "./Invites";

export const ATest = () => {
  const [email, setEmail] = React.useState<string>("");

  //* Invites:

  let content;

  content = (
    <div className="text-white flex flex-col">
      <h1>Invite Assistant</h1>
      <input
        className="bg-black"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Invites title={"Assistant"} />
      <Invites title={"Merchant"} />
    </div>
  );

  return <div className="bg-green-500 p-4">{content}</div>;
};
