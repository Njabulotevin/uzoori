import { startOfToday, eachMinuteOfInterval } from "date-fns";
import React, { useState } from "react";

export default function useTimePicker() {
  const today = startOfToday();

  const startTime = today.setHours(8);
  const endTime = today.setHours(18);

  const times = eachMinuteOfInterval(
    { start: startTime, end: endTime },
    { step: 15 }
  );

  const [selectedTime, setSelectedTime] = useState(today);
  function chunkArray(arr: Date[], size: number) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      const chunk = arr.slice(i, i + size);
      chunks.push(chunk);
    }

    return chunks;
  }

  const arrayOfChunks = chunkArray(times, 5);

  const [currentChunk, setCurrentChunk] = useState(0);

  return {
    currentChunk,
    setCurrentChunk,
    arrayOfChunks,
    selectedTime,
    setSelectedTime,
  };
}
