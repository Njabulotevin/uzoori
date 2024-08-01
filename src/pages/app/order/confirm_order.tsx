import useOrder from "@/app/features/booking/hooks/useOrder";
import { CartProduct, Merchant } from "@/app/features/Cart/views/Cart";
import Button from "@/components/molecules/Button";
import { TextArea } from "@/components/molecules/Form";
import UserName from "@/components/molecules/UserName";
import { useRouter } from "next/navigation";
import React from "react";
import { BsCheck2Circle, BsCheckCircleFill } from "react-icons/bs";

export default function ConfirmOrder() {
  const Router = useRouter();
  const {
    getOrderDetails,
    setOrderDetails,
    completeOrder,
    clearOrder,
    isPending,
  } = useOrder();

  const { userId, products, totalPrice } = getOrderDetails();

  return (
    <div className="h-[100vh] mt-20 p-4">
      <div className="box-small max-w-[700px] mx-auto p-4">
        <div className="flex  gap-3 border-b dark:border-gray-600 border-gray-200 py-4">
          <BsCheckCircleFill size={30} className="text-violet-600" />
          <h4 className="font-semibold text-base text-gray-700 dark:text-gray-100">
            Order Confirmation
          </h4>
        </div>

        <div className="">
          <Merchant userId={userId} />
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-100">
            Your Order
          </h4>

          <div className="flex flex-col gap-3">
            {products.map((product, index) => {
              return (
                <div key={product.productId} className="">
                  <CartProduct
                    handleQty={() => {}}
                    product={product.product}
                    userId={userId}
                    lockQty={true}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-between">
            <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-100">
              Total
            </h4>
            <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-100">
              R <span>{totalPrice ?? 0}</span>
            </h4>
          </div>
        </div>

        <div className="">
          <div className="">
            <TextArea
              value={""}
              placeholder={"Add Your notes"}
              onChange={() => {}}
              name={"notes"}
              isRequired={false}
              isError={false}
              label={"Order Notes"}
              rows={3}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={completeOrder}
            isPending={isPending}
            size={"default"}
            variant={"primary"}
            className="w-full"
          >
            Complete Order
          </Button>
          <Button
            onClick={() => {
              clearOrder();
              Router.push("/app");
            }}
            size={"default"}
            variant={"secondary"}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
