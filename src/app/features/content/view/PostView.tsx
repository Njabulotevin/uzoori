import UserName from "@/components/molecules/UserName";
import Button from "@/components/molecules/Button";
import React from "react";
import {
  BsChatDotsFill,
  BsDot,
  BsHeartFill,
  BsTagFill,
  BsThreeDots,
  BsThreeDotsVertical,
} from "react-icons/bs";
import BookingForm from "../../booking/view/BookingForm";
import Comment from "@/components/common/Comment";

export default function PostView() {
  let content = `Introducing the hottest new style by #BestStyles! Get ready to turn
    heads with this bold and trendy look that's sure to make a statement.
    😍🔥 #FashionGoals #NewStyle #Trendsetter`;

  content = content.replace(/(#\w+)/g, '<span class="hashtag">$1</span>');
  return (
    <div className="flex flex-col lg:max-w-[600px] bg-white dark:bg-gray-700 rounded-lg mx-auto gap-4 p-3 lg:p-5">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="flex">
            <UserName
              name={"Victoria Smith"}
              userName={"victoria_sa"}
              imgSrc={"/user2.jpeg"}
              type={"general"}
              size="small"
              isVerified={true}
            />

            <p className="text-xs text-gray-400 font-medium flex ">
              <BsDot className="text-xs text-gray-400 font-medium" />
              <span>2 days ago</span>
            </p>
          </div>
          <BsThreeDotsVertical className="text-xs text-gray-400 font-medium" />
        </div>
        {/* -----content start-------------- */}
        <div className="flex flex-col gap-4">
          <img
            src="/braid2.jpg"
            className="rounded-[14px] object-cover w-full h-[300px] md:h-[500px]"
          />
          <div className="text-sm text-gray-700 dark:text-slate-300 font-semibold flex justify-between">
            <h4>Beachy Waves</h4>
            <h4 className="p-2 flex gap-2 items-center rounded-[4px] bg-violet-100 text-violet-600">
              <BsTagFill />
              <span>R350</span>
            </h4>
          </div>
          <p
            dangerouslySetInnerHTML={{ __html: content }}
            className="text-xs font-medium text-gray-500 dark:text-slate-200"
          ></p>
          <Button size={"default"} variant={"primary"}>
            Book Now
          </Button>
        </div>
        {/* ----content end--------- */}

        <div className="flex flex-col gap-6 py-5 border-b border-gray-100 dark:border-gray-600">
          <div className="flex gap-10 items-center">
            <div className="flex gap-1 items-center text-xs font-semibold text-gray-500">
              <BsHeartFill className="text-gray-300" size={20} />
              <p className="">3k</p>
              <p className="">Like</p>
            </div>
            <div className="flex gap-1 items-center text-xs font-semibold text-gray-500">
              <BsChatDotsFill className="text-gray-300" size={20} />
              <p className="">40</p>
              <p className="">Comment</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5"></div>
      <Button size={"default"} variant={"secondary"}>
        Show more
      </Button>
    </div>
  );
}
