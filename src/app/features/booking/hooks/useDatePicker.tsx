import {
  add,
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfToday,
  startOfWeek,
  sub,
} from "date-fns";
import React, { useState } from "react";

export type weekdaysType = { week: string; day: string; full: Date };

export default function useDatePicker() {
  const today = startOfToday();
  const days = eachDayOfInterval({
    start: startOfWeek(today),
    end: endOfWeek(today),
  });

  const parseWeek = (week: Date[]) => {
    return week.map((day) => {
      return { week: format(day, "eee"), day: format(day, "d"), full: day };
    });
  };

  const [selectedDay, setSelectedDay] = useState<Date>(today);
  const [weekStart, setWeekStart] = useState(startOfWeek(today));
  const [weekdays, setWeekdays] = useState(parseWeek(days));

  const nextWeek = () => {
    let firstDayNextWeek = add(weekStart, { weeks: 1 });
    const nextWeek = eachDayOfInterval({
      start: firstDayNextWeek,
      end: endOfWeek(firstDayNextWeek),
    });
    setWeekdays(parseWeek(nextWeek));
    setWeekStart(firstDayNextWeek);
    setSelectedDay(firstDayNextWeek);
  };

  const previousWeek = () => {
    let firstDayPrevWeek = sub(weekStart, { weeks: 1 });
    const nextWeek = eachDayOfInterval({
      start: firstDayPrevWeek,
      end: endOfWeek(firstDayPrevWeek),
    });
    setWeekdays(parseWeek(nextWeek));
    setWeekStart(firstDayPrevWeek);
    setSelectedDay(firstDayPrevWeek);
  };

  return { previousWeek, selectedDay, nextWeek, weekdays, setSelectedDay };
}
