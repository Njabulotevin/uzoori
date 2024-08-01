import { Iproduct } from "@/app/models/product";
import { getIncryptedData } from "@/scripts/utils";
import { atom, useAtom } from "jotai";
import { iCart } from "../Cart/CartSore";

export interface iOrder {
  userId: string;
  products: Array<{ productId: string; quantity: number; product: Iproduct }>;
  totalPrice: number;
  [key: string]: unknown;
}

export const getOrderFromLocalStorage = () => {
  try {
    const data = getIncryptedData("order_details");
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const orderSummaryAtom = atom<iOrder | null>(
  (getOrderFromLocalStorage() as iOrder) ?? null
);
