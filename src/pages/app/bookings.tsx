import useBookings, {
  useGeneralAsOrders,
  useGeneralUgOrders,
} from "@/app/features/booking/hooks/useBookings";
import AssistantCalendar from "@/app/features/booking/view/AssistantCalendar";
import OrderHistory from "@/app/features/booking/view/OrderHistory";
import Orders from "@/app/features/booking/view/Orders";
import useNavigationBar from "@/app/features/layout/hooks/useNavigationBar";
import DateSelector from "@/components/common/DateSelector";
import TabCard, { tab } from "@/components/common/Tabs";
import React, { useEffect } from "react";

export default function Bookings() {
  const { setActive } = useNavigationBar();
  const { getOrders, loadMore } = useGeneralAsOrders();
  const { getOrders: getUgOrders, loadMore: loadMoreUg } = useGeneralUgOrders();

  const { Tabs, setActiveTab, activeTab } = useBookings();

  console.log(getUgOrders());

  useEffect(() => {
    setActive({ label: "booking", data: "" });
  }, []);

  return (
    <div>
      <div className="box-small p-4 max-w-[700px] mx-auto">
        <h4 className="text-base lg:text-lg dark:text-gray-100 text-gray-700 font-semibold">
          Order History
        </h4>
        <TabCard
          tabsList={Tabs}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
        {activeTab.label === "Bookings" ? (
          <div className="">
            <AssistantCalendar />
          </div>
        ) : activeTab.label === "My Bookings" ? (
          <OrderHistory orders={getOrders()} handleLoadMore={loadMore} />
        ) : (
          <Orders
            renderType="general"
            orders={getUgOrders()}
            handleLoadMore={loadMoreUg}
          />
        )}
      </div>
    </div>
  );
}
