"use client";
import React from "react";
import { useCalendarContext } from "./Context";
import HoursCount from "./HoursCount";
const Header = () => {
  const { calendar, currentMonth, hours, totals } = useCalendarContext();
  console.log("hours", hours);
  console.log("totals", totals);

  if (!currentMonth) return;

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

  return (
    <div className="mt-10 mb-5">
      <p className="text-base-400 text-[0.8rem] font-bold">
        {calendar ? calendar.year : "Year"}
      </p>
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="font-bold text-3xl">{monthNames[currentMonth - 1]}</h1>
        </div>
        <div className="text-base-400 font-medium">
          Total:{" "}
          <span className="italic">
            {/* {hours[currentMonth] > 0 ? hours[currentMonth] : "0"} hrs */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
