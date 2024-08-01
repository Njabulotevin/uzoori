import { Iproduct } from "@/app/models/product";
import { iPostProduct } from "@/app/models/user";
import { getIncryptedData } from "@/scripts/utils";
import { atom } from "jotai";

export interface iCart {
  [key: string]: Iproduct[];
}
export interface iCartProductQty {
  [key: string]: number;
}

const getCartFromLocalStorage = (
  type: "cart" | "cartQty"
): iCart | iCartProductQty => {
  try {
    if (type === "cart") {
      return getIncryptedData(type) as iCart;
    } else {
      return getIncryptedData(type) as iCartProductQty;
    }
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const cartAtom = atom<iCart>(
  (getCartFromLocalStorage("cart") as iCart) ?? {}
);
export const activeCartAtom = atom<string>("");
export const isCartOnAtom = atom<boolean>(false);
export const cartQuantityAtom = atom<iCartProductQty>(
  (getCartFromLocalStorage("cartQty") as iCartProductQty) ?? {}
);
