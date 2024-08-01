import { inputType } from "@/app/models/common";
import { Iproduct } from "@/app/models/product";
import { provinces } from "@/app/models/provinces";
import Button from "@/components/molecules/Button";
import {
  Checkbox,
  DropDown,
  Input,
  PhoneNumberInput,
  Toggle,
  TextArea,
} from "@/components/molecules/Form";
import UserName from "@/components/molecules/UserName";
import { handleAddImg } from "@/scripts/utils";
import React, { useState } from "react";
import {
  BsImage,
  BsPeople,
  BsPeopleFill,
  BsPlus,
  BsPlusLg,
} from "react-icons/bs";
import useProductDetails from "../hooks/useProductDetails";
import useMerchantAssistants from "../../merchant/hooks/useMerchantAssistants";
// import { useInviteAssistantMutation } from "../../merchant/merchantApiSlice";
import useNewProduct from "../hooks/useNewProduct";
import { useProductUserMutation } from "../productApiSlice";
import { IpublicUser } from "@/app/models/user";
import useBottomToast from "../../PopUp/hooks/useBottomToast";

const testUsers = [
  {
    username: "bobsmith789",
    name: "Bob Smith",
    email: "bobsmith789@example.com",
    accountType: "general",
    description:
      "I'm a foodie and love to try out new restaurants and recipes.",
    displayImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    username: "sarahjones101",
    name: "Sarah Jones",
    email: "sarahjones101@example.com",
    accountType: "general",
    description:
      "I'm a fitness enthusiast and enjoy trying out new workout routines.",
    displayImageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    username: "alexanderbrown",
    name: "Alexander Brown",
    email: "alexanderbrown@example.com",
    accountType: "general",
    description:
      "I'm a tech enthusiast and always interested in the latest gadgets and software.",
    displayImageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

export default function ProductDetails(props: {
  type: "new" | "details";
  product: Iproduct;
}) {
  const productDetails = useProductDetails(props.product);
  const newProduct = useNewProduct();

  const [isAssistantsOn, setIsAssistantsOn] = useState(false);

  const { assistantList } = useMerchantAssistants();

  const [createProductUser] = useProductUserMutation();

  console.log(productDetails.productAssistantsFields);
  const {openBottomToast} = useBottomToast()

  const handleAddAssistants = async ({ id }: { id: string }) => {
    try {
      console.log(id);
      const { data, status } = await createProductUser({
        userId: id,
        productId: props.product.id,
      }).unwrap();
      if (status === "SUCCESS") {
        setIsAssistantsOn(false);
        openBottomToast("Assistant was added!");
      }
    } catch (err) {
      console.log(err);
      setIsAssistantsOn(false);
      openBottomToast("Oops! could not add the assistant");
    }
  };

  const checkType = (ifNew: any, ifNot: any) => {
    return props.type === "new" ? ifNew : ifNot;
  };

  return (
    <form
      onSubmit={checkType(newProduct.handleSubmit, productDetails.handleSubmit)}
      className="flex flex-col gap-[50px] max-w-[650px] mb-20 lg:mb-0"
    >
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Product Details
        </h4>
        <div className="grid grid-cols-6 gap-2 gap-y-[20px]">
          <RenderDifferentInputs
            list={checkType(
              newProduct.productDetailsFields,
              productDetails.productDetailsFields
            )}
            handleChange={checkType(
              newProduct.handleChange,
              productDetails.handleChange
            )}
          />
        </div>
      </div>
      {props.type === "details" && (
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Product Assistants
          </h4>
          <div className="flex flex-col gap-4 relative">
            {productDetails.productAssistantsFields.length === 0 ? (
              <div className="flex flex-col gap-4 items-center ">
                <div className="bg-violet-50 p-[10px] w-[67px] h-[67px] rounded flex items-center justify-center text-violet-600">
                  <BsPeopleFill size={47} />
                </div>
                <Button
                  size={"default"}
                  variant={"primary"}
                  type="button"
                  icon={{ icon: <BsPlus />, variant: "icon-label" }}
                  onClick={() => setIsAssistantsOn(true)}
                >
                  Add Assistant
                </Button>
                {isAssistantsOn && (
                  <AddAssistants
                    assistantList={assistantList}
                    handleAddAssistants={handleAddAssistants}
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  {productDetails.productAssistantsFields.map((item, i) => {
                    return (
                      <div
                        key={`${i}_${item.name}`}
                        className=" py-2 flex gap-2 justify-between items-center"
                      >
                        <div className="flex gap-3 items-center">
                          <Checkbox checked={false} onChange={() => {}} />
                          <UserName
                            size="small"
                            name={item.name}
                            userName={item.username}
                            imgSrc={""}
                            type={"general"}
                            isVerified={false}
                          />
                        </div>
                        <span className="text-xs text-red-700 bg-red-100 rounded font-semibold p-2">
                          Remove
                        </span>
                      </div>
                    );
                  })}
                </div>
                {isAssistantsOn && (
                  <AddAssistants
                    assistantList={assistantList}
                    handleAddAssistants={handleAddAssistants}
                  />
                )}
                <Button
                  size={"default"}
                  variant={"primary"}
                  type="button"
                  icon={{ icon: <BsPlus />, variant: "icon-label" }}
                  onClick={() => setIsAssistantsOn(true)}
                >
                  Add Assistant
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Product Images
        </h4>
        {props.type === "details" ? (
          productDetails.productImagesFields.length === 0 ? (
            <div className="flex flex-col gap-4 items-center">
              <BsImage className="text-violet-600" size={47} />
              <p className="text-sm text-slate-500">
                Please ensure that the images you upload have a file size of no
                more than 2 MB.
              </p>
              <Button
                size={"default"}
                variant={"primary"}
                type="button"
                icon={{ icon: <BsPlus />, variant: "icon-label" }}
                onClick={() =>
                  handleAddImg(
                    productDetails.setImageList,
                    productDetails.setImageDisplay,
                    productDetails.imageDisplay,
                    productDetails.imageList
                  )
                }
              >
                Add Image
              </Button>
            </div>
          ) : (
            <ProductImagesList
              setImage={productDetails.setImageList}
              setDisplay={productDetails.setImageDisplay}
              display={productDetails.imageDisplay}
              image={productDetails.imageList}
              list={productDetails.productImagesFields}
            />
          )
        ) : newProduct.imageDisplay.length === 0 ? (
          <div className="flex flex-col gap-4 items-center">
            <BsImage className="text-violet-600" size={47} />
            <p className="text-sm text-slate-500">
              Please ensure that the images you upload have a file size of no
              more than 2 MB.
            </p>
            <Button
              size={"default"}
              variant={"primary"}
              type="button"
              icon={{ icon: <BsPlus />, variant: "icon-label" }}
              onClick={() =>
                handleAddImg(
                  newProduct.setImageList,
                  newProduct.setImageDisplay,
                  newProduct.imageDisplay,
                  newProduct.imageList
                )
              }
            >
              Add Image
            </Button>
          </div>
        ) : (
          <ProductImagesList
            setImage={newProduct.setImageList}
            setDisplay={newProduct.setImageDisplay}
            display={newProduct.imageDisplay}
            image={newProduct.imageList}
            list={newProduct.imageDisplay}
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Product Prices
        </h4>
        <div className="grid grid-cols-6 gap-2">
          {props.type === "details" ? (
            <RenderDifferentInputs
              list={productDetails.productPricesFields}
              handleChange={productDetails.handleChange}
            />
          ) : (
            <RenderDifferentInputs
              list={newProduct.productPricesFields}
              handleChange={newProduct.handleChange}
            />
          )}
        </div>
      </div>
      <Button type="submit" size={"default"} variant={"primary"}>
        {props.type === "new" ? "Create Product" : "Update Product"}
      </Button>
    </form>
  );
}

export function ProductImagesList({
  list,
  setImage,
  setDisplay,
  display,
  image,
}: {
  list: string[];
  setImage: Function;
  setDisplay: Function;
  display: string[];
  image: object[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {list.map((item, i) => {
        return (
          <div className="" key={i}>
            <img
              className="w-[90px] h-[90px] rounded object-cover"
              src={item}
              alt="product image"
            />
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => handleAddImg(setImage, setDisplay, display, image)}
        className="w-[90px] h-[90px] text-violet-700 flex items-center justify-center cursor-pointer rounded bg-violet-200 border-2 border-violet-700 border-dashed"
      >
        <BsPlusLg />
      </button>
    </div>
  );
}

export const RenderDifferentInputs = ({
  list,
  handleChange,
}: {
  list: inputType[];
  handleChange: React.ChangeEventHandler<any>;
}) => {
  return (
    <>
      {list?.map((item, i) => {
        switch (item.type) {
          case "dropdown":
            return (
              <div key={i} className={item?.gridSpan}>
                <DropDown
                  value={item.value as string}
                  placeholder={item.placeholder}
                  onChange={handleChange}
                  name={item.name}
                  isRequired={false}
                  isError={false}
                  options={item.options as string[]}
                  label={item.label}
                />
              </div>
            );
          case "textarea":
            return (
              <div key={i} className={item.gridSpan}>
                <TextArea
                  value={item.value}
                  placeholder={item.placeholder}
                  onChange={handleChange}
                  name={item.name}
                  isRequired={false}
                  isError={false}
                  label={item.label}
                />
              </div>
            );
          case "switch":
            return (
              <div key={i} className={item.gridSpan}>
                <Toggle
                  isOn={item.value as boolean}
                  setSwitch={() => {}}
                  label={item.label}
                />
              </div>
            );
          case "phoneNumber":
            return (
              <div key={i} className={item.gridSpan}>
                <PhoneNumberInput
                  value={item.value}
                  placeholder={item.placeholder}
                  onChange={handleChange}
                  name={item.name}
                  isRequired={false}
                  isError={false}
                  label={item.label}
                />
              </div>
            );
          default:
            return (
              <div key={i} className={item.gridSpan}>
                <Input
                  value={item.value}
                  placeholder={item.placeholder}
                  onChange={handleChange}
                  name={item.name}
                  isRequired={false}
                  isError={false}
                  label={item.label}
                  type={item.type}
                />
              </div>
            );
        }
      })}
    </>
  );
};

function AddAssistants({
  assistantList,
  handleAddAssistants,
}: {
  assistantList: IpublicUser[];
  handleAddAssistants: Function;
}) {
  return (
    <div className="bg-white dark:bg-gray-600 shadow rounded p-4">
      {assistantList?.map((user, i) => {
        return (
          <div
            key={i}
            className=" py-2 flex gap-2 justify-between items-center cursor-pointer hover:bg-gray-100 rounded p-2 px-6"
            onClick={() => {
              handleAddAssistants({ id: user.id as string });
              console.log(user);
            }}
          >
            <div className="flex gap-3 items-center">
              <UserName
                size="small"
                name={user.name as string}
                userName={user.username as string}
                imgSrc={""}
                type={user.accountType as "merchant" | "general" | "assistant"}
                isVerified={false}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
