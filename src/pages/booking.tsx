import Button from "@/components/molecules/Button";
import ReviewRating from "@/components/molecules/ReviewRating";
import Section from "@/components/molecules/Section";
import SubPageLayout from "@/components/molecules/SubPageLayout";
import React, { ReactNode, useState } from "react";
import { BsChevronDown, BsPlus } from "react-icons/bs";

export default function booking() {
  const dateClass = "flex flex-col gap-2 items-center min-w-[36px]";
  const timeClass = "flex flex-col gap-2 items-center min-w-[70px]";

  const dates = [
    <div key={`booking_${1}`} className={dateClass}>
      <span className="text-violet-600">Tue</span>
      <span>29</span>
    </div>,
    <div key={`booking_${2}`} className={dateClass}>
      <span className="text-violet-600">Wed</span>
      <span>30</span>
    </div>,
    <div key={`booking_${3}`} className={dateClass}>
      <span className="text-violet-600">Thu</span>
      <span>31</span>
    </div>,
    <div key={`booking_${3}`} className={dateClass}>
      <span className="text-violet-600">Fri</span>
      <span>1</span>
    </div>,
    <div key={`booking_${3}`} className={dateClass}>
      <span className="text-violet-600">Mon</span>
      <span>2</span>
    </div>,
  ];
  const times = [
    <div key={`booking_${4}`} className={timeClass}>
      <span className="text-violet-600">10:00</span>
    </div>,
    <div key={`booking_${5}`} className={timeClass}>
      <span className="text-violet-600">10:00</span>
    </div>,
    <div key={`booking_${6}`} className={timeClass}>
      <span className="text-violet-600">10:00</span>
    </div>,
  ];

  return (
    <SubPageLayout>
      <div className="flex flex-col  gap-6 pb-10">
        <h4 className="text-violet-600 font-semibold text-center">
          Book Appointment
        </h4>
        <div className="bg-white shadow-lg p-[20px] rounded">
          <Section number={1} title="Choose your Style">
            <div className="flex flex-col gap-4">
              <div className="text-p3 flex flex-col gap-2 ">
                <label>Category</label>
                <CustomDropDown/>
              </div>

              <div className="flex gap-2 text-violet-600 font-medium ">
                <Style />
                <Style />
              </div>
            </div>
          </Section>
        </div>
        <div className="bg-white shadow-lg p-[20px] rounded">
          <Section number={2} title="Select Date">
            <div className="flex flex-col gap-4">
              <p className="neutral-300 text-p3">
                Select the time and date you wish your appointment to be
                scheduled
              </p>
              <div className="p-[10px] flex flex-col gap-4">
                <div className="">
                  <Selector options={dates}></Selector>
                </div>
                <div className="">
                  <Selector options={times}></Selector>
                </div>
              </div>
            </div>
          </Section>
        </div>
        <div className="bg-white shadow-lg p-[20px] rounded">
          <Section number={3} title="Stylists">
            <div className="flex flex-col gap-4">
              <p className="neutral-300 text-p3">
                Stylists available for Booking in{" "}
                <span className="font-semibold">Best Styles</span> as per
                selected date and time
              </p>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex gap-2">
                  <input type="radio" name="stylist" />
                  <StylistUser
                    name="John Doe"
                    username="@username"
                    profile="/user.jpg"
                    isFollowed={false}
                  />
                </div>
                <div className="flex gap-2">
                  <input type="radio" name="stylist" />
                  <StylistUser
                    name="John Doe"
                    username="@username"
                    profile="/user.jpg"
                    isFollowed={false}
                  />
                </div>
                <div className="flex gap-2">
                  <input type="radio" name="stylist" />
                  <StylistUser
                    name="John Doe"
                    username="@username"
                    profile="/user.jpg"
                    isFollowed={false}
                  />
                </div>
              </div>
            </div>
          </Section>
        </div>
        <div className="">
          <Button className="py-[10px] px-[80px] text-p3 font-medium w-full" size={"default"} variant={"primary"}>
            Confirm Booking
          </Button>
        </div>
      </div>
    </SubPageLayout>
  );
}

function Style() {
  return (
    <div className="hover:border-2 hover:border-violet-600 max-w-[153px] flex flex-col gap-2 items-center rounded shadow p-[10px] border border-neutral-200">
      <h4 className="text-p3">Straight Up</h4>
      <div className="w-[100px] h-[100px]">
        <img
          className="w-[100px] h-[100px] object-cover rounded"
          src="/braid2.jpg"
        />
      </div>
      <h4 className="text-p3 flex justify-between w-full">
        <span>Price: </span>
        <span>R250</span>
      </h4>
    </div>
  );
}

function Selector({ options }: { options: ReactNode[] }) {
  return (
    <div className="flex gap-2 text-p4 font-medium">
      {options.map((item, i) => {
        return (
          <div key={i} className="hover:border-violet-600 border border-neutral-200 rounded p-[5px]">
            {item}
          </div>
        );
      })}
    </div>
  );
}

function StylistUser({
  name,
  username,
  profile,
  isFollowed,
}: {
  name: string;
  username: string;
  profile: string;
  isFollowed: boolean;
}) {
  return (
    <div className=" w-full">
      <div className="flex justify-between text-p3">
        <div className="flex gap-4">
          <div className="w-[40px] h-[40px] rounded-full">
            {profile ? (
              <img
                className="w-[40px] h-[40px] object-cover rounded-full"
                src={profile}
              />
            ) : (
              <div className="bg-primary-100 rounded-full font-semibold w-[40px] h-[40px] flex items-center justify-center text-p1">
                {/* <BsPersonFill /> */}
                {name[0]}
              </div>
            )}
          </div>
          <div className="">
            <h4 className="font-semibold">{name}</h4>
            <div className="">{username}</div>
          </div>
        </div>

        <div className="text-neutral-300">
          <ReviewRating rating={3.5} textOn={true} />
        </div>
      </div>
    </div>
  );
}

function CustomDropDown() {
    const [isActive, setIsActive] = useState(false);
  return (
    <div onClick={()=>{setIsActive(!isActive)}} className="flex justify-between relative items-center border border-neutral-100 rounded py-[5px] px-[10px]">
      <span>Braids</span>
      <BsChevronDown className="" />
      {isActive &&
        <div onBlur={()=>{setIsActive(false)}} className="absolute flex flex-col gap-2 bg-white p-6 rounded w-[318px] shadow left-0 top-[30px]">
          <div onClick={()=>{setIsActive(false)}} className="">Braids 1</div>
          <div onClick={()=>{setIsActive(false)}} className="">Braids 2</div>
          <div onClick={()=>{setIsActive(false)}} className="">Braids 3</div>
          <div onClick={()=>{setIsActive(false)}} className="">Braids 4</div>
        </div>
      }
    </div>
  );
}
