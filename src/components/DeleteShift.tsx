import React from "react";
import { PeriodOptionType } from "./PeriodOptions";

const DeleteShift = () => {
  const [shiftsUserList, setShiftsUserList] = React.useState<
    PeriodOptionType[]
  >([]);

  React.useEffect(() => {
    const savedShifts = localStorage.getItem("userShiftsList");
    if (savedShifts) {
      setShiftsUserList(JSON.parse(savedShifts));
    }
  }, []);
  return (
    <div>
      <h3 className="text-base-900 font-bold text-xl mb-2">Delete Shift</h3>
      <div className="flex flex-col bg-base-200 rounded-md p-4">
        <label htmlFor="turno">Choose a Shift</label>
        <select
          id="turno"
          onChange={(e) => console.log(e.target.value)}
          className="bg-base-50 rounded-md border border-base-300 px-2 py-1"
        >
          {shiftsUserList.map((shift) => (
            <option key={shift.id} value={shift.id} title={shift.label}>
              {shift.label}
            </option>
          ))}
        </select>
        <button className="bg-red-300 text-red-700 rounded-md py-0.5 px-3 w-25 mt-3">
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteShift;
