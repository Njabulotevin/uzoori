import { useGetAllOrderQuery } from "@/app/features/booking/bookingApiSlice";
import useBookings, {
  useMerchantUgOrders,
} from "@/app/features/booking/hooks/useBookings";
import Calendar from "@/app/features/booking/view/Calendar";
import Orders from "@/app/features/booking/view/Orders";
import TabCard, { tab } from "@/components/common/Tabs";
// import {
//   useAcceptInviteMutation,
//   useInviteAssistantMutation,
// } from "@/app/features/merchant/merchantApiSlice";
import React from "react";

export default function Bookings() {
  const { Tabs, setActiveTab, activeTab } = useBookings();
  const { getOrderData } = useMerchantUgOrders();

  return (
    <div className="p-3 flex flex-col gap-5 lg:w-[700px] mx-auto">
      <div className="box-small py-0">
        <div
          style={{ width: "fit-content" }}
          className="flex gap-4 mx-auto justify-center   rounded-md p-2"
        >
          <TabCard
            tabsList={Tabs}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
      </div>
      {activeTab.label === "Bookings" ? (
        <div className="w-full">
          <Calendar />
        </div>
      ) : activeTab.label === "Orders" ? (
        <div className="w-full box-small">
          {" "}
          <Orders
            renderType="merchant"
            orders={getOrderData()}
            handleLoadMore={() => {}}
          />
        </div>
      ) : (
        <div className="w-full">My Orders</div>
      )}
    </div>
  );
}
