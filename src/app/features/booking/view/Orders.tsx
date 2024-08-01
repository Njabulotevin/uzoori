import { Order, OrderProduct } from "@/app/models/events";
import Button from "@/components/molecules/Button";
import UserName from "@/components/molecules/UserName";
import { dummyFood } from "@/scripts/utils";
import clsx from "clsx";
import { format } from "date-fns";
import React, { useState } from "react";
import { BsClock, BsDot, BsXLg } from "react-icons/bs";

type typeDumyOrder = {
  id: string;
  status: "in_progress" | "complete" | null;
};
export default function Orders({
  orders,
  handleLoadMore,
  renderType,
}: {
  orders: Order[];
  handleLoadMore: Function;
  renderType: "merchant" | "general";
}) {
  // remove to a hooks---------------
  const [activeOrder, setActiveOrder] = useState<string>("");

  const testOrders: typeDumyOrder[] = [
    { id: "39458", status: "complete" },
    { id: "890460", status: "in_progress" },
    { id: "178359", status: "in_progress" },
    { id: "867690", status: "complete" },
    { id: "96712", status: "complete" },
  ];

  //   remove to hook ------------------

  return (
    <div className={`${activeOrder !== "" ? "grid grid-cols-1" : ""} gap-4`}>
      <div className="flex flex-col gap-4">
        {orders.map((item, i) => {
          return (
            <div className="flex flex-col gap-3" key={i}>
              <Order
                onClick={() => {
                  setActiveOrder(item.id);
                }}
                renderType={renderType}
                order={item}
              />
              <div className="flex w-full">
                {activeOrder === item.id && (
                  <div className="flex-1">
                    <OrderSummary
                      order={
                        orders.find(
                          (order) => order.id === activeOrder
                        ) as Order
                      }
                      onClose={() => setActiveOrder("")}
                    />
                  </div>
                )}
              </div>
            </div>
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
      {/* <div className="hidden xl:flex ">
        {activeOrder.id !== "" && (
          <div className="flex-1">
            <OrderSummary
              order={activeOrder}
              onClose={() => setActiveOrder({ id: "", status: null })}
            />
          </div>
        )}
      </div> */}
    </div>
  );
}

function OrderSummary({
  onClose,
  order,
}: {
  onClose: React.MouseEventHandler<HTMLElement>;
  order: Order;
}) {
  return (
    <div className="box-small p-5">
      <h4 className="text-gray-700 dark:text-gray-300 font-semibold flex justify-between gap-2">
        <div className="flex flex-col gap-2 ">
          {" "}
          <span className="">Order No:</span>{" "}
          <span># {order.id.slice(0, 8)} ...</span>
        </div>

        <div
          onClick={onClose}
          className="border border-gray-200 rounded-[14px] w-10 h-10 flex items-center justify-center cursor-pointer"
        >
          <span className="text-slate-700 dark:text-slate-200">
            <BsXLg />
          </span>
        </div>
      </h4>

      <div className="flex flex-col gap-4">
        {order.orderProduct.map((orderProduct) => {
          return (
            <OrderProduct orderProduct={orderProduct} key={orderProduct.id} />
          );
        })}
      </div>

      <div className="text-sm flex flex-col gap-3">
        <p className="flex justify-between">
          <span className="font-medium text-gray-400">
            Items ({order.orderProduct.length})
          </span>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            R {order.price}
          </span>
        </p>
        <p className="flex justify-between">
          <span className="font-medium text-gray-400">Tax </span>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            R0
          </span>
        </p>
        <p className="flex justify-between">
          <span className="font-medium text-gray-400">Total </span>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            R {order.price}
          </span>
        </p>
      </div>
    </div>
  );
}

function OrderProduct({ orderProduct }: { orderProduct: OrderProduct }) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <img
          className="w-[50px] rounded-md aspect-square"
          src={orderProduct.product.productImage[0].imageUrl}
          alt=""
        />

        <div className="text-xs lg:text-sm">
          <h4 className="text-gray-700 dark:text-gray-300 font-semibold">
            {orderProduct.product.name}
          </h4>
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            {orderProduct.product.collectionType}
          </p>

          <p className="text-gray-700 dark:text-gray-300 font-medium text-xs">
            R {orderProduct.price}
          </p>
        </div>
      </div>

      <h4 className="text-gray-700 dark:text-gray-300 font-semibold text-sm">
        R{orderProduct.price}
      </h4>
    </div>
  );
}

export const statuses = {
  complete:
    "bg-green-100 text-green-600 dark:text-gray-300 dark:border dark:border-gray-700 dark:bg-gray-700",
  in_progress:
    "bg-orange-100 text-orange-600 dark:text-gray-300 dark:border dark:border-gray-700 dark:bg-gray-700",
};

export type statusType = "complete" | "in_progress";

function Order({
  onClick,
  order,
  renderType,
}: {
  onClick: React.ReactEventHandler<HTMLDivElement>;
  order: Order;
  renderType: "merchant" | "general";
}) {
  const orderStatus: statusType = order.status as statusType;

  return (
    <div
      onClick={onClick}
      className="box-small flex flex-col gap-4 shadow-none border dark:border-gray-600 rounded-md dark:bg-gray-600 cursor-pointer p-3 lg:p-5"
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-2 items-start">
          {order.orderProduct.length > 2 ? (
            <div className="flex gap-2 items-start">
              {" "}
              {order.orderProduct.slice(0, 2).map((product) => {
                return (
                  <div key={product.id} className="w-[80px] h-[80px] ">
                    <img
                      src={product.product.productImage[0].imageUrl}
                      alt=""
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                );
              })}
              <div className="w-[80px] h-[80px]  relative rounded-md  bg-gray-800 flex justify-center items-center">
                <div className="w-[80px] h-[80px] absolute top-0 left-0 rounded-md "></div>
                <p className="text-gray-700 dark:text-gray-100 font-bold text-sm">
                  More
                </p>
              </div>
            </div>
          ) : (
            order.orderProduct.map((product) => {
              return (
                <div key={product.id} className="w-[80px] h-[80px] ">
                  <img
                    src={product.product.productImage[0].imageUrl}
                    alt=""
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              );
            })
          )}
        </div>
        <div className="flex flex-col items-end gap-2 text-xs lg:text-sm">
          <h4 className="text-gray-700 dark:text-gray-300 font-semibold">
            R {order.price}
          </h4>
          <p className="text-gray-400 font-medium text-sm">
            {order.orderProduct.length} item(s)
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <div
          className="
        flex flex-col gap-2"
        >
          <div className="flex flex-col gap-3 items-start">
            <div className="flex items-center gap-2">
              {renderType === "merchant" ? (
                <UserName
                  name={order.user.name}
                  userName={order.user.username}
                  imgSrc={order.user.displayImageUrl}
                  type={"general"}
                  isVerified={false}
                />
              ) : (
                <UserName
                  name={order.merchant.name as string}
                  userName={order.merchant.username}
                  imgSrc={order.merchant.displayImageUrl}
                  type={"merchant"}
                  isVerified={false}
                />
              )}
              <p className="text-sm font-medium text-gray-500 flex gap-2 items-center">
                <BsDot />{" "}
                <span>
                  {format(new Date(order.date * 1000), "MMM dd, yyyy")} at{" "}
                  {format(new Date(order.date * 1000), "p")}
                </span>
              </p>
            </div>

            <span
              className={clsx(
                ` p-2 text-xs font-semibold rounded px-4`,
                statuses["in_progress"]
              )}
            >
              {"in_progress".replace("_", "-")}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full hidden lg:flex">
        <Button
          onClick={() => {}}
          className="flex-1"
          size={"default"}
          variant={"primary"}
        >
          {"View Order"}
        </Button>
      </div>
    </div>
  );
}
