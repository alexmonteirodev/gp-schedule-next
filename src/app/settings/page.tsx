"use client";
import React from "react";
import DarkMode from "@/components/DarkMode";
import { useRouter } from "next/navigation";

const Settings = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center bete m-5 gap-3">
      <h2 className="m-auto text-base-900 font-bold text-2xl">Settings</h2>
      <DarkMode />
      <button
        className="bg-blue-500 text-base-50 rounded-md flex-1 py-1 active:bg-blue-600"
        type="submit"
        onTouchStart={() => router.push("/")}
      >
        Done
      </button>
    </div>
  );
};

export default Settings;
