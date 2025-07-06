"use client";
import React from "react";

type ShiftProps = {
  newShiftLabel: string;
  setNewShiftLabel: React.Dispatch<React.SetStateAction<string>>;
  newShiftColor: string;
  setNewShiftColor: React.Dispatch<React.SetStateAction<string>>;
  newShiftHourStart: number;
  setNewShiftHourStart: React.Dispatch<React.SetStateAction<number>>;
  newShiftHourEnd: number;
  setNewShiftHourEnd: React.Dispatch<React.SetStateAction<number>>;
  newTextColor: string;
  setTextNewColor: React.Dispatch<React.SetStateAction<string>>;
  errorForm: boolean;
  handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleSubmitNewOption: (e: React.FormEvent<HTMLFormElement>) => void;
  timeToDecimal: (time: string) => number;
};

const FormNewShift = ({ shiftProps }: { shiftProps: ShiftProps }) => {
  const {
    setNewShiftLabel,
    setNewShiftColor,
    setNewShiftHourStart,
    setNewShiftHourEnd,
    newTextColor,
    setTextNewColor,
    errorForm,
    handleSubmitNewOption,
    timeToDecimal,
  } = shiftProps;

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
            className="bg-base-50 rounded-md border-1 border-base-300 w-25 px-2"
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
              className={`rounded-full bg-base-100 border-2 border-base-300 w-6 h-6 ${
                newTextColor === "var(--color-base-100)"
                  ? "border-blue-400"
                  : ""
              }`}
            ></div>
            <div
              onTouchStart={() => setTextNewColor("var(--color-base-900)")}
              className={`rounded-full bg-base-900 border-2 border-base-300 w-6 h-6 ${
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
              className="bg-base-50 rounded-md border-1 border-base-300 w-20 px-2"
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
              className="bg-base-50 rounded-md border-1 border-base-300 w-20 px-2"
              type="time"
              onChange={(e) =>
                setNewShiftHourEnd(
                  Number(timeToDecimal(e.currentTarget.value).toFixed(2))
                )
              }
            />
          </label>
          <p className="text-base-400 text-sm">
            Select the event time only if you want it to add to your hours for
            the month.
          </p>
        </div>
      </form>
    </div>
  );
};

export default FormNewShift;
