import { Iproduct } from "@/app/models/product";
import { iPost } from "@/app/models/user";
import DateSelector from "@/components/common/DateSelector";
import TimeSelector from "@/components/common/TimeSelector";
import Button from "@/components/molecules/Button";
import { Checkbox } from "@/components/molecules/Form";
import UserName from "@/components/molecules/UserName";
import React, { useEffect } from "react";
import useBookingForm from "../hooks/useBookingForm";

export default function BookingForm(props: { product: Iproduct }) {
  const {
    previousWeek,
    selectedDay,
    nextWeek,
    weekdays,
    setSelectedDay,
    currentChunk,
    setCurrentChunk,
    arrayOfChunks,
    selectedTime,
    setSelectedTime,
    handleConfirmBooking,
    availableUsers,
    setSelectedAssistant,
    productUser,
    isPending,
  } = useBookingForm(props.product);

  return (
    <div className="flex flex-col gap-10 lg:w-[600px] ">
      <div className="flex flex-col gap-10">
        <h4 className="text-gray-700 dark:text-gray-300 font-semibold text-md">
          Select Appointment Date
        </h4>
        <DateSelector
          previousWeek={previousWeek}
          selectedDay={selectedDay}
          nextWeek={nextWeek}
          weekdays={weekdays}
          setSelectedDay={setSelectedDay}
        />
        <TimeSelector
          currentChunk={currentChunk}
          setCurrentChunk={setCurrentChunk}
          arrayOfChunks={arrayOfChunks}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>
      <div className="flex flex-col gap-10">
        <div className="">
          <h4 className="text-gray-700 dark:text-gray-300 font-semibold text-md">
            Select Assistant
          </h4>
          <p className="text-gray-700 dark:text-gray-200 font-medium text-sm">
            Please note assistants are available based on selected date and time
          </p>
        </div>
        <div className="flex flex-col gap-5">
          {availableUsers?.map((user) => {
            return (
              <div
                onClick={() => setSelectedAssistant(user.id)}
                key={user.id}
                className="flex justify-between items-center hover:bg-gray-900 cursor-pointer p-2 rounded-md"
              >
                <UserName
                  name={user.name}
                  userName={user.username}
                  imgSrc={user.displayImageUrl}
                  type={user.accountType}
                  isVerified={false}
                />
                <Checkbox
                  onChange={() => {
                    setSelectedAssistant(user.id);
                  }}
                  checked={productUser?.id === user.id}
                />
              </div>
            );
          })}
        </div>
      </div>
      {productUser && (
        <Button
          onClick={() => handleConfirmBooking(props.product.id)}
          size={"default"}
          variant={"primary"}
          disabled={productUser ? false : true}
          isPending={isPending}
        >
          Confirm Booking
        </Button>
      )}
    </div>
  );
}
