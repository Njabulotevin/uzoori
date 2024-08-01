import { iEvent } from "@/app/models/events";
import { IpublicUser } from "@/app/models/user";
import DateSelector from "@/components/common/DateSelector";
import Button from "@/components/molecules/Button";
import UserName from "@/components/molecules/UserName";
import { testUsers, titleCap } from "@/scripts/utils";
import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import { format } from "date-fns";
import React from "react";
import {
  BsCalendar,
  BsCheck,
  BsChevronExpand,
  BsClock,
  BsDot,
} from "react-icons/bs";
import useModal from "../../PopUp/hooks/useModal";
import {
  calendarEvent,
  useMerchantCalendar,
  useMerchantCalendarEvents,
} from "../hooks/useBookings";
import useCalendar from "../hooks/useCalendar";
import { GoPrimitiveDot } from "react-icons/go";
import { useFormik } from "formik";
import { Code } from "@/components/molecules/Form";
import { useUpdateOrderStatusMutation } from "../bookingApiSlice";

export default function Calendar() {
  const { previousWeek, selectedDay, nextWeek, weekdays, setSelectedDay } =
    useCalendar();

  const { bookings, selectedPerson, assistants, setSelectedPerson } =
    useMerchantCalendarEvents(selectedDay);

  return (
    <div className="flex flex-col gap-3 lg:gap-5 max-w-[700px] mx-auto">
      <div className="box-small">
        <DateSelector
          previousWeek={previousWeek}
          selectedDay={selectedDay}
          nextWeek={nextWeek}
          weekdays={weekdays}
          setSelectedDay={setSelectedDay}
        />
      </div>
      <div className="box-small">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Assistants
        </h4>
        {assistants.length !== 0 && (
          <Listbox value={selectedPerson} onChange={setSelectedPerson}>
            <Listbox.Button className="border border-gray-200 dark:border-gray-600 rounded-md p-3 flex justify-between items-center">
              {typeof selectedPerson === "undefined" ? (
                <p className="text-gray-700 text-sm font-semibold dark:text-gray-100">
                  Select Assistant
                </p>
              ) : (
                <UserName
                  disableShowUser={true}
                  name={selectedPerson?.name}
                  userName={selectedPerson?.username}
                  imgSrc={selectedPerson?.displayImageUrl}
                  type={"general"}
                  isVerified={true}
                  size={"small"}
                />
              )}
              <BsChevronExpand
                size={18}
                className="text-gray-700 dark:text-gray-300"
              />
            </Listbox.Button>
            <Listbox.Options
              className={
                "flex flex-col gap-4 p-4 bg-white dark:bg-gray-600 rounded-md shadow-md"
              }
            >
              {assistants.map((person, i) => (
                <Listbox.Option
                  key={i}
                  value={person}
                  className="cursor-pointer"
                >
                  <UserName
                    disableShowUser={true}
                    name={person.name}
                    userName={person.username}
                    imgSrc={person.displayImageUrl}
                    type={"general"}
                    isVerified={true}
                    size={"small"}
                  />
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        )}
        <EventsCalendar bookings={bookings} selectedDay={selectedDay} />
      </div>
    </div>
  );
}

export function EventsCalendar({
  bookings,
  selectedDay,
}: {
  bookings: calendarEvent[];
  selectedDay: Date;
}) {
  const { times, getCoordinates, colors, getEstimatedTime } = useCalendar();
  const { openModal } = useModal();

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="flex flex-col gap-3 items-center justify-center">
          <h4 className="text-md font-semibold text-gray-700 dark:text-gray-100">
            No Events Found!
          </h4>
          <p className="text-gray-700 dark:text-gray-100 font-medium text-sm">
            We&apos;re sorry, but there are no events scheduled for the selected
            user on {format(selectedDay, "MMM dd")}. Please check back later for
            any updates or try selecting a different date or user.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="border p-2  dark:border-gray-600 rounded-md">
        <div className="grid grid-cols-1  gap-1 text-sm font-medium relative">
          <div
            style={{ gridTemplateRows: "repeat(41, minmax(25px, 25px))" }}
            className="absolute top-0 z-50 left-0 gap-1  w-full grid-cols-[55px_1fr] grid "
          >
            {bookings.map((booking, i) => {
              return (
                <div
                  key={i}
                  style={{
                    gridRowStart: getCoordinates(booking.start, booking.end)
                      .gridRowStart,
                    gridRowEnd: getCoordinates(booking.start, booking.end)
                      .gridRowEnd,
                  }}
                  onClick={() => {
                    openModal({
                      title: `Appointment with ${booking.client.name}`,
                      subtitle: titleCap(booking.details),
                      modalChild: (
                        <EventDetails
                          booking={booking}
                          selectedDay={selectedDay}
                        />
                      ),
                      action: () => {},
                    });
                  }}
                  className={` relative flex flex-wrap justify-between items-start border ${colors[i]}  col-start-2 col-end-3 rounded-[10px] p-5  gap-2 cursor-pointer`}
                >
                  <div
                    className={clsx(
                      " items-start gap-2",
                      booking.estimatedTime <= 30
                        ? "flex flex-wrap"
                        : "flex flex-wrap flex-col"
                    )}
                  >
                    {booking.estimatedTime >= 120 ? (
                      <div className="flex flex-wrap flex-col gap-3">
                        <UserName
                          name={booking.client.name}
                          userName={booking.client.username}
                          imgSrc={booking.client.displayImageUrl}
                          type={booking.client.accountType}
                          size={"small"}
                          isVerified={false}
                          id={booking.client.id}
                        />
                        <p className="text-gray-700 dark:text-gray-300 font-semibold text-xs flex">
                          <span className="hidden lg:flex">
                            {booking.details}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300 font-semibold text-xs flex">
                        <span>{booking.client.name}</span>
                        <BsDot />
                        <span className="hidden lg:flex">
                          {booking.details}
                        </span>
                      </p>
                    )}
                    <p
                      className={clsx(
                        "text-gray-500 dark:bg-darkMode-900  rounded dark:text-gray-300 font-medium flex gap-2 items-center",
                        booking.estimatedTime <= 30 ? "px-4" : "p-2"
                      )}
                    >
                      <BsClock />
                      <span>
                        {booking.start} - {booking.end}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-3 items-center text-gray-700 dark:text-gray-200">
                    <BsClock />
                    {getEstimatedTime(booking.estimatedTime)}
                  </div>
                </div>
              );
            })}
          </div>

          {times.map((time, i) => {
            return (
              <div key={i}>
                <div
                  className={` ${
                    format(time, "mm") === "00"
                      ? "border-b dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      : "text-gray-200 dark:text-gray-600"
                  } relative h-[25px] border-gray-200 `}
                >
                  <p className="text-right max-w-[50px]">
                    {" "}
                    {format(time, "HH:mm")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

// To show when click on a calendar event

function EventDetails({
  booking,
  selectedDay,
}: {
  booking: calendarEvent;
  selectedDay: Date;
}) {
  const { openModal, closeModal } = useModal();
  return (
    <div className="w-full lg:w-[600px] p-3">
      <div className="flex flex-col gap-4 items-start ">
        <UserName
          name={booking.client.name}
          userName={booking.client.username}
          imgSrc={booking.client.displayImageUrl}
          type={booking.client.accountType}
          size={"small"}
          isVerified={false}
          id={booking.client.id}
        />
        <div className="flex gap-2 text-gray-500  rounded dark:text-gray-300 font-medium  items-center text-sm">
          <BsCalendar size={18} className="" />

          <p>{format(selectedDay, "MMM dd, yyyy")}</p>
        </div>
        <p
          className={clsx(
            "text-gray-500  rounded dark:text-gray-300 font-medium flex gap-2 items-center text-sm"
          )}
        >
          <BsClock size={18} className="" />

          <span>
            {booking.start} - {booking.end}
          </span>
        </p>
        <div className="text-sm flex justify-between gap-2 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-400 font-semibold  rounded-full py-1 px-2">
          <GoPrimitiveDot
            size={20}
            className="text-orange-600 dark:text-orange-600"
          />
          <span> In-progress</span>
        </div>
        <div className="w-full">
          <Button
            size={"default"}
            variant={"primary"}
            icon={{
              icon: <BsCheck size={18} />,
              variant: "icon-label",
            }}
            className="w-full"
            onClick={() => {
              openModal({
                title: `Appointment with ${booking.client.name}`,
                subtitle: titleCap(booking.details),
                modalChild: (
                  <div className="">
                    <OrderPin
                      clientName={booking.client.name}
                      orderId={booking.id}
                    />
                  </div>
                ),
                action: () => {},
              });
            }}
          >
            Mark as complete
          </Button>
          <Button
            size={"default"}
            variant={"tertiary"}
            className="w-full text-gray-400"
            onClick={() => {
              closeModal();
            }}
          >
            Cancel appointment
          </Button>
        </div>
      </div>
    </div>
  );
}

function OrderPin({
  clientName,
  orderId,
}: {
  clientName: string;
  orderId: string;
}) {
  const [completeOrder] = useUpdateOrderStatusMutation();
  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: { value_1: "", value_2: "", value_3: "", value_4: "" },
    onSubmit: async (values) => {
      const { value_1, value_2, value_3, value_4 } = values;
      const pin = value_1.concat("", value_2, value_3, value_4);
      try {
        const { data, status } = await completeOrder({
          pin: parseInt(pin),
          id: orderId,
        }).unwrap();
        if (status === "SUCCESS") {
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });
  const { closeModal } = useModal();
  return (
    <div className="flex flex-col gap-4 items-center text-gray-700 dark:text-gray-100 w-full lg:w-[600px]">
      <div className="text-center mb-3">
        <h4 className="font-semibold text-md">Enter Customer Order Pin</h4>
        <p className="text-sm">
          The pin was sent to{" "}
          <span className="font-semibold">{clientName}</span>
        </p>
      </div>
      <form
        className="flex flex-col gap-4 items-center w-full"
        onSubmit={handleSubmit}
        autoComplete="false"
        autoCorrect="false"
      >
        <div className="col-span-4">
          <Code
            label={""}
            isError={false}
            value_1={values.value_1}
            value_2={values.value_2}
            value_3={values.value_3}
            value_4={values.value_4}
            name_1={"value_1"}
            name_2={"value_2"}
            name_3={"value_3"}
            name_4={"value_4"}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Button
            className="w-full"
            size={"default"}
            variant={"primary"}
            type="submit"
          >
            Submit
          </Button>
          <Button
            type="button"
            className="w-full dark:text-gray-200"
            size={"default"}
            variant={"tertiary"}
            onClick={() => closeModal()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
