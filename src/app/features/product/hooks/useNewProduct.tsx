import { inputType } from "@/app/models/common";
import { Iproduct, productImgType } from "@/app/models/product";
import { useFormik } from "formik";
import React, { useState } from "react";
import { BsClock } from "react-icons/bs";
import useModal from "../../PopUp/hooks/useModal";
import ProductDetails from "../views/ProductDetails";
import useProductList from "./useProductList";
import {
  useCreateProductMutation,
  usePostImageMutation,
} from "../productApiSlice";
import { updateProduct } from "../services/manageProduct";
import { errorType } from "../../accounts/types";
import { ProductType } from "../types";
import { renameFile } from "@/scripts/utils";
import { useAtom } from "jotai";
import { loadingAtom } from "../../PopUp/stores/LoadingStore";
import useToast from "../../PopUp/hooks/useToast";
import NewProduct from "../views/NewProduct";
import useBottomToast from "../../PopUp/hooks/useBottomToast";

export default function useNewProduct() {
  const { setModal, openModal, closeModal } = useModal();
  const [createProduct, response] = useCreateProductMutation();
  const [uploadImage] = usePostImageMutation();

  // ! issue_65: Temporally placed here.
  const [error, setError] = React.useState<errorType>({
    message: "",
    state: false,
  });

  const [imageDisplay, setImageDisplay] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [isPending, setIsPending] = useAtom(loadingAtom);
  const { openToast, setToast } = useToast();
  const { openBottomToast } = useBottomToast();

  const initialValues: Iproduct = {
    id: "",
    name: "",
    available: true,
    price: 0,
    originalPrice: 0,
    currency: "ZAR",
    collectionType: "product",
    description: "",
    productImage: [],
    estimatedTime: 0,
    productType: "AS",
  };

  const { values, handleChange, handleSubmit, setValues } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        imageList.forEach((img, i) => {
          const newImg = renameFile(img, `${name}.image_${i}.jpeg`);
          formData.append("image", newImg);
        });
        // upload images---
        setIsPending(true);
        const { data: imageData, status: imageStatus } = await uploadImage(
          formData
        ).unwrap();

        if (imageStatus === "SUCCESS") {
          const price: number = values.price as number;
          const originalPrice: number = values.originalPrice as number;
          const estimatedTime: number = values.estimatedTime as number;
          const { data, status } = await createProduct({
            ...values,
            productImage: [...imageData],
            price: price,
            originalPrice: originalPrice,
            estimatedTime: estimatedTime,
          }).unwrap();

          if (status === "SUCCESS") {
            setIsPending(false);
            closeModal();
            openBottomToast("Product Successfully created!");
            console.log(data);
          }
        }
      } catch (error) {
        setIsPending(false);
        closeModal();
        openBottomToast("Oops! Product Not created");
        setError({ message: "Something went wrong", state: true });
      }
    },
  });

  const setProductType = (selected: string) => {
    setValues({ ...values, productType: selected });
  };

  const {
    id,
    name,
    price,
    originalPrice,
    currency,
    collectionType,

    description,
    estimatedTime,
    productImage,
    productType,
  } = values;

  const step_0: inputType[] = [
    {
      placeholder: "Name",
      label: "Name",
      name: "name",
      type: "text",
      value: name,
      gridSpan: "col-span-6 lg:col-span-2",
    },
    {
      placeholder: "Product Details",
      label: "Product Details",
      name: "description",
      type: "textarea",
      value: description,
      gridSpan: "col-span-6",
    },
    {
      placeholder: "Duration",
      label: "Duration",
      name: "estimatedTime",
      type: "number",
      value: estimatedTime,
      iconConfig: { icon: <BsClock />, position: "left", onClick: () => {} },
      gridSpan: "col-span-6 lg:col-span-2",
    },
  ];

  const step_3: inputType[] = [
    {
      placeholder: "Price",
      label: "Price",
      name: "price",
      type: "number",
      value: price,
      gridSpan: "col-span-6 lg:col-span-3",
    },
    {
      placeholder: "Original Price",
      label: "Original Price",
      name: "originalPrice",
      type: "number",
      value: originalPrice,
      gridSpan: "col-span-6 lg:col-span-3",
    },
  ];

  const productDetailsFields: inputType[] = [
    {
      placeholder: "Product Type",
      label: "Product Type",
      name: "productType",
      type: "dropdown",
      value: productType,
      gridSpan: "col-span-6 lg:col-span-2",
      options: ["assisted service", "unassisted product"],
    },
    {
      placeholder: "Duration",
      label: "Duration",
      name: "duration",
      type: "text",
      value: estimatedTime,
      iconConfig: { icon: <BsClock />, position: "left", onClick: () => {} },
      gridSpan: "col-span-6 lg:col-span-2",
    },
  ];
  const productAssistantsFields: { name: string; username: string }[] = [];
  const productImagesFields: string[] = [];
  const productPricesFields: inputType[] = [
    {
      placeholder: "Price",
      label: "Price",
      name: "price",
      type: "price",
      value: price,
      gridSpan: "col-span-6 lg:col-span-3",
    },
    {
      placeholder: "Original Price",
      label: "Original Price",
      name: "originalPrice",
      type: "price",
      value: originalPrice,
      gridSpan: "col-span-6 lg:col-span-3",
    },
  ];

  const handleCreateNewProduct = () => {
    openModal({
      modalChild: (
        <div className="w-full lg:w-[600px] ">
          <NewProduct />
        </div>
      ),
      title: "New Product",
      subtitle: "",
      action: () => {},
    });
  };

  return {
    handleCreateNewProduct,
    handleChange,
    handleSubmit,
    productPricesFields,
    productDetailsFields,
    productImagesFields,
    productAssistantsFields,
    imageDisplay,
    setImageDisplay,
    imageList,
    setImageList,
    step_0,
    step_3,
    setProductType,
  };
}

// <ProductDetails
// product={{
//   id: "",
//   name: name,
//   price: price,
//   originalPrice: originalPrice,
//   currency: currency,
//   collectionType: collectionType,
//   description: description,
//   estimatedTime: estimatedTime,
//   productImage: productImage,
//   available: true,
// }}
// type={"new"}
// />
