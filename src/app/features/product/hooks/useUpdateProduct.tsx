import { Iproduct } from "@/app/models/product";
import { isPending } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import React from "react";
import { loadingAtom } from "../../PopUp/stores/LoadingStore";

export default function useUpdateProduct({ product }: { product: Iproduct }) {
  const initialValues: Iproduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    currency: product.currency,
    collectionType: product.collectionType,
    description: product.description,
    available: product.available,
    estimatedTime: product.estimatedTime,
    productImage: product.productImage, // * issue_65: data format aka types
    productType: product.productType,
  };

  const [isPending, setIsPending] = useAtom(loadingAtom);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        console.log(isPending);
        setIsPending(true);
        // const {data, status} = await createProduct(values).unwrap();

        // const {data, status} = await uploadImages(productImage).unwrap()
        setIsPending(false);
      } catch (error) {
        setIsPending(false);
        // setError({ message: "Something went wrong", state: true });
        console.log(error);
      }
    },
  });
  return { values, handleChange, handleSubmit };
}
