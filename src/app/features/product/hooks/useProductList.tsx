import { Iproduct } from "@/app/models/product";
import React, { useState } from "react";
import { useGetAllProductQuery, useGetOwnerProductsQuery } from "../productApiSlice";
import { ProductType } from "../types";

export default function useProductList() {
  const [marked, setMarked] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Published");

  // ! issue_65: error on useProductTable  getting an error when I request data through an api.
  const { data: products, isLoading } = useGetOwnerProductsQuery();


  // let content;
  let productList : Iproduct[];

  // if (isLoading) productList = <p>loading...</p>;
  products ? (productList = products?.data as Iproduct[]) : (productList = []);

  console.log(productList)

  return { productList, marked, setMarked, activeTab, setActiveTab };
}
