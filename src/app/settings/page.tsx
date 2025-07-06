"use client";
import DeleteShift from "@/components/DeleteShift";
import FormNewShift from "@/components/FormNewShift";
import React from "react";
import { useRouter } from "next/navigation";

const PageSettings = () => {
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

  const hoursComputed = newShiftHourEnd - newShiftHourStart;

  const newDefaultOptions = {
    id: newShiftLabel.toLocaleLowerCase(),
    label:
      newShiftLabel.charAt(0).toUpperCase() +
      newShiftLabel.slice(1).toLowerCase(),
    color: newShiftColor,
    textColor: newTextColor,
    hours: Number(hoursComputed.toFixed(2)),
  };

  function handleSubmitNewOption(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!newShiftLabel.length || !newShiftColor.length) {
      setErrorForm(true);
      return;
    }

    try {
      const savedShifts = localStorage.getItem("userShiftsList");
      const userShifts = savedShifts ? JSON.parse(savedShifts) : [];
      const shiftExists = userShifts.some(
        (shift: { id: string }) =>
          shift.id === newShiftLabel.trim().toLowerCase()
      );

      if (shiftExists) {
        alert("There is already a shift with that name.");
        return;
      }

      userShifts.push(newDefaultOptions);

      localStorage.setItem("userShiftsList", JSON.stringify(userShifts));

      setErrorForm(false);
      router.push("/");
    } catch (err) {
      console.log("Erro ao salvar novo shift", err);
    }
  }

  const router = useRouter();
  function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (
      newShiftLabel ||
      newShiftColor ||
      newShiftHourStart ||
      newShiftHourEnd
    ) {
      const confirmDiscard = window.confirm(
        "Do you want to discard the changes?"
      );
      if (confirmDiscard) {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }
  console.log(newDefaultOptions);
  return (
    <div className="grid m-5 gap-3">
      <h2 className="m-auto mt-2 text-base-900 font-bold text-2xl">Settings</h2>
      <FormNewShift
        shiftProps={{
          newShiftLabel,
          setNewShiftLabel,
          newShiftColor,
          setNewShiftColor,
          newShiftHourStart,
          setNewShiftHourStart,
          newShiftHourEnd,
          setNewShiftHourEnd,
          newTextColor,
          setTextNewColor,
          errorForm,
          handleClose,
          handleSubmitNewOption,
          timeToDecimal,
          setErrorForm,
        }}
      />
      <DeleteShift />
      <div className="flex gap-5 justify-between">
        <button
          onClick={handleClose}
          className="bg-base-200 rounded-md px-16 py-1 active:bg-base-300"
        >
          Close
        </button>
        <button
          className="bg-blue-500 text-base-50 rounded-md px-16 py-1 active:bg-blue-600"
          type="submit"
          onClick={handleSubmitNewOption}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default PageSettings;
