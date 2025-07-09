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
  setErrorForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleSubmitNewOption: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
    timeToDecimal,
    setErrorForm,
  } = shiftProps;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base-900 font-bold text-xl mb-2 dark:text-base-100">
          New Shift
        </h3>
        {errorForm ? (
          <p className="text-red-400 text-sm">* Fill in all fields</p>
        ) : (
          ""
        )}
      </div>
      <form className="flex flex-col bg-base-200 rounded-md p-4 dark:bg-base-800">
        <label
          htmlFor="title"
          className="text-base-900 flex items-center gap-3 dark:text-base-50"
        >
          Title
          <input
            className="bg-base-50 rounded-md border-1 border-base-300 w-25 px-2 dark:bg-base-200 dark:text-base-950"
            type="text"
            maxLength={9}
            onChange={(e) => {
              setNewShiftLabel(e.currentTarget.value);
              setErrorForm(false);
            }}
          />
        </label>

        <hr className="my-4 text-base-300 dark:text-base-700" />

        <label
          htmlFor="color"
          className=" flex items-center gap-3 dark:text-base-50"
        >
          Color
          <input
            className="rounded-full "
            type="color"
            onChange={(e) => {
              setNewShiftColor(e.currentTarget.value);
              setErrorForm(false);
            }}
          />
        </label>

        <div className="flex gap-5 mt-3 items-center">
          <p className="dark:text-base-50">Title</p>
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

        <hr className="my-4 text-base-300 dark:text-base-700" />

        <div className="space-y-3">
          <label
            className="text-base-900 flex items-center gap-2 dark:text-base-50"
            htmlFor="hours"
          >
            Start
            <input
              className="bg-base-50 rounded-md border-1 border-base-300 w-20 px-2 dark:bg-base-200 dark:text-base-950"
              type="time"
              onChange={(e) =>
                setNewShiftHourStart(
                  Number(timeToDecimal(e.currentTarget.value).toFixed(2))
                )
              }
            />
          </label>
          <label
            className="text-base-900 flex items-center gap-4 dark:text-base-50"
            htmlFor="hours"
          >
            End
            <input
              className="bg-base-50 rounded-md border-1 border-base-300 w-20 px-2 dark:bg-base-200 dark:text-base-950"
              type="time"
              onChange={(e) =>
                setNewShiftHourEnd(
                  Number(timeToDecimal(e.currentTarget.value).toFixed(2))
                )
              }
            />
          </label>
          <p className="text-base-400 text-sm dark:text-base-500">
            Select the event time only if you want it to add to your hours for
            the month.
          </p>
        </div>
      </form>
    </div>
  );
};

export default FormNewShift;
