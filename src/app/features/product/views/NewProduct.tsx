import Button from "@/components/molecules/Button";
import { handleAddImg } from "@/scripts/utils";
import clsx from "clsx";
import React, { ReactNode, useState } from "react";
import { BsCheckCircleFill, BsImage, BsPlus } from "react-icons/bs";
import useNewProduct from "../hooks/useNewProduct";
import { ProductImagesList, RenderDifferentInputs } from "./ProductDetails";

export default function NewProduct() {
  const {
    step_0,
    step_3,
    productDetailsFields,
    productImagesFields,
    setImageList,
    setImageDisplay,
    imageDisplay,
    imageList,
    handleChange,
    handleSubmit,
    setProductType: onChangeProductType,
  } = useNewProduct();
  const [step, setStep] = useState(0);

  const [productType, setProductType] = useState("AS");
  const productTypes = [
    { value: "AS", label: "Assisted Service" },
    { value: "UG", label: "Unassisted Product" },
    { value: "UST", label: "Unassisted Service Tickets" },
  ];

  switch (step) {
    case 1:
      return (
        <StepWrapper
          title="Product Details"
          step={step}
          setStep={setStep}
          handleSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-3">
            <RenderDifferentInputs list={step_0} handleChange={handleChange} />
          </div>
        </StepWrapper>
      );
    case 2:
      return (
        <StepWrapper
          title="Product Images"
          subtitle="Add atleast 3 images for your product"
          step={step}
          setStep={setStep}
          handleSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            {imageDisplay.length === 0 ? (
              <div className="flex flex-col gap-4 items-center">
                <BsImage className="text-violet-600" size={47} />
                <p className="text-sm text-slate-500">
                  Please ensure that the images you upload have a file size of
                  no more than 2 MB.
                </p>
                <Button
                  size={"default"}
                  variant={"primary"}
                  type="button"
                  icon={{ icon: <BsPlus size={18} />, variant: "icon-label" }}
                  onClick={() =>
                    handleAddImg(
                      setImageList,
                      setImageDisplay,
                      imageDisplay,
                      imageList
                    )
                  }
                >
                  Add Image
                </Button>
              </div>
            ) : (
              <ProductImagesList
                setImage={setImageList}
                setDisplay={setImageDisplay}
                display={imageDisplay}
                image={imageList}
                list={imageDisplay}
              />
            )}
          </div>
        </StepWrapper>
      );
    case 3:
      return (
        <StepWrapper
          title="Product Price"
          step={step}
          setStep={setStep}
          handleSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-3">
            <RenderDifferentInputs list={step_3} handleChange={handleChange} />
          </div>
        </StepWrapper>
      );

    default:
      return (
        <StepWrapper
          title="Product Type"
          subtitle=" This will determine the features included in the product"
          step={step}
          setStep={setStep}
          handleSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-3">
            {productTypes.map((item, i) => {
              return (
                <div
                  key={i}
                  className={clsx(
                    "  rounded-md p-2  cursor-pointer px-4 h-[60px] flex gap-3 items-center",
                    item.value === productType
                      ? "border-2 border-violet-600 text-violet-600 dark:text-violet-400"
                      : "border border-gray-200 dark:border-gray-400 text-gray-700 dark:text-gray-100"
                  )}
                  onClick={() => {
                    setProductType(item.value);
                    onChangeProductType(item.value);
                  }}
                >
                  <BsCheckCircleFill />{" "}
                  <h4 className="text-sm font-semibold">{item.label}</h4>
                </div>
              );
            })}
          </div>
        </StepWrapper>
      );
  }
}

function StepWrapper({
  children,
  setStep,
  step,
  title,
  subtitle,
  handleSubmit,
}: {
  children: ReactNode;
  step: number;
  setStep: Function;
  title: string;
  subtitle?: string;
  handleSubmit: Function;
}) {
  return (
    <div className="flex flex-col gap-10 h-[90vh] lg:h-auto">
      <div className="">
        <h4 className="text-gray-700 dark:text-gray-100 font-bold ">{title}</h4>
        <p className="text-gray-700 dark:text-gray-100 font-normal text-sm">
          {subtitle}
        </p>
      </div>
      {children}
      <div className="flex gap-4 justify-between lg:justify-end">
        <Button
          onClick={() => setStep(step - 1)}
          size={"default"}
          variant={"secondary"}
          className="w-[150px]"
        >
          Back
        </Button>
        {step === 3 ? (
          <Button
            onClick={() => handleSubmit()}
            size={"default"}
            variant={"primary"}
            className="w-[150px]"
          >
            Submit
          </Button>
        ) : (
          <Button
            onClick={() => setStep(step + 1)}
            size={"default"}
            variant={"primary"}
            className="w-[150px]"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
