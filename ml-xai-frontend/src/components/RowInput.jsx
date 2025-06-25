import React from "react";

function RowInput({ rowIndex, setRowIndex, onSubmit }) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Row Index to Explain</span>
      </label>
      <input
        type="number"
        min="0"
        value={rowIndex}
        onChange={(e) => setRowIndex(Number(e.target.value))}
        className="input input-bordered w-full"
      />
      <button onClick={onSubmit} className="btn btn-primary mt-2">
        Explain Row
      </button>
    </div>
  );
}

export default RowInput;
