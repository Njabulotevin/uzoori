import { iEvent, Order, Product } from "@/app/models/events";
import { accountTypes, ImerchantUser } from "@/app/models/user";
import Button from "@/components/molecules/Button";
import UserName from "@/components/molecules/UserName";
import clsx from "clsx";
import { format, secondsToHours } from "date-fns";
import React, { useState } from "react";
import {
  BsCalendar2,
  BsCalendar2Fill,
  BsChatTextFill,
  BsClock,
  BsClockFill,
  BsCloudUpload,
  BsDot,
  BsExclamationCircle,
  BsEyeSlash,
} from "react-icons/bs";
import { IoReload } from "react-icons/io5";
import useModal from "../../PopUp/hooks/useModal";
import { statuses, statusType } from "./Orders";
import { QRCodeSVG } from "qrcode.react";

export default function OrderCard({
  event,
  imageUrl,
}: {
  event: Order;
  imageUrl: string;
}) {
  const [isActive, setIsActive] = useState(false);

  const address =
    `
    ${event.merchant.addressLine1},
    ${event.merchant.addressLine2}, 
    ${event.merchant.city}` ?? "";

  const getTime = (time: number) => {
    const minutes = (time / 3600 - secondsToHours(time)) * 60;

    return `${secondsToHours(time)}:${
      minutes === 0 ? "00" : minutes.toFixed()
    }`;
  };

  const { openModal } = useModal();

  return (
    <div className="box-small relative dark:bg-gray-600 rounded-lg flex flex-col justify-between  gap-4 p-5 shrink-0 ">
      <div className="flex flex-col gap-4 text-gray-700 dark:text-gray-100 ">
        {!isActive && (
          <div className="flex flex-col gap-4">
            {/* <img
              className="w-[100%] h-[150px] object-cover rounded-md"
              src=.date
              // event.orderProduct[0]?.product?.productImage[0].imageUrl

              alt=""
            /> */}
            <div className="flex justify-between gap-2">
              <div className="flex flex-col gap-3 items-start">
                {/* <h4 className="text-gray-700 dark:text-gray-100 text-sm font-bold">
                  Merchant Name
                </h4> */}
                <div className="my-2">
                  <UserName
                    name={event.merchant.name}
                    userName={event.merchant.username}
                    imgSrc={event.merchant.displayImageUrl}
                    type={"merchant"}
                    isVerified={false}
                  />
                </div>
                <div
                  className={clsx(
                    ` p-2 text-xs font-semibold rounded px-4 w-[160px]`,
                    statuses["in_progress" as statusType]
                  )}
                >
                  <span>{"in_progress".replace("_", "-")}</span>
                </div>

                <p className="text-sm flex gap-2 items-center font-medium text-gray-400">
                  <span>
                    <BsClock />
                  </span>
                  <span>
                    {format(new Date(event.date * 1000), "MMM dd, yyyy")} at{" "}
                    {format(new Date(event.date * 1000), "p")}
                  </span>
                </p>
              </div>
              <div className="">
                <h4 className="text-gray-700 dark:text-gray-100 text-sm font-semibold">
                  R {event.price}
                </h4>
              </div>
            </div>
          </div>
        )}
      </div>
      {isActive && (
        <div className="flex flex-col gap-5 text-gray-700 dark:text-gray-100">
          <div className="flex gap-10">
            <div className="flex items-start justify-between gap-2 w-full">
              <div className="flex items-start gap-2">
                <img
                  className="aspect-square max-w-[60px] object-cover rounded-[14px]"
                  src={imageUrl}
                  alt=""
                />
                <div className="flex flex-col gap-2">
                  <h4 className="text-gray-700 dark:text-gray-100 text-sm font-semibold">
                    {event.orderProduct[0].product.name}
                  </h4>
                  <p className="text-gray-400 dark:text-gray-50 font-medium">
                    {event.orderProduct[0].product.collectionType}
                  </p>
                  <div className="flex gap-2 items-center">
                    <BsClock />{" "}
                    <p>
                      {event.orderProduct[0].product.estimatedTime / 60} min
                    </p>
                  </div>
                </div>
              </div>

              {/* <div className="flex justify-between text-gray-700 dark:text-gray-100 font-medium">
                <h4>R {orderProduct?.product.price}</h4>
              </div> */}
            </div>
          </div>
          <UserName
            name={event.merchant.name}
            userName={event.merchant.username}
            imgSrc={event.merchant.displayImageUrl}
            type={"merchant"}
            isVerified={false}
          />

          <p className="text-sm font-semibold">Store Address : </p>
          <div className="flex flex-col gap-2">
            <p className="font-normal">{address}</p>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold">Your assistant: </p>
              <UserName
                name={event.orderProduct[0].assistant?.name as string}
                userName={event.orderProduct[0].assistant?.username as string}
                imgSrc={
                  event.orderProduct[0].assistant?.displayImageUrl as string
                }
                type={
                  event.orderProduct[0].assistant?.accountType as accountTypes
                }
                isVerified={true}
              />
            </div>
            <div className="flex gap-2 bg-violet-600 items-center font-semibold text-gray-50 text-sm justify-center p-3 rounded">
              <div className="flex gap-2 items-center">
                <BsCalendar2Fill />
                <p>{format(new Date(event.date * 1000), "MMM dd")}</p>
              </div>
              <div className="flex gap-2 items-center">
                <BsClockFill />
                <p>{getTime(event.timeStart)} - </p>
                <p>{getTime(event.timeEnd)}</p>
              </div>
            </div>
            <Button
              size={"default"}
              variant={"secondary"}
              icon={{
                icon: <BsEyeSlash size={18} />,
                variant: "icon-label",
              }}
              onClick={() => {
                openModal({
                  title: "Appointment Pin",
                  subtitle: "",
                  modalChild: (
                    <div className="flex flex-col gap-3 max-w-[300px]">
                      <div className="flex  gap-3 text-sm text-gray-700 dark:text-gray-200">
                        <div className="">
                          <BsExclamationCircle size={18} />
                        </div>
                        <p className="w-[200px]">
                          Please keep the following unique PIN code confidential
                          until after the service has been performed. This PIN
                          code should only be shared with our assistant to
                          complete the order.
                        </p>
                      </div>
                      <div className="p-2 bg-white dark:bg-darkMode-900  max-w-[300px]">
                        <QRCodeSVG
                          height={300}
                          width={300}
                          value="https://reactjs.org/"
                        />
                      </div>
                      <div className="bg-gray-200 dark:bg-darkMode-900 rounded-md p-2 text-2xl font-bold text-gray-700 dark:text-gray-200 text-center">
                        <p> {event.pin}</p>
                      </div>
                    </div>
                  ),
                  action: () => {},
                });
              }}
            >
              Show Pin
            </Button>
          </div>
          <p className="font-medium text-sm">Order Summary :</p>
          <div className="flex flex-col gap-1">
            <p className="w-full flex justify-between">
              <span>Subtotal</span>
              <span>R {event.price.toFixed(2)}</span>
            </p>
            <p className="w-full flex justify-between">
              <span>Taxes</span>
              <span>R0</span>
            </p>
            <p className="w-full flex justify-between font-semibold">
              <span>Total</span>
              <span>R {event.price.toFixed(2)}</span>
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-end gap-2 flex-1 ">
        <Button
          onClick={() => {}}
          size={"default"}
          variant={"secondary"}
          icon={{ icon: <IoReload size={20} />, variant: "icon-label" }}
          className="w-full lg:w-[137px]"
        >
          Resechedule
        </Button>
        <Button
          onClick={() => setIsActive(!isActive)}
          size={"default"}
          variant={"primary"}
          className="w-full lg:w-[137px]"
        >
          {isActive ? "Close" : "View Details"}
        </Button>
      </div>
    </div>
  );
}
