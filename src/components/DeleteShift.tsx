import React from "react";

const DeleteShift = () => {
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
          <option value="">Selecione um turno</option>
          <option value="manha">Manhã</option>
          <option value="tarde">Tarde</option>
          <option value="noite">Noite</option>
        </select>
      </div>
    </div>
  );
};

export default DeleteShift;
