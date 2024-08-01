import Button from "@/components/molecules/Button";
import { DropDown } from "@/components/molecules/Form";
import React, { useState } from "react";
import useModal from "../../PopUp/hooks/useModal";
import { useUpdateUserMutation } from "../accountApiSlice";
import { errorType } from "../types";

export default function useCreateAssistant() {
  const { openModal } = useModal();

  const handleMigrateToAssistant = () => {
    openModal({
      modalChild: <CreateAssistant />,
      title: "Migrate account",
      subtitle: "Changing your account type to assistant user",
      action: () => {},
    });
  };

  return { handleMigrateToAssistant };
}

function CreateAssistant() {
  const [category, setCategory] = useState("salon");
  const [update] = useUpdateUserMutation();
  const { closeModal } = useModal();
  const [error, setError] = useState<errorType>({
    message: "",
    state: false,
  });

  // make migrate account request
  const handleSubmit = async () => {
    try {
      console.log("sent");
      const { status, data } = await update({
        category: category,
        accountType: "assistant",
      }).unwrap();
      console.log(data);
    } catch (error) {
      setError({ message: "Something went wrong", state: true });
    }
    closeModal();
  };

  return (
    <div className="flex flex-col gap-4">
      <DropDown
        value={category}
        placeholder={""}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        name={""}
        isRequired={false}
        isError={false}
        options={["barder", "salon"]}
        label={"Category"}
      ></DropDown>
      <Button onClick={handleSubmit} size={"default"} variant={"primary"}>
        Submit
      </Button>
    </div>
  );
}
