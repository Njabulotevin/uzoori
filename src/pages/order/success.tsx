import useAutoLogin from "@/app/features/accounts/hooks/useAutoLogin";
import Button from "@/components/molecules/Button";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BsCheck2Circle, BsCheckCircleFill } from "react-icons/bs";

export default function OrderSuccessFull() {
  const Router = useRouter();

  const load = useAutoLogin();

  return (
    <div className="h-[100vh] mt-20 p-4">
      <div className="box-small items-center max-w-[700px] mx-auto">
        <BsCheckCircleFill size={50} className="text-violet-600" />
        <div className="flex flex-col place-items-center gap-3">
          <h4 className="font-semibold text-base text-gray-700 dark:text-gray-100">
            Thank you for your order!
          </h4>
          <p className="dark:text-gray-100 max-w-[80%] text-center text-gray-700 text-sm font-medium ">
            Your order was successful and an order confirmation email has been
            sent to your registered email.
          </p>
          <Button
            onClick={() => Router.push("/app/bookings")}
            size={"default"}
            variant={"primary"}
            className="w-full"
          >
            View Order
          </Button>
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
