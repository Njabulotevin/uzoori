import Button from "@/components/molecules/Button";
import UserName from "@/components/molecules/UserName";
import React from "react";

export default function Wallet() {
  return (
    <div className="lg:w-[600px] w-full flex flex-col gap-5">
      <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-10">
        <div className="flex gap-10">
          <div className="flex flex-col gap-2 text-gray-700 dark:text-gray-100">
            <h5 className="font-semibold uppercase text-sm text-gray-500 dark:text-gray-400">
              Account Balance
            </h5>
            <h4 className="font-semibold text-2xl">R8 760.80</h4>
          </div>
          <div className="flex flex-col gap-2 text-gray-700 dark:text-gray-100">
            <h5 className="font-semibold uppercase text-sm text-gray-500 dark:text-gray-400">
              Total Sales
            </h5>
            <h4 className="font-semibold text-2xl">600</h4>
          </div>
        </div>
        <div className="">
          <Button size={"default"} variant={"primary"}>
            Withdraw
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {testUser.map((user, i) => {
          return (
            <div className="flex justify-between " key={i}>
              <UserName
                name={user.name}
                userName={"john_sa"}
                imgSrc={""}
                type={"general"}
                isVerified={false}
              />
              <h4 className="text-gray-700 dark:text-gray-200 font-semibold text-sm">
                + R {user.amount}
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const testUser = [
  { name: "John", amount: 502.5 },
  { name: "Alice", amount: 751.25 },
  { name: "Michael", amount: 305.75 },
  { name: "Sarah", amount: 907.8 },
  { name: "David", amount: 650.0 },
];
