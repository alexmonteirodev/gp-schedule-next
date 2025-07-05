"use client";
import DarkMode from "@/components/DarkMode";
import FormNewShift from "@/components/FormNewShift";
import React from "react";

const page = () => {
  return (
    <div className="grid m-5 *:mb-5">
      <h2 className="m-auto mt-5 text-base-900 font-bold text-2xl">Settings</h2>
      <DarkMode />
      <FormNewShift />
    </div>
  );
};

export default page;
