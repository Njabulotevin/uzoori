import Button from "@/components/molecules/Button";
import { useRouter } from "next/navigation";
import React from "react";
import { BsXCircleFill } from "react-icons/bs";

export default function Cancel() {
  const Router = useRouter();
  return (
    <div className="h-[100vh] mt-20 p-4">
      <div className="box-small items-center max-w-[700px] mx-auto">
        <BsXCircleFill size={50} className="text-violet-600" />
        <div className="flex flex-col place-items-center gap-3">
          <h4 className="font-semibold text-base text-gray-700 dark:text-gray-100">
            You have cancelled your order
          </h4>
          <p className="dark:text-gray-100 max-w-[80%] text-center text-gray-700 text-sm font-medium ">
            Your order have been cancelled and the payment was not processed
          </p>

          <Button
            onClick={() => {
              Router.push("/app");
            }}
            size={"default"}
            variant={"tertiary"}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
