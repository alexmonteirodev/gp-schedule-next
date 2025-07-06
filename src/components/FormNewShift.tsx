"use client";
import { useRouter } from "next/navigation";
import React from "react";

const FormNewShift = () => {
  const [newShiftLabel, setNewShiftLabel] = React.useState("");
  const [newShiftColor, setNewShiftColor] = React.useState("");
  const [newShiftHourStart, setNewShiftHourStart] = React.useState(0);
  const [newShiftHourEnd, setNewShiftHourEnd] = React.useState(0);

  const [newTextColor, setTextNewColor] = React.useState(
    "var(--color-base-100)"
  );
  const [errorForm, setErrorForm] = React.useState(false);

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
    textColor: newTextColor,
    hours: newShiftHourEnd - newShiftHourStart,
  };

  function handleSubmitNewOption(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newShiftLabel.length && !newShiftColor.length)
      return setErrorForm(true);
    console.log(newDefaultOptions);
  }

  const router = useRouter();
  function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    alert("teste");
    router.push("/");
  }

  console.log(newShiftHourEnd - newShiftHourStart);

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
            className="bg-base-50 rounded-md border-1 border-base-300 w-22 px-2"
            type="text"
            maxLength={9}
            onChange={(e) => setNewShiftLabel(e.currentTarget.value)}
          />
          {errorForm ? (
            <p className="text-red-400 text-sm">write a title</p>
          ) : (
            ""
          )}
        </label>

        <hr className="my-4 text-base-300" />

        <label htmlFor="color" className=" flex items-center gap-3">
          Color
          <input
            className="rounded-full"
            type="color"
            onChange={(e) => setNewShiftColor(e.currentTarget.value)}
          />
          {errorForm ? (
            <p className="text-red-400 text-sm">choose a background color</p>
          ) : (
            ""
          )}
        </label>

        <div className="flex gap-5 mt-3 items-center">
          <p>Title</p>
          <div className="flex gap-2">
            <div
              onTouchStart={() => setTextNewColor("var(--color-base-100)")}
              className={`rounded-full bg-base-100 border-2 border-base-300 w-5 h-5 ${
                newTextColor === "var(--color-base-100)"
                  ? "border-blue-400"
                  : ""
              }`}
            ></div>
            <div
              onTouchStart={() => setTextNewColor("var(--color-base-900)")}
              className={`rounded-full bg-base-900 border-2 border-base-300 w-5 h-5 ${
                newTextColor === "var(--color-base-900)"
                  ? "border-blue-400"
                  : ""
              }`}
            ></div>
          </div>
        </div>

        <hr className="my-4 text-base-300" />

        <div className="space-y-3">
          <label
            className="text-base-900 flex items-center gap-2"
            htmlFor="hours"
          >
            Start
            <input
              className="bg-base-50 rounded-md border-1 border-base-300 w-22 px-2"
              type="time"
              onChange={(e) =>
                setNewShiftHourStart(
                  Number(timeToDecimal(e.currentTarget.value).toFixed(2))
                )
              }
            />
          </label>
          <label
            className="text-base-900 flex items-center gap-4"
            htmlFor="hours"
          >
            End
            <input
              className="bg-base-50 rounded-md border-1 border-base-300 w-22 px-2"
              type="time"
              onChange={(e) =>
                setNewShiftHourEnd(
                  Number(timeToDecimal(e.currentTarget.value).toFixed(2))
                )
              }
            />
          </label>
        </div>

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
