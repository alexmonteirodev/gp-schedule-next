import React from "react";
import { PeriodOptionType } from "./PeriodOptions";
import checkSvg from "../../public/check.svg";
import Image from "next/image";
import { useCalendarContext } from "./Context";

const DeleteShift = () => {
  const [shiftsUserList, setShiftsUserList] = React.useState<
    PeriodOptionType[]
  >([]);
  const [selectedShiftId, setSelectedShiftId] = React.useState("");

  const { deleted, setDeleted, setNewShiftAdded } = useCalendarContext();

  React.useEffect(() => {
    const savedShifts = localStorage.getItem("userShiftsList");
    if (savedShifts) {
      setShiftsUserList(JSON.parse(savedShifts));
    }
  }, []);

  function handleDeleteShift() {
    if (!selectedShiftId) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this shift?"
    );
    if (!confirmDelete) return;

    const updatedShifts = shiftsUserList.filter(
      (shift) => shift.id !== selectedShiftId
    );

    localStorage.setItem("userShiftsList", JSON.stringify(updatedShifts));
    setShiftsUserList(updatedShifts);
    setSelectedShiftId("");
    setNewShiftAdded((prev) => prev - 1);
    setDeleted(true);
    setTimeout(() => {
      setDeleted(false);
    }, 3000);
  }

  return (
    <div>
      {deleted ? (
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 transform bg-base-200 px-5 py-1 rounded-md shadow-md flex gap-3 items-center justify-center whitespace-nowrap transition-all duration-500 
    ${deleted ? "translate-y-8 opacity-100" : "-translate-y-10 opacity-0"}
  `}
        >
          <p>Shift has been deleted</p>
          <Image src={checkSvg} alt="check.svg" className="w-5 h-5" priority />
        </div>
      ) : (
        ""
      )}
      <h3 className="text-base-900 font-bold text-xl mb-2">Delete Shift</h3>
      <div className="flex flex-col bg-base-200 rounded-md p-4">
        {/* <label htmlFor="turno">Choose a Shift</label> */}
        <select
          id="turno"
          value={selectedShiftId}
          onChange={(e) => setSelectedShiftId(e.target.value)}
          className="bg-base-50 rounded-md border border-base-300 px-2 py-1"
        >
          <option value="">Select a shift</option>
          {shiftsUserList.map((shift) => (
            <option key={shift.id} value={shift.id} title={shift.label}>
              {shift.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleDeleteShift}
          disabled={!selectedShiftId}
          className="bg-red-300 text-red-700 rounded-md py-0.5 px-3 w-25 mt-3 disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteShift;
