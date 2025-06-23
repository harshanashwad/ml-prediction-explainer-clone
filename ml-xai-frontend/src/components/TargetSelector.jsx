import React from "react";

// onSelect is setTarget from parent; selected is the target state variable and options is from csvSummary
// changing the target will trigger setTarget that updates App state. So app is rerendered (meaning target selector is rerendered with updated target)

const TargetSelector = ({ options, selected, onSelect }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 max-w-xl mx-auto mt-6">
      <label className="label">
        <span className="label-text font-semibold">Select Target Column</span>
      </label>
      <select
        className="select select-bordered w-full"
        value={selected || ""}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="" disabled>
          -- Choose a target column --
        </option>
        {options.map((col) => (
          <option key={col} value={col}>
            {col}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TargetSelector;
