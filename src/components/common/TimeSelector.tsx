import { eachMinuteOfInterval, format, isEqual, startOfToday } from "date-fns";
import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export default function TimeSelector({
  currentChunk,
  setCurrentChunk,
  arrayOfChunks,
  selectedTime,
  setSelectedTime,
}: {
  currentChunk: number;
  setCurrentChunk: (i: number) => void;
  arrayOfChunks: Array<Date[]>;
  selectedTime: Date;
  setSelectedTime: (t: Date) => void;
}) {
  return (
    <div className="overflow-hidden">
      <div className="flex gap-4 justify-between items-center">
        {currentChunk !== 0 && (
          <button
            onClick={() => setCurrentChunk(currentChunk - 1)}
            className="shrink-0 w-[38px] flex items-center justify-center h-[38px] bg-violet-600 text-white p-2 rounded-[14px]"
          >
            <BsChevronLeft />
          </button>
        )}
        {currentChunk === 0 && <div className="w-[38px] h-[38px]"></div>}
        <div className="flex flex-wrap justify-center gap-6">
          {arrayOfChunks[currentChunk].map((time, i) => {
            return (
              <button
                onClick={() => setSelectedTime(time)}
                key={i}
                className={`rounded-full flex-1 w-[65px] ${
                  isEqual(selectedTime, time)
                    ? "bg-violet-600 text-gray-100"
                    : ""
                } flex items-center justify-center text-gray-400  border-2 border-gray-400 p-2 hover:border-violet-600`}
              >
                <h4 className="text-base font-medium  dark:text-gray-300">
                  {format(time, "HH:mm")}
                </h4>
              </button>
            );
          })}
        </div>
        {currentChunk === arrayOfChunks.length - 1 && (
          <div className="w-[38px] h-[38px]"></div>
        )}
        {currentChunk !== arrayOfChunks.length - 1 && (
          <button
            onClick={() => setCurrentChunk(currentChunk + 1)}
            className="shrink-0 w-[38px] flex items-center justify-center h-[38px] bg-violet-600 text-white p-2 rounded-[14px]"
          >
            <BsChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
