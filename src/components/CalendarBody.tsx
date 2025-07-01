"use client";
import React from "react";
import { CalendarContext } from "./Context";

const CalendarBody = () => {
  const calendar = React.useContext(CalendarContext);
  console.log(calendar);

  return (
    <div>
      <div>
        {calendar?.months.map((month) => (
          <div key={month.month} className="flex items-center justify-center">
            <div className="grid grid-cols-7">
              {month.days.map((day, i) => (
                <div
                  key={i}
                  className="w-15 h-20 flex items-start justify-center border-t border-base-300"
                >
                  {day ? day.number : ""}
                  {/* <div>teste</div> */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarBody;
