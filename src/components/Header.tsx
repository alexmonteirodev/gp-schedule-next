"use client";
import React from "react";

const Header = () => {
  return (
    <>
      <p className="text-base-400 text-[0.8rem] font-bold">2025</p>
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="font-bold text-3xl">July</h1>
        </div>
        <div className="text-base-400 font-medium">
          Total: <span className="italic">120 hrs</span>
        </div>
      </div>
    </>
  );
};

export default Header;
