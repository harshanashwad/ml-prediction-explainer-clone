import React from "react";
import { trainModel } from "../utils/api";

const TrainButton = ({ target, onTrainSuccess }) => {
  const handleTrain = async () => {
    if (!target) {
      alert("Please select a target column first.");
      return;
    }

    try {
      const result = await trainModel(target);
      onTrainSuccess(result); // sets OnTrainSuccess is a prop function. In App.jsx we pass setModelResult method as a prop with name OnTrainSuccess
    } catch (err) {
      alert("Training failed. Check backend logs.");
      console.error(err);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleTrain}
        className="btn btn-primary mt-4"
      >
        Train Model
      </button>
    </div>
  );
};

export default TrainButton;
