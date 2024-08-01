import { iEvent, Order, Product } from "@/app/models/events";
import { EmptyOrders } from "@/components/Data/data";
import Button from "@/components/molecules/Button";
import React from "react";
import OrderCard from "./OrderCard";

export default function OrderHistory({
  orders,
  handleLoadMore,
}: {
  orders: Order[];
  handleLoadMore: Function;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-5">
        <div className="px-4 py-[5px] bg-violet-600 dark:text-gray-100  text-gray-100 font-medium hover:bg-violet-300 hover:text-violet-800 cursor-pointer rounded ">
          On-going
        </div>
        <div className="px-4 py-[5px] hover:bg-violet-300 dark:text-gray-100 font-medium hover:text-violet-800 cursor-pointer rounded ">
          Completed
        </div>
        <div className="px-4 py-[5px] hover:bg-violet-300 dark:text-gray-100 font-medium hover:text-violet-800 cursor-pointer rounded ">
          Draft
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {orders.map((order) => {
          const img = order.orderProduct[0].product;

          return (
            <OrderCard
              key={order.id}
              event={order}
              imageUrl={
                typeof img.productImage === "undefined"
                  ? ""
                  : (img.productImage[0].imageUrl as string)
              }
            />
          );
        })}
        <div className="w-full">
          <Button
            className="w-full"
            onClick={() => handleLoadMore()}
            size={"default"}
            variant={"primary"}
          >
            Next
          </Button>
        </div>
      </div>
      {/* <div className="flex flex-col gap-4 w-full items-center">
        <div className="">
          <EmptyOrders />
        </div>
        <h4 className="font-semibold text-base text-violet-600">
          No Orders yet
        </h4>
        <p className="text-sm font-medium text-gray-400">
          You have not made any order yet
        </p>
      </div> */}
    </div>
  );
}
