import { Iproduct } from "@/app/models/product";
import React, { useState } from "react";
import useProductDetails from "./useProductDetails";

export default function useProductTable(
  list: Iproduct[],
  marked: string[],
  setMarked: Function
) {
  //* ! solved_65: error on useProductTable  getting an error when I request data through an api.

  const [active, setActive] = useState("");

  const handleCheck = (id: string) => {
    // const exist = marked.find((x) => x === id);
    // if (exist) {
    //   setMarked([...marked.filter((rm) => rm !== id)]);
    // } else {
    //   setMarked([...marked, id]);
    // }
  };

  const handleMarkAll = () => {
    // if (marked.length === list?.length) {
    //   setMarked([]);
    // } else {
    //   const markedList = list?.map((item) => item.id);
    //   setMarked([...markedList]);
    // }
  };
  const isAllMarked = true; // marked.length === list?.length;
  return { isAllMarked, active, setActive, handleCheck, handleMarkAll };
}
