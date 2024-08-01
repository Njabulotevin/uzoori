import { iEvent, Order, OrderProduct } from "@/app/models/events";
import { IpublicUser } from "@/app/models/user";
import { tab } from "@/components/common/Tabs";
import { convertToUnix, getAuth, setIncryptedData } from "@/scripts/utils";
import { secondsToHours } from "date-fns";
import React, { useEffect, useState } from "react";
import { useGetAllAssistantLinkedToMerchantQuery } from "../../merchant/merchantApiSlice";
import {
  useGetAllMerchantOrderQuery,
  useGetAllOrderQuery,
  useGetEventsForBuyersQuery,
  useGetEventsForAssistantBetweenTwoDatesAsMerchantQuery,
  useGetEventsForAssistantBetweenTwoDatesAsAssistantQuery,
} from "../bookingApiSlice";

export type calendarEvent = {
  id: string;
  start: string;
  end: string;
  details: string;
  client: IpublicUser;
  estimatedTime: number;
};

export default function useBookings() {
  const Tabs: tab[] =
    getAuth()?.accountType === "merchant"
      ? [
          { label: "Bookings", icon: "", id: "bookings" },
          { label: "Orders", icon: "", id: "orders" },
          { label: "My Orders", icon: "", id: "my_orders" },
        ]
      : getAuth()?.accountType === "assistant"
      ? [
          { label: "Bookings", icon: "", id: "bookings" },
          { label: "My Bookings", icon: "", id: "my_bookings" },
          { label: "My Orders", icon: "", id: "my_orders" },
        ]
      : [
          { label: "My Bookings", icon: "", id: "my_bookings" },
          { label: "My Orders", icon: "", id: "my_orders" },
        ];
  const [activeTab, setActiveTab] = useState<tab>(Tabs[0]);

  return { Tabs, setActiveTab, activeTab };
}

// **********************************************************************************************/
// Get assistanted services hook
// **********************************************************************************************/

export function useGeneralAsOrders() {
  const { loadMore, getOrders } = useGetOrders("AS");
  return { getOrders, loadMore };
}
// **********************************************************************************************/
// Get unassistanted goods hook
// **********************************************************************************************/

export function useGeneralUgOrders() {
  const { loadMore, getOrders } = useGetOrders("UG");
  return { getOrders, loadMore };
}

// **********************************************************************************************/
// General hook to get goods base\d on type
// **********************************************************************************************/

export function useGetOrders(type: "AS" | "UG") {
  const [offset, setOffset] = useState(0);
  const [orderData, setOrderData] = useState<Order[]>([]);
  const { data: orders, isSuccess: isOrdersSuccess } = useGetAllOrderQuery({
    limit: 20,
    offset: offset,
    orderType: type,
  });

  useEffect(() => {
    if (orders) {
      setOrderData(
        orders.data.filter((order: Order) => order.orderType === type)
      );
    }
  }, [orders, isOrdersSuccess]);

  const getOrders = (): Order[] => {
    return orderData;
  };

  const loadMore = () => {
    try {
      const last = orderData[orderData.length - 1].createdAt;
      setOffset(last);
    } catch (err) {
      console.log(err);
    }
  };
  return { loadMore, orderData, getOrders };
}

// **********************************************************************************************/
// Merchants orders hook
// **********************************************************************************************/

export function useMerchantUgOrders() {
  const [offset, setOffset] = useState(0);
  const [orderData, setOrderData] = useState<Order[]>([]);
  const { data, isSuccess } = useGetAllMerchantOrderQuery({
    limit: 20,
    offset: offset,
    orderType: "UG",
  });

  useEffect(() => {
    if (data) {
      setOrderData(data.data);
    }
  }, [data, isSuccess]);

  const getOrderData = (): Order[] => {
    return orderData;
  };

  return { getOrderData };
}

// **********************************************************************************************/
// Merchants Calendar hook
// **********************************************************************************************/

