"use client";
import FormNewShift from "@/components/FormNewShift";
import React from "react";

const page = () => {
  return (
    <div className="grid m-5">
      <h2 className="m-auto mt-5 text-base-900 font-bold text-2xl">Settings</h2>

      <label className="relative inline-flex items-center cursor-pointer">
        <h3>Dark Mode</h3>
        <input type="checkbox" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-all" />
      </label>

      <FormNewShift />
    </div>
  );
};

export default page;
