import { Iproduct } from "@/app/models/product";
import { iPostProduct, iProduct, IpublicUser } from "@/app/models/user";
import { getIncryptedData, setIncryptedData } from "@/scripts/utils";
import axios from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../../accounts/accountApiSlice";
import { useUgOrderMutation } from "../../booking/bookingApiSlice";
import useOrder from "../../booking/hooks/useOrder";
import useBottomToast from "../../PopUp/hooks/useBottomToast";
import {
  activeCartAtom,
  cartAtom,
  cartQuantityAtom,
  iCart,
  isCartOnAtom,
  iCartProductQty,
} from "../CartSore";

export const getCartFromLocalStorage = (type: "cart" | "cartQty") => {
  try {
    return getIncryptedData(type);
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const setCartToLocalStorage = (
  type: "cart" | "cartQty",
  cart: iCart | iCartProductQty
) => {
  try {
    setIncryptedData(type, cart);
  } catch (err) {
    console.log(err);
  }
};

export default function useCart() {
  const [cart, setCart] = useAtom(cartAtom);
  const [isCartOn, setIsCartOn] = useAtom(isCartOnAtom);
  const [activeCart, setActiveCart] = useAtom(activeCartAtom);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [cartQty, setCartQty] = useAtom(cartQuantityAtom);
  const Router = useRouter();
  const orderDetails = useOrder();

  const addToCart = (product: { userId: string; product: Iproduct }) => {
    try {
      const exist = cart[product.userId]?.find(
        (target) => product.product.id === target.id
      );
      if (!exist) {
        const newCart = {
          ...cart,
          [product.userId]: appendProduct(product.userId, product.product),
        };

        const newCartQty = {
          ...cartQty,
          [product.product.id]: 1,
        };
        setCart(newCart);
        setCartQty(newCartQty);
        setCartToLocalStorage("cart", newCart);
        setCartToLocalStorage("cartQty", newCartQty);
        openCart();
      } else {
        handleQty(product.product.id, product.userId, "increase");
        openCart();
      }
    } catch (err) {
      console.log("Cart error:", err);
    }
  };

  const clearCart = () => {
    setCart({});
  };

  const clearUserCart = (userId: string) => {
    try {
      delete cart[userId];
      setCart({ ...cart });
      setCartToLocalStorage("cart", { ...cart });
    } catch (err) {
      console.log(err);
    }
  };

  const openCart = () => {
    setIsCartOn(true);
  };

  const closeCart = () => {
    setIsCartOn(false);
  };

  const toggleCart = () => {
    setIsCartOn(!isCartOn);
  };

  const getUserProducts = (userId: string): Array<Iproduct> => {
    try {
      return cart[userId];
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const appendProduct = (userId: string, product: Iproduct): Iproduct[] => {
    try {
      if (getUserProducts(userId).length !== 0) {
        return [...cart[userId], product];
      } else {
        return [product];
      }
    } catch (err) {
      return [product];
    }
  };

  const getProductQty = (productId: string): number => {
    try {
      return cartQty[productId];
    } catch (err) {
      return 0;
    }
  };

  const getUserTotal = (list: Iproduct[]): number => {
    let total = 0;
    try {
      list.forEach((product) => {
        total += product.price * getProductQty(product.id);
      });
      return parseInt(total.toFixed(2));
    } catch (err) {
      console.log(err);
      return parseInt(total.toFixed(2));
    }
  };

  const getCartTotal = () => {
    let total = 0;
    try {
      Object.keys(cart).map((user) => {
        total += getUserTotal(getUserProducts(user));
      });
      return parseInt(total.toFixed(2));
    } catch (err) {
      console.log(err);
      return parseInt(total.toFixed(2));
    }
  };

  const handleQty = (
    id: string,
    userId: string,
    action: "decrease" | "increase"
  ) => {
    try {
      if (action === "decrease") {
        const decrease = getProductQty(id) - 1;
        if (decrease === 0) {
          removeFromCart(id, userId);
          return 0;
        } else {
          const newCartQty = { ...cartQty, [id]: decrease };
          setCartQty(newCartQty);
          setCartToLocalStorage("cartQty", newCartQty);
          return decrease;
        }
      } else {
        const increase = getProductQty(id) + 1;
        setCartQty({ ...cartQty, [id]: increase });
        return increase;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromCart = (id: string, userId: string) => {
    try {
      const newList = cart[userId].filter((target) => target.id !== id);
      if (newList.length === 0) {
        delete cart[userId];
        setCart({ ...cart });
        setCartToLocalStorage("cart", { ...cart });
      } else {
        const newCart = { ...cart, [userId]: [...newList] };
        setCart(newCart);
        setCartToLocalStorage("cart", newCart);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCompleteOrder = async (userId: string) => {
    try {
      setIsPending(true);
      const transformData = getUserProducts(userId).map((product) => {
        return {
          productId: product.id,
          quantity: getProductQty(product.id),
          product: product,
        };
      });

      orderDetails.setOrderDetails({
        userId: userId,
        products: transformData,
        totalPrice: getUserTotal(getUserProducts(userId)),
      });
      Router.push("/app/order/confirm_order");
      clearUserCart(userId);
      closeCart();
      setIsPending(false);
    } catch (err) {
      console.log(err);
      setIsPending(false);
    }
  };

  return {
    cart,
    addToCart,
    isCartOn,
    handleCompleteOrder,
    removeFromCart,
    activeCart,
    setActiveCart,
    isPending,
    handleQty,
    cartQty,
    getProductQty,
    getUserProducts,
    openCart,
    closeCart,
    toggleCart,
    getUserTotal,
    getCartTotal,
  };
}
