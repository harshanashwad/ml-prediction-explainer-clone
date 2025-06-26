import React, { useState } from "react";
import UploadCSV from "./components/UploadCSV";
import TargetSelector from "./components/TargetSelector";
import TrainButton from "./components/TrainButton";
import TrainingResults from "./components/TrainingResults";
import ExplainModel from "./components/ExplainModel";


function App() {
  const [csvSummary, setCsvSummary] = useState(null);
  const [target, setTarget] = useState("");
  const [modelResult, setModelResult] = useState(null); // stores training result (metrics, etc.)
  // const [shapResult, setShapResult] = useState(null);   // stores SHAP explanations

  return (
    // <div className="min-h-screen bg-base-200 p-8">
    <div className="min-h-screen bg-base-200 p-8 flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8">
      {/* Entire app is split into two columns */}
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* LEFT PANEL: Upload, metadata, target feature selection */}
        <div className="flex-2 space-y-6">
          <UploadCSV onUploadSuccess={setCsvSummary} />

          {csvSummary && (
            <>
              <div className="bg-white shadow-md p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">File Summary</h3>
                <p><strong>Rows:</strong> {csvSummary.row_count}</p>
                <p><strong>Columns:</strong> {csvSummary.column_count}</p>
                <div className="mt-2">
                  <strong>Target Candidates:</strong>
                  <ul className="list-disc ml-5">
                    {csvSummary.target_candidates.map((col) => (
                      <li key={col}>{col}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <TargetSelector
                options={csvSummary.target_candidates}
                selected={target}
                onSelect={setTarget}
              />

              <TrainButton target={target} onTrainSuccess={setModelResult} />
            </>
          )}
        </div>

        {/* RIGHT PANEL: Metrics + SHAP Explanations */}
        <div className="flex-1 space-y-6">
          {modelResult && (
            <TrainingResults result={modelResult} />
          )}

          {
           modelResult && <ExplainModel />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
