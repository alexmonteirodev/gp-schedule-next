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
          className={`rounded-full bg-base-200 p-2 transition-transform duration-300 pointer-events-auto active:bg-base-300 ${
            rotated ? "rotate-135" : "rotate-0"
          }`}
        >
          <Image src={addSvg} alt="x" className="w-5 h-5" />
        </button>
      </div>
      <div
        className="bg-base-100 rounded-md transition-transform duration-300 py-3 px-2"
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
