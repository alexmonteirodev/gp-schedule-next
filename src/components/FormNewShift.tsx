"use client";
import { useRouter } from "next/navigation";
import React from "react";

const FormNewShift = () => {
  const [newShiftLabel, setNewShiftLabel] = React.useState("");
  const [newShiftColor, setNewShiftColor] = React.useState("");
  const [newShiftHour, setNewShiftHour] = React.useState(0);

  function timeToDecimal(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  }

  const newDefaultOptions = {
    id: newShiftLabel.toLocaleLowerCase(),
    label:
      newShiftLabel.charAt(0).toUpperCase() +
      newShiftLabel.slice(1).toLowerCase(),
    color: newShiftColor,
    textColor: "var(--color-base-900)",
    hours: newShiftHour,
  };

  function handleSubmitNewOption(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newShiftLabel.length && newShiftColor.length)
      console.log(newDefaultOptions);
  }

  const router = useRouter();
  function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.push("/");
  }

  return (
    <div>
      <h3 className="text-base-900 font-bold text-xl mb-2">New Shift</h3>
      <form
        className="flex flex-col bg-base-200 rounded-md p-4"
        onSubmit={handleSubmitNewOption}
      >
        <label
          htmlFor="title"
          className="text-base-900 flex items-center gap-3"
        >
          Title
          <input
            className="bg-base-50 rounded-md border-1 border-base-300 w-25"
            type="text"
            maxLength={9}
            onChange={(e) => setNewShiftLabel(e.currentTarget.value)}
          />
        </label>

        <hr className="my-4 text-base-300" />

        <label htmlFor="color" className=" flex items-center gap-3">
          Color
          <input
            className="rounded-full"
            type="color"
            onChange={(e) => setNewShiftColor(e.currentTarget.value)}
          />
        </label>

        <hr className="my-4 text-base-300" />

        <label
          className="text-base-900 flex items-center gap-2"
          htmlFor="hours"
        >
          Hours
          <input
            className="bg-base-50 rounded-md border-1 border-base-300 w-25 px-2"
            type="time"
            onChange={(e) =>
              setNewShiftHour(
                Number(timeToDecimal(e.currentTarget.value).toFixed(2))
              )
            }
          />
        </label>

        <div className="flex gap-5 self-center fixed bottom-10">
          <button
            onClick={handleClose}
            className="bg-base-200 rounded-md px-15 py-1 active:bg-base-300"
          >
            Close
          </button>
          <button
            className="bg-blue-500 text-base-50 rounded-md px-15 py-1 active:bg-blue-600"
            type="submit"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormNewShift;
