import { Iproduct } from "@/app/models/product";
import {
  getAssistantsResponse,
  iPost,
  IpublicUser,
  Iuser,
} from "@/app/models/user";
import { convertToUnix } from "@/scripts/utils";
import {
  format,
  getHours,
  getMinutes,
  getSeconds,
  getUnixTime,
} from "date-fns";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import useBottomToast from "../../PopUp/hooks/useBottomToast";
import useModal from "../../PopUp/hooks/useModal";
import useToast from "../../PopUp/hooks/useToast";
import {
  useAsOrderMutation,
  useGetOrderProductUsersQuery,
} from "../bookingApiSlice";
import useDatePicker from "./useDatePicker";
import useTimePicker from "./useTimePicker";

export default function useBookingForm(product: Iproduct) {
  const { previousWeek, selectedDay, nextWeek, weekdays, setSelectedDay } =
    useDatePicker();
  const { toast, setToast, closeToast, openToast } = useToast();
  const { closeModal } = useModal();
  const { openBottomToast } = useBottomToast();
  const {
    currentChunk,
    setCurrentChunk,
    arrayOfChunks,
    selectedTime,
    setSelectedTime,
  } = useTimePicker();
  const [bookingDetails, setBookingDetails] = useState<{
    date: Date;
    time: Date;
  }>({
    date: selectedDay,
    time: selectedTime,
  });

  const convertToSeconds = (time: Date): number => {
    return getHours(time) * 60 * 60 + getMinutes(time) * 60;
  };

  const Router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const { data, isLoading, isSuccess } = useGetOrderProductUsersQuery({
    date: convertToUnix(selectedDay),
    productId: product?.id,
    timeStart: convertToSeconds(selectedTime),
  });
  const [availableUsers, setAvailableUsers] = useState<IpublicUser[]>([]);
  const [productUser, setProductUser] = useState<IpublicUser | null>(
    availableUsers[0] ?? null
  );

  const transformData = (data: getAssistantsResponse) => {
    return data.data.map((user) => {
      return { ...user.user };
    });
  };

  useEffect(() => {
    setBookingDetails({ ...bookingDetails, date: selectedDay });
    if (data) {
      console.log(transformData(data));
      setAvailableUsers(transformData(data));
    }
  }, [selectedDay]);

  useEffect(() => {
    setBookingDetails({ ...bookingDetails, time: selectedTime });
    if (data) {
      console.log(transformData(data));
      setAvailableUsers(transformData(data));
    }
  }, [selectedTime]);

  const [makeBooking] = useAsOrderMutation();

  const handleConfirmBooking = async (productId: string) => {
    try {
      setIsPending(true);
      const time = convertToSeconds(bookingDetails.time);
      const date = convertToUnix(bookingDetails.date);
      // const date = format(bookingDetails.date, "yyyy-MM-dd");
      const payload = {
        timeStart: time,
        date: date,
        assistantId: productUser?.id,
        productId: productId,
      };
      const { data, status } = await makeBooking(payload).unwrap();
      if (status === "SUCCESS") {
        console.log(data);
        setIsPending(false);
        closeModal();
        openBottomToast("Booking Successful");
        // Router.push(data.URL);
        window.location.assign(data.URL);
      }
    } catch (err) {
      setIsPending(false);
      openBottomToast("Oop! something went wrong!");
      console.log(err);
    }
  };

  const setSelectedAssistant = (userId: string) => {
    try {
      const user = availableUsers.find((user) => user.id === userId);
      if (user) {
        setProductUser(user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    previousWeek,
    selectedDay,
    nextWeek,
    weekdays,
    setSelectedDay,
    currentChunk,
    setCurrentChunk,
    arrayOfChunks,
    bookingDetails,
    setBookingDetails,
    selectedTime,
    setSelectedTime,
    handleConfirmBooking,
    availableUsers,
    setSelectedAssistant,
    productUser,
    isPending,
  };
}
