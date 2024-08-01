import { inputType } from "@/app/models/common";
import { Iproduct } from "@/app/models/product";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import useModal from "../../PopUp/hooks/useModal";
import ProductDetails from "../views/ProductDetails";
import useProductList from "./useProductList";
import { useCreateProductMutation } from "../productApiSlice";
import { errorType } from "../../accounts/types";
import { ProductType } from "../types";
import { useAtom } from "jotai";
import { loadingAtom } from "../../PopUp/stores/LoadingStore";
import { IpublicUser } from "@/app/models/user";
import { string } from "yup";

export default function useProductDetails(product: Iproduct) {
  //   name, collection, duration, product details,
  const [createProduct] = useCreateProductMutation();
  const [error, setError] = React.useState<errorType>({
    message: "",
    state: false,
  });

  // * issue_65: change type "Iproduct" to "ProductType"
  const initialValues: Iproduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    currency: product.currency,
    collectionType: product.collectionType,
    description: product.description,
    available: product.available,
    productImage: product.productImage, // * issue_65: data format aka types
    estimatedTime: product.estimatedTime,
    productUser: product.productUser,
    productType: product.productType,
  };

  const [productUsers, setProductUsers] = useState<IpublicUser[]>([]);

  useEffect(() => {
    if (product) {
      const mapped: IpublicUser[] = product?.productUser?.map(({ user }) => {
        return {
          name: user.name,
          username: user.username,
          displayImageUrl: user.displayImageUrl ? user.displayImageUrl : "",
        };
      }) as IpublicUser[];

      setProductUsers(mapped);
    }
  }, []);

  const [imageDisplay, setImageDisplay] = useState([]);
  const [imageList, setImageList] = useState([]);

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
        setError({ message: "Something went wrong", state: true });
      }
    },
  });

  const {
    id,
    name,
    price,
    originalPrice,
    currency,
    collectionType,
    estimatedTime,
    description,
    available,
    productImage,
  } = values;

  const productDetailsFields: inputType[] = [
    {
      placeholder: "Name",
      label: "Name",
      name: "name",
      type: "text",
      value: name,
      gridSpan: "col-span-6 lg:col-span-2",
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
    {
      placeholder: "Product Details",
      label: "Product Details",
      name: "description",
      type: "textarea",
      value: description,
      gridSpan: "col-span-6",
    },
  ];
  const mapImages: string[] = initialValues.productImage.map(
    (image) => image.imageUrl
  ) as string[];

  const productAssistantsFields: IpublicUser[] = productUsers
    ? productUsers
    : [];

  const productImagesFields: string[] = [...mapImages, ...imageDisplay];
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

  return {
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
  };
}
