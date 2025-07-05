"use client";
import { useRouter } from "next/navigation";
import React from "react";

const FormNewShift = () => {
  const router = useRouter();
  function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.push("/");
  }
  return (
    <div>
      <h3 className="text-base-900 font-bold text-xl mb-2">New Shift</h3>
      <form className="flex flex-col bg-base-200 rounded-md p-4">
        <label
          htmlFor="title"
          className="text-base-900 flex items-center gap-3"
        >
          Title
          <input
            className="bg-base-50 rounded-md border-1 border-base-300"
            type="text"
          />
        </label>

        <hr className="my-4 text-base-300" />

        <label htmlFor="color" className=" flex items-center gap-3">
          Color
          <input className="rounded-full" type="color" />
        </label>

        <hr className="my-4 text-base-300" />

        <label
          className="text-base-900 flex items-center gap-2"
          htmlFor="hours"
        >
          Hours
          <input
            className="bg-base-50 rounded-md border-1 border-base-300 w-15"
            type="number"
          />
        </label>

        <div className="flex gap-5 self-center fixed bottom-10">
          <button
            onClick={handleClose}
            className="bg-base-300 rounded-md px-15 py-1"
          >
            Close
          </button>
          <button className="bg-blue-500 text-base-50 rounded-md px-15 py-1">
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormNewShift;
