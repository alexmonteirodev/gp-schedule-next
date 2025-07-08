"use client";
import React from "react";
import { useCalendarContext } from "./Context";
import Image from "next/image";
import settings from "../../public/settings.svg";
import { useRouter } from "next/navigation";
const Header = () => {
  const [settingsOn, setSettingsOn] = React.useState(false);
  const { calendar, currentMonth, totals, hours } = useCalendarContext();
  const router = useRouter();

  if (!currentMonth) return null;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let workedDays = 0;
  hours?.[currentMonth - 1]?.forEach((obj) => {
    if (
      obj.period === "Morning" ||
      obj.period === "Afternoon" ||
      obj.period === "Night"
    ) {
      workedDays += 1;
    }
  });

  return (
    <div className="mt-5 mb-5">
      {/* <div className="flex">
        <h4 className="font-bold m-auto mb-5">SpinUp</h4>
        <button
          onTouchStart={() => {
            setSettingsOn(!settingsOn);
            setTimeout(() => {
              router.push("/settings");
            }, 300);
          }}
          className={`self-start rounded-full transition-transform duration-300 pointer-events-auto ${
            settingsOn ? "rotate-135" : "rotate-0"
          }`}
        >
          <Image src={settings} alt="x" className="h-5 w-5" priority />
        </button>
      </div> */}
      <div className="flex items-center justify-between">
        <div className="flex">
          <div className="pr-5 border-r-2 border-base-200">
            <p className="text-base-400 text-[0.8rem]">
              {calendar ? calendar.year : "Year"}
            </p>
            <h1 className="font-bold text-[1.675rem]">
              {monthNames[currentMonth - 1]}
            </h1>
          </div>
          <div className="pl-5">
            <div>
              <p className="text-base-400 text-[0.8rem]">Worked this month</p>
            </div>
            <div className="text-base-800 font-medium flex text-2xl space-x-2">
              <span className="">{workedDays}days</span>
              <span>|</span>
              <span className="">
                {totals ? `${totals[currentMonth - 1]}` : "-"}hrs
              </span>
            </div>
          </div>
        </div>
        <button
          onTouchStart={() => {
            setSettingsOn(!settingsOn);
            setTimeout(() => {
              router.push("/settings");
            }, 300);
          }}
          className={`self-start rounded-full transition-transform duration-300 pointer-events-auto ${
            settingsOn ? "rotate-135" : "rotate-0"
          }`}
        >
          <Image src={settings} alt="x" className="h-5 w-5" priority />
        </button>
      </div>
    </div>
  );
};

export default Header;
