import React, { useState } from "react";

function RowInput({ rowIndex, setRowIndex, onSubmit }) {
  const [error, setError] = useState(null);

  const handleKeyDown = (e) => {
    // Allow only digits, backspace, delete, arrow keys, and tab
    const allowedKeys = [
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
      "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"
    ];
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^[0-9]+$/.test(value) && Number(value) >= 0)) {
      setRowIndex(value === "" ? "" : Number(value));
      setError(null);
    } else {
      setError("Please enter a valid non-negative number");
    }
  };

  const handleSubmit = () => {
    if (rowIndex === "" || isNaN(rowIndex)) {
      setError("Please enter a valid non-negative number");
      return;
    }
    onSubmit();
  };

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Row Index to Explain</span>
      </label>
      <input
        type="number"
        min="0"
        step="1"
        value={rowIndex}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        className="input input-bordered w-full"
        placeholder="Enter row index"
      />
      {error && (
        <div className="alert alert-error mt-2">
          <span>{error}</span>
        </div>
      )}
      <button
        onClick={handleSubmit}
        className="btn btn-primary mt-2"
        disabled={rowIndex === "" || isNaN(rowIndex)}
      >
        Explain Row
      </button>
    </div>
  );
}

export default RowInput;