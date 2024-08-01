import { Inotification } from "@/app/models/notifications";
import { convertToUnix } from "@/scripts/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  useChangeNotificationStatusMutation,
  useGetNotificationForUserQuery,
} from "../notificationApiSlice";

export default function useNotifications() {
  const [notifications, setNotifications] = useState<Inotification[]>([]);
  const [allNotifications, setAllNotifications] = useState<Inotification[]>([]);
  const [count, setCount] = useState<number>(0);
  const {
    data: notificationsList,
    isLoading: isLoadingNotificationsList,
    isSuccess: isSuccessNotificationList,
  } = useGetNotificationForUserQuery(
    { offset: convertToUnix(new Date()) },
    { refetchOnMountOrArgChange: true }
  );

  const [changeStatus] = useChangeNotificationStatusMutation();

  useEffect(() => {
    if (notificationsList) {
      setNotifications(filterUnReadNotifications(notificationsList.data));
      setAllNotifications(notificationsList.data);
      setCount(filterUnReadNotifications(notificationsList.data).length);
    }
  }, [notificationsList, isLoadingNotificationsList]);

  const markAsRead = async (id: string) => {
    try {
      const { data, status } = await changeStatus({ id: id }).unwrap();
      if (status === "SUCCESS") {
        updateState(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateState = (id: string) => {
    try {
      const updated = notifications.map((notification) => {
        if (notification.id === id) {
          return { ...notification, seen: true };
        } else {
          return notification;
        }
      });
      setNotifications([]);
    } catch (err) {
      console.log(err);
    }
  };

  const filterUnReadNotifications = (
    list: Inotification[]
  ): Inotification[] => {
    return list.filter((notification) => notification.seen === false);
  };

  return { notifications, markAsRead, count, allNotifications };
}
