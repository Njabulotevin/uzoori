import { IpublicUser } from "@/app/models/user";
import { testUsers } from "@/scripts/utils";
import {
  eachMinuteOfInterval,
  format,
  isSameHour,
  startOfToday,
} from "date-fns";
import React, { useEffect, useState } from "react";
import { useMerchantCalendar } from "./useBookings";
import useDatePicker from "./useDatePicker";

export default function useCalendar() {
  const { previousWeek, selectedDay, nextWeek, weekdays, setSelectedDay } =
    useDatePicker();
  const today = startOfToday();

  const startTime = today.setHours(8);
  const endTime = today.setHours(18);
  const times = eachMinuteOfInterval(
    { start: startTime, end: endTime },
    { step: 15 }
  );

  const testTime = today.setHours(11, 30);
  const isOclock = (time: Date) =>
    isSameHour(time, new Date(time).setMinutes(0, 0));

  const getCoordinates = (startTime: string, endTime: string) => {
    const convertedTime = times.map((time) => format(time, "HH:mm"));

    return {
      gridRowStart:
        convertedTime.indexOf(startTime) + 1 == 0
          ? 1
          : convertedTime.indexOf(startTime) + 1,
      gridRowEnd: convertedTime.indexOf(endTime) + 2,
    };
  };

  const colors = [
    "bg-violet-100 border-violet-600 dark:border-gray-600 dark:bg-gray-600",
    "bg-pink-100  border-pink-600 dark:border-gray-600  dark:bg-gray-600",
    "bg-cyan-100  border-cyan-600 dark:border-gray-600  dark:bg-gray-600",
    "bg-lime-100  border-lime-600 dark:border-gray-600  dark:bg-gray-600",
    "bg-sky-100  border-sky-600 dark:border-gray-600  dark:bg-gray-600",
  ];

  const getEstimatedTime = (time: number) => {
    const minutes = time % 60;
    if (time < 60) {
      return `${time % 15 === 0 ? 0 : Math.ceil(time / 15) * 15} minutes`;
    } else if (minutes === 0) {
      return `${time / 60} hrs`;
    } else {
      const minutes = time % 60;
      return `${time / 60} hrs ${
        minutes % 15 === 0 ? 0 : Math.ceil(minutes / 15) * 15
      } minutes`;
    }
  };

  return {
    previousWeek,
    selectedDay,
    nextWeek,
    weekdays,
    setSelectedDay,
    times,
    getCoordinates,
    colors,
    getEstimatedTime,
  };
}
