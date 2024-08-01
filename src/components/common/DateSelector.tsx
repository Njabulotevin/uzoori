import useDatePicker, { weekdaysType } from "@/app/features/booking/hooks/useDatePicker";
import {
  add,
  eachDayOfInterval,
  endOfDay,
  endOfWeek,
  format,
  isEqual,
  isToday,
  parse,
  startOfHour,
  startOfToday,
  startOfWeek,
  sub,
  eachMinuteOfInterval,
  addMinutes,
} from "date-fns";
import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export default function DateSelector({
  previousWeek,
  selectedDay,
  nextWeek,
  weekdays,
  setSelectedDay,
}: {
  previousWeek : ()=>void;
  selectedDay: Date;
  nextWeek: ()=>void;
  weekdays: weekdaysType[];
  setSelectedDay : (date: Date)=>void;
}) {
  const {} = useDatePicker();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <button
          onClick={previousWeek}
          className="w-[38px] flex items-center justify-center h-[38px] bg-violet-600 text-white p-2 rounded-[14px]"
        >
          <BsChevronLeft />
        </button>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {format(selectedDay, "MMMM yyyy")}
        </h4>
        <button
          onClick={nextWeek}
          className="w-[38px] flex items-center justify-center h-[38px] bg-violet-600 text-white p-2 rounded-[14px]"
        >
          <BsChevronRight />
        </button>
      </div>
      <div className="flex justify-between font-semibold text-sm text-gray-700 dark:text-gray-300">
        {weekdays.map((item, i) => {
          return (
            <button
              key={i}
              className="flex flex-col items-center gap-4 cursor-pointer"
              onClick={() => setSelectedDay(item.full)}
            >
              <p>{item.week}</p>
              <p
                className={`hover:bg-violet-600 p-4 ${
                  isEqual(item.full, selectedDay)
                    ? "bg-violet-600 text-gray-100"
                    : ""
                }  ${
                  isToday(item.full) ? "border border-violet-600" : ""
                } rounded-full hover:text-gray-100 dark:hover:text-gray-300`}
              >
                {item.day}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
