import Button from "@/components/molecules/Button";
import { Checkbox, Input, Toggle } from "@/components/molecules/Form";
import { Iproduct } from "@/app/models/product";
import { StackedProfile } from "@/components/molecules/UserName";
import React, { useEffect, useState } from "react";
import { BsPlus, BsPlusLg, BsSearch } from "react-icons/bs";
import useModal from "../../PopUp/hooks/useModal";
import useNewProduct from "../hooks/useNewProduct";
import useProductDetails from "../hooks/useProductDetails";
import useProductList from "../hooks/useProductList";
import useProductTable from "../hooks/useProductTable";
import ProductDetails from "./ProductDetails";
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
  useMultipleProductsMutation,
  useProductUserMutation,
} from "../productApiSlice";
import { useAcceptInviteMutation } from "../../merchant/merchantApiSlice";
import { useSetState } from "rooks";
import { ProductType, ProductsResponseType } from "../types";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "components/ui/table";
import clsx from "clsx";

export default function Products() {
  const { productList, setMarked, marked, activeTab, setActiveTab } =
    useProductList();

  const { handleCreateNewProduct } = useNewProduct();

  return (
    <div className="flex flex-col gap-[50px] ">
      <div className="box-small">
        <h4 className="text-base font-semibold text-gray-700 dark:text-slate-300 lg:text-lg p-5">
          Your Products
        </h4>
        <div className="flex flex-col justify-between items-center lg:flex-row gap-3  rounded p-[5px]">
          <div className="flex flex-col lg:flex-row gap-3 w-full">
            <TableNavigation
              active={activeTab}
              setActive={setActiveTab}
              views={["Published", "Unpublished"]}
            />
            <Input
              value={undefined}
              placeholder={"Search Product"}
              onChange={() => {}}
              name={""}
              isRequired={false}
              isError={false}
              icon={{
                element: <BsSearch />,
                position: "left",
                onClick: () => {},
              }}
            />
          </div>
          <Button
            size={"default"}
            variant={"primary"}
            className="w-full lg:w-[170px]"
            icon={{ icon: <BsPlus size={18} />, variant: "icon-label" }}
            onClick={handleCreateNewProduct}
          >
            Add Product
          </Button>
        </div>
        {/* ----------table start---------------- */}
        <ProductTable
          marked={marked}
          setMarked={setMarked}
          list={productList}
        ></ProductTable>
      </div>
    </div>
  );
}

export function TableNavigation({
  views,
  active,
  setActive,
}: {
  views: string[];
  active: string;
  setActive: Function;
}) {
  return (
    <div className="flex justify-between text-sm font-medium bg-slate-100 dark:bg-darkMode-300 items-center rounded-md p-1">
      {/* <span
        onClick={() => setActive("all")}
        className={`${
          active === "all" ? "bg-white dark:bg-slate-500" : "bg-transparent"
        } text-gray-800 dark:text-slate-300 p-[10px] rounded cursor-pointer`}
      >
        All
      </span> */}
      {views.map((item, i) => {
        return (
          <span
            key={i}
            onClick={() => setActive(item)}
            className={`${
              active === item
                ? "bg-white dark:bg-darkMode-500"
                : "bg-transparent"
            } text-gray-800 dark:text-slate-300 p-[10px] rounded-md cursor-pointer`}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}

function ProductTable({
  list,
  marked,
  setMarked,
}: {
  list: Iproduct[];
  marked: string[];
  setMarked: Function;
}) {
  const { isAllMarked, active, setActive, handleCheck, handleMarkAll } =
    useProductTable(list, marked, setMarked);

  return (
    <Table className="w-full">
      {/* --------------table heading starts--------------- */}
      {/* <div className="flex text-slate-700 dark:text-slate-300 px-5 lg:grid lg:grid-cols-[200px_70px_80px_200px_85px] justify-between items-center  py-5 font-semibold">
          <div className="flex gap-2 items-center lg:w-[200px]">
            <Checkbox checked={false} onChange={() => {}} />
            <h4>Name</h4>
          </div>
          <div className="font-semibold">
            <h4>Price</h4>
          </div>
          <div className="font-semibold hidden lg:flex">
            <h4>Duration</h4>
          </div>
          <div className="font-semibold hidden lg:flex">
            <h4>Assistants</h4>
          </div>
          <div className="font-semibold hidden lg:flex">
            <h4>Available?</h4>
          </div>
        </div> */}

      <TableHeader className="text-gray-700 dark:text-gray-100">
        <TableRow>
          <TableHead className="w-[100px]">
            <h4>Name</h4>
          </TableHead>
          <TableHead>
            <h4>Price</h4>
          </TableHead>
          <TableHead className="">
            <h4>Duration</h4>
          </TableHead>
          <TableHead className="">
            <h4>Type</h4>
          </TableHead>
          <TableHead className="">
            <h4>Availability</h4>
          </TableHead>
        </TableRow>
      </TableHeader>

      {/* -------------table data starts------------ */}
      <TableBody className="text-gray-700 dark:text-gray-100">
        {list.map((item, i) => {
          return (
            <TableRow_
              key={i}
              isChecked={marked.find((x) => x === item.id) ? true : false}
              product={item as Iproduct}
              onCheck={() => handleCheck(item.id)}
            />
          );
        })}
      </TableBody>
    </Table>
  );
}

function TableRow_({
  product,
  isChecked,
  onCheck,
}: {
  product: Iproduct;
  isChecked: boolean;
  onCheck: Function;
}) {
  const { setModal, openModal } = useModal();
  const handleRowClick = () => {
    openModal({
      modalChild: <ProductDetails product={product} type={"details"} />,
      title: "Product",
      subtitle: product.id,
      action: () => {},
    });
  };

  return (
    <TableRow onClick={handleRowClick} className="cursor-pointer">
      <TableCell className="flex gap-2 items-center lg:w-[200px]">
        <img
          className="w-[54px] h-[54px] object-cover rounded-[14px] "
          src={product.productImage[0].imageUrl}
          alt="product image"
        />
        <h4 className="max-w-[100px] min-w-[150px]">{product.name}</h4>
      </TableCell>
      <TableCell className="">
        <h4 className="min-w-[100px]">R {product.price}</h4>
      </TableCell>
      <TableCell className="">
        <h4>{product.estimatedTime / 60} min</h4>
      </TableCell>
      <TableCell className="">
        <p className="min-w-[130px]">
          <span className={clsx(typeColors[product.productType])}>
            {productTypes[product.productType]}
          </span>
        </p>
      </TableCell>
      <TableCell className="">
        <Toggle isOn={product.available} setSwitch={() => {}} />
      </TableCell>
    </TableRow>
  );
}

const productTypes: { [key: string]: string } = {
  AS: "Assisted Service",
  UG: "Unassisted Good",
  UST: "Ticket",
};

const typeColors: { [key: string]: string } = {
  AS: "bg-sky-600/60 border border-sky-600 p-2 rounded",
  UG: "bg-rose-600/60 border border-rose-600 p-2 rounded",
  UST: "bg-indigo-600/60 border border-indigo-600 p-2 rounded",
};
