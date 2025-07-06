"use client";
import DarkMode from "@/components/DarkMode";
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

  function handleSubmitNewOption(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newShiftLabel.length && !newShiftColor.length)
      return setErrorForm(true);
    console.log(newDefaultOptions);
  }

  const router = useRouter();
  function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const confirmDiscard = window.confirm(
      "Do you want to discard the changes?"
    );
    if (confirmDiscard) {
      router.push("/");
    }
  }
  console.log(newDefaultOptions);
  return (
    <div className="grid m-5 *:mb-5">
      <h2 className="m-auto mt-2 text-base-900 font-bold text-2xl">Settings</h2>
      <DarkMode />
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
        }}
      />
      <DeleteShift />
    </div>
  );
};

export default PageSettings;
