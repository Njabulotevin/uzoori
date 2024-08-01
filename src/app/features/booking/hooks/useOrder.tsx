import { getIncryptedData, setIncryptedData } from "@/scripts/utils";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useBottomToast from "../../PopUp/hooks/useBottomToast";
import { useUgOrderMutation } from "../bookingApiSlice";
import { iOrder, orderSummaryAtom } from "../OrderStore";

export const getOrderFromLocalStorage = () => {
  try {
    const data = getIncryptedData("order_details");
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default function useOrder() {
  const Router = useRouter();
  const [order, setOrder] = useAtom(orderSummaryAtom);
  const [makeOrder] = useUgOrderMutation();
  const { openBottomToast } = useBottomToast();
  const [isPending, setIsPending] = useState(false);

  const setOrderToLocalStorage = (order: iOrder | null) => {
    try {
      if (order) {
        setIncryptedData("order_details", order as iOrder);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getOrderDetails = () => {
    const emptyOrder = {
      userId: "",
      products: [],
      totalPrice: 0,
    };
    try {
      if (order) {
        return order;
      } else {
        return emptyOrder;
      }
    } catch {
      return emptyOrder;
    }
  };

  const getProductFromOrder = (productId: string) => {
    try {
      const product = getOrderDetails().products.find(
        (product) => product.productId === productId
      );
      return product;
    } catch (err) {
      return null;
    }
  };

  const clearOrder = () => {
    try {
      setOrderDetails(null);
    } catch (err) {
      console.log(err);
    }
  };

  const setOrderDetails = (orderSummary: iOrder | null) => {
    try {
      setOrder(orderSummary);
      setOrderToLocalStorage(orderSummary);
    } catch (err) {
      console.log(err);
    }
  };

  const completeOrder = async () => {
    try {
      setIsPending(true);
      const { userId, products } = getOrderDetails();
      const transformData = products.map((product) => {
        return { productId: product.productId, quantity: product.quantity };
      });
      const { data, status } = await makeOrder(transformData).unwrap();
      if (status === "SUCCESS") {
        console.log(data);
        openBottomToast("Order Completed");
        setIsPending(false);
        Router.push("/app/order/success");
        setIsPending(false);
        window.location.assign(data.URL);
      }
    } catch (err) {
      console.log(err);
      setIsPending(false);
    }
  };

  return {
    getOrderDetails,
    setOrderDetails,
    isPending,
    completeOrder,
    clearOrder,
  };
}
