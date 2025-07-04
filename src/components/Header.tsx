"use client";
import React from "react";
import { useCalendarContext } from "./Context";
const Header = () => {
  const { calendar, currentMonth } = useCalendarContext();

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
          Total: <span className="italic">120 hrs</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
