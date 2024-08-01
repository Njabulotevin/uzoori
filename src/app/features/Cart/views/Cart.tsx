import { Iproduct } from "@/app/models/product";
import { iPostProduct, iProduct, IpublicUser } from "@/app/models/user";
import Button from "@/components/molecules/Button";
import UserName from "@/components/molecules/UserName";
import { titleCap } from "@/scripts/utils";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  BsArrowLeft,
  BsDash,
  BsPlus,
  BsTrashFill,
  BsXLg,
} from "react-icons/bs";
import { useGetUserByIdQuery } from "../../accounts/accountApiSlice";
import useCart from "../hooks/useCart";

interface groupedType {
  [key: string]: unknown[];
}

export default function Cart() {
  const {
    cart,
    closeCart,
    activeCart,
    setActiveCart,
    getUserProducts,
    getCartTotal,
  } = useCart();

  return (
    <div className=" flex flex-col gap-4 dark:bg-darkMode-900 bg-white shadow dark:shadow-none border  dark:border-darkMode-500  rounded-md p-5">
      <div className="flex justify-between">
        <h5 className="flex gap-5 items-center dark:text-gray-100 font-medium">
          {activeCart !== "" && (
            <span className="cursor-pointer" onClick={() => setActiveCart("")}>
              <BsArrowLeft />
            </span>
          )}
          <span className="text-sm">
            Shopping Cart ({Object.keys(cart).length})
          </span>
        </h5>
        <div
          onClick={closeCart}
          className="border border-gray-200 rounded-[14px] w-10 h-10 flex items-center justify-center cursor-pointer"
        >
          <span className="text-slate-700 dark:text-slate-200">
            <BsXLg />
          </span>
        </div>
      </div>
      {Object.keys(cart).length === 0 ? (
        <div className="flex flex-col gap-4 my-5"></div>
      ) : (
        <div className="">
          {Object.keys(cart).length > 1 ? (
            activeCart === "" ? (
              <div className="flex flex-col gap-4">
                {Object.keys(cart).map((user) => {
                  return (
                    <div key={user} onClick={() => setActiveCart(user)}>
                      <Merchant userId={user} showItems={true} />
                    </div>
                  );
                })}
                <div className="flex justify-between font-semibold text-gray-700 dark:text-gray-100">
                  <span>Total</span>
                  <span>R {getCartTotal()}</span>
                </div>
              </div>
            ) : (
              <div className="">
                <CartView
                  list={getUserProducts(activeCart)}
                  userId={activeCart}
                />
              </div>
            )
          ) : (
            <CartView
              list={getUserProducts(Object.keys(cart)[0])}
              userId={Object.keys(cart)[0]}
            />
          )}
        </div>
      )}
    </div>
  );
}

export function CartProduct({
  product,
  userId,
  handleQty,
  lockQty,
}: {
  product: Iproduct;
  userId: string;
  handleQty: Function;
  lockQty?: boolean | false;
}) {
  const [count, setCount] = useState(1);
  const { removeFromCart, cartQty, getProductQty } = useCart();

  return (
    <div className="flex gap-3 justify-between items-start">
      <div className="flex gap-3">
        <div className="rounded-md w-16 h-16">
          <img
            src={
              typeof product?.productImage !== "undefined"
                ? product?.productImage[0]?.imageUrl
                : ""
            }
            alt={""}
            className="object rounded-m w-[100%] h-[100%]"
          />
        </div>
        <div className="flex flex-col gap-1 text-gray-700 text-xs lg:text-sm font-semibold dark:text-gray-100">
          <h4>{titleCap(product.name)}</h4>
          <p>R {product.price}</p>
          <button
            onClick={() => removeFromCart(product.id, userId)}
            className="text-gray-700 font-medium underline dark:text-gray-500"
          >
            Remove
          </button>
        </div>
      </div>
      {lockQty ? (
        <p className="flex items-center gap-2 justify-center text-gray-700 text-base font-medium dark:text-gray-100">
          <span className="font-semibold">Qty:</span>
          <span>{getProductQty(product.id)}</span>
        </p>
      ) : (
        <div className="flex items-center">
          <button
            onClick={() => {
              handleQty(product.id, userId, "decrease");
            }}
            className="bg-violet-600 p-1 lg:p-2 rounded-md text-gray-100"
          >
            <BsDash size={18} />
          </button>
          <span className="w-[30px] flex items-center justify-center text-gray-700 text-base font-medium dark:text-gray-100">
            {getProductQty(product.id)}
          </span>
          <button
            onClick={() => {
              handleQty(product.id, userId, "increase");
            }}
            className="bg-violet-600 p-1 lg:p-2 rounded-md text-gray-100"
          >
            <BsPlus size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export function Merchant({
  userId,
  showItems,
}: {
  userId: string;
  showItems?: boolean;
}) {
  const { data, isLoading, isSuccess } = useGetUserByIdQuery({ id: userId });
  const { cart } = useCart();
  const [user, setUser] = useState<IpublicUser>({} as IpublicUser);
  const { name, username, displayImageUrl } = user;

  useEffect(() => {
    if (data) {
      setUser(data?.data as IpublicUser);
      console.log(data);
    }
  }, [data, isLoading]);

  const items = typeof cart[userId] === "undefined" ? 0 : cart[userId].length;

  return (
    <div className="dark:hover:bg-gray-800 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
      <div className="flex justify-between">
        <UserName
          name={name}
          userName={username}
          imgSrc={displayImageUrl}
          type={"merchant"}
          isVerified={false}
          size="large"
        />{" "}
        {showItems && (
          <p className="text-gray-700 dark:text-gray-100 font-semibold text-sm">
            {items} {items === 1 ? "item" : "items"}
          </p>
        )}
      </div>
    </div>
  );
}

function CartView({ list, userId }: { list: Iproduct[]; userId: string }) {
  const { handleCompleteOrder, handleQty, isPending, getUserTotal } = useCart();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4 my-5">
        {list.map((product) => {
          return (
            <CartProduct
              handleQty={handleQty}
              key={product.id}
              product={product}
              userId={userId}
            />
          );
        })}
      </div>

      <div className="flex justify-between text-gray-700 dark:text-gray-100 text-sm font-semibold py-3">
        <h4>Total</h4>
        <h4>R {getUserTotal(list)}</h4>
      </div>
      <Button
        onClick={() => handleCompleteOrder(userId)}
        size={"default"}
        variant={"primary"}
        isPending={isPending}
      >
        Confirm Order
      </Button>
    </div>
  );
}
