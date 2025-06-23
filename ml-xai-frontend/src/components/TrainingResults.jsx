import React from "react";

const TrainingResults = ({ result }) => {
  // These fields are extracted from calling train-model endpoint of backend, there are other fields that we can choose to use later if need be
  const { model_type, task, metrics } = result;

  return (
    <div className="bg-white shadow-md p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">Training Summary</h3>
      <p><strong>Model:</strong> {model_type}</p>
      <p><strong>Task:</strong> {task}</p>

      <div className="mt-2">
        <strong>Metrics:</strong>
        <ul className="list-disc ml-5">
          {/* Object.entries(metrics) converts the metrics object into an array of key value pairs */}
          {Object.entries(metrics).map(([key, val]) => (
            <li key={key}>
              {key}: {typeof val === "number" ? val.toFixed(3) : val}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrainingResults;