export function useMerchantCalendar() {
  const [orders, setOrders] = useState();
  // const {data, isSuccess, isLoading} = useGet
  const [assistants, setAssistants] = useState<
    Array<{
      id: string;
      user: IpublicUser;
    }>
  >([]);
  const [events, setEvents] = useState<iEvent[]>([]);
  const [date, setDate] = useState<number>(convertToUnix(new Date()));
  const [selectedUser, setSelectedUser] = useState<string>("");
  const { data: memberAssistants, isSuccess: membersAssistantsSuccess } =
    useGetAllAssistantLinkedToMerchantQuery({ id: getAuth()?.id as string });

  const { data, isLoading, isSuccess } =
    useGetEventsForAssistantBetweenTwoDatesAsMerchantQuery({
      fromDate: date,
      toDate: date + 24 * 60 * 60,
      id: selectedUser,
    });

  useEffect(() => {
    if (memberAssistants) {
      setAssistants(memberAssistants?.data);
    }
  }, [memberAssistants, membersAssistantsSuccess]);

  useEffect(() => {
    if (data) {
      setEvents(data?.data);
    }
  }, [data, isSuccess]);

  const getAssistants = () => {
    const mappedToCorrectType = assistants.map((assistant) => {
      return assistant.user;
    });
    return mappedToCorrectType;
  };

  const setOptions = (date: Date, userId: string) => {
    try {
      const convertedDate = convertToUnix(date);
      setDate(convertedDate);
      setSelectedUser(userId);
    } catch (err) {
      console.log(err);
    }
  };

  const getAssistantEvents = (): calendarEvent[] => {
    return transFormEventsToBookings(events);
  };

  return { getAssistants, getAssistantEvents, setOptions };
}

// **********************************************************************************************/
// Calendar Events Utils
// **********************************************************************************************/

const transFormEventsToBookings = (events: iEvent[]) => {
  let transform: calendarEvent[] = [];
  try {
    transform = [
      ...events.map((event) => {
        return {
          id: event.id,
          start: getTime(event.timeStart),
          end: getTime(event.timeEnd),
          details: event.product.name,
          client: event.user,
          estimatedTime: (event.timeEnd - event.timeStart) / 60,
        };
      }),
    ];

    return transform;
  } catch (err) {
    console.log(err);
    return transform;
  }
};

const getTime = (time: number) => {
  const minutes = (time / 3600 - secondsToHours(time)) * 60;
  const checkedMinutes = minutes % 15 === 0 ? 0 : Math.ceil(minutes / 15) * 15;

  const hours = secondsToHours(time).toString();
  return `${hours.length < 2 ? "0" + hours : hours}:${
    checkedMinutes === 0 ? "00" : checkedMinutes.toFixed()
  }`;
};

// **********************************************************************************************/
// Merchants Calendar Events hook
// **********************************************************************************************/

export function useMerchantCalendarEvents(selectedDay: Date) {
  const { getAssistants, getAssistantEvents, setOptions } =
    useMerchantCalendar();
  const assistants = getAssistants();
  const [selectedPerson, setSelectedPerson] = useState<IpublicUser>(
    assistants[0]
  );

  const bookings = [...getAssistantEvents()];

  useEffect(() => {
    setOptions(selectedDay, selectedPerson?.id);
  }, [selectedDay, selectedPerson]);

  return { bookings, selectedPerson, assistants, setSelectedPerson };
}

// **********************************************************************************************/
// Assistants Calendar hook
// **********************************************************************************************/

export function useAssistantsCalendar(selectedDay: Date) {
  const [events, setEvents] = useState<iEvent[]>([]);
  const { data, isLoading, isSuccess } =
    useGetEventsForAssistantBetweenTwoDatesAsAssistantQuery({
      fromDate: convertToUnix(selectedDay),
      toDate: convertToUnix(selectedDay) + 24 * 60 * 60,
    });

  useEffect(() => {
    if (data) {
      setEvents(data?.data);
    }
  }, [data, isSuccess]);

  const getUserEvents = () => {
    return transFormEventsToBookings(events);
  };

  return { getUserEvents };
}
