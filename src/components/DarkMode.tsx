import React from "react";
import { useCalendarContext } from "./Context";

const DarkMode = () => {
  const { dark, setDark } = useCalendarContext();

  return (
    <div>
      <label className="flex items-center gap-3 cursor-pointer">
        <h3 className="text-base-900 font-bold text-xl dark:text-base-100">
          Dark Mode
        </h3>
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={() => {
            const newDark = !dark;
            setDark(newDark);
            localStorage.setItem("darkMode", JSON.stringify(newDark));
          }}
        />
        <div
          className={`w-11 h-6 bg-base-300  rounded-full relative ${
            dark === true ? "bg-blue-600" : ""
          }`}
        >
          <div
            className={`absolute left-1 top-1 w-4 h-4 bg-base-50 rounded-full transition-transform ${
              dark === true ? "translate-x-5" : ""
            }`}
          />
        </div>
      </label>
    </div>
  );
};

export default DarkMode;
