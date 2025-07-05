import React from "react";

const FormNewShift = () => {
  return (
    <div>
      <h3 className="text-base-900 font-bold text-xl">New Shift</h3>
      <form className="flex flex-col">
        <label htmlFor="" className="text-base-900 ">
          Title
        </label>
        <input
          className="bg-base-200 rounded-md"
          type="text"
          placeholder="8 digits"
        />

        <label htmlFor="">Color</label>
        <input className="rounded-full" type="color" />

        <label className="bg-base-200 rounded-md" htmlFor="">
          Hours
        </label>
        <input type="number" />

        <button>Done</button>
      </form>
    </div>
  );
};

export default FormNewShift;
