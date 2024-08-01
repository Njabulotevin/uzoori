import useNotifications from "@/app/features/notifications/hooks/useNotifications";
import { Notification } from "@/app/features/notifications/views/Notifications";
import TabCard, { tab } from "@/components/common/Tabs";
import Button from "@/components/molecules/Button";
import React, { useState } from "react";
import { Inotification } from "@/app/models/notifications";
import { BsBellSlashFill } from "react-icons/bs";
export default function Notifications() {
  const { notifications, allNotifications, count } = useNotifications();
  const [active, setActive] = useState<tab>({
    label: `Unread (${count})`,
    icon: "",
    id: "unread",
  });

  return (
    <div className="box-small rounded-md max-w-[600px] mx-auto gap-0">
      <div className="flex justify-between items-center">
        <h4 className="text-gray-700 dark:text-gray-100">Notifications</h4>
        <Button
          className="text-violet-400"
          size={"default"}
          variant={"tertiary"}
        >
          Mark All As Read
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <TabCard
          tabsList={[
            { label: `Unread (${count})`, icon: "", id: "unread" },
            { label: "All", icon: "", id: "all" },
          ]}
          setActiveTab={setActive}
          activeTab={active}
        />

        {active.id === "unread" ? (
          <RenderNotifications list={notifications} />
        ) : (
          <RenderNotifications list={allNotifications} />
        )}
      </div>
    </div>
  );
}

function RenderNotifications({ list }: { list: Inotification[] }) {
  if (list.length === 0) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="w-[180px] h-[180px]">
          <img src="/noMessages.svg" alt="no-messages" />
        </div>
        <div className="text-gray-700 dark:text-gray-100 font-bold text-base">
          <h4>You don&apos;t have any notifications</h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-2 h-[65vh] overflow-y-auto">
        {list.map((notification, i) => {
          return <Notification key={i} notification={notification} />;
        })}
      </div>
    );
  }
}
