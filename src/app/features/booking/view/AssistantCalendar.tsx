import DateSelector from "@/components/common/DateSelector";
import React from "react";
import { calendarEvent, useAssistantsCalendar } from "../hooks/useBookings";
import useCalendar from "../hooks/useCalendar";
import useDatePicker from "../hooks/useDatePicker";
import { EventsCalendar } from "./Calendar";

export default function AssistantCalendar() {
  const { previousWeek, selectedDay, nextWeek, weekdays, setSelectedDay } =
    useCalendar();
  const { getUserEvents } = useAssistantsCalendar(selectedDay);
  return (
    <div className="">
      <div className="">
        <DateSelector
          previousWeek={previousWeek}
          selectedDay={selectedDay}
          nextWeek={nextWeek}
          weekdays={weekdays}
          setSelectedDay={setSelectedDay}
        />
        <EventsCalendar bookings={getUserEvents()} selectedDay={selectedDay} />
      </div>
    </div>
  );
}
