"use client";
import React from "react";
import Options from "./Options";
import addSvg from "../../public/add.svg";
import Image from "next/image";
import { useCalendarContext } from "./Context";

const UserOptions = () => {
  const { rotated, setRotated } = useCalendarContext();

  return (
    <div
      className={`font-bold fixed bottom-0 left-0 w-full px-4 py-2.5 pointer-events-none`}
    >
      <div className="flex justify-end mb-2">
        <button
          onTouchStart={() => setRotated(!rotated)}
          className={`rounded-full bg-base-950 p-4 transition-transform duration-300 pointer-events-auto active:bg-base-900 ${
            rotated ? "rotate-135" : "rotate-0"
          }`}
        >
          <Image src={addSvg} alt="x" className="w-4 h-4" priority />
        </button>
      </div>
      <div
        className="bg-base-50 rounded-md transition-transform duration-300 p-2 border border-base-200"
        style={{
          transform: rotated === false ? "translateY(300%)" : "translateY(0)",
        }}
      >
        <Options />
      </div>
    </div>
  );
};

export default UserOptions;
