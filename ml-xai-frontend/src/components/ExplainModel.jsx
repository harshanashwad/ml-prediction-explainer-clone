import React, { useState } from "react";
import { getExplanations } from "../utils/api";
import RowInput from "./RowInput";
import GlobalShapResults from "./GlobalShapResults";
import LocalShapResults from "./LocalShapResults";

function ExplainModel() {
  const [rowIndex, setRowIndex] = useState(0);
  const [explainData, setExplainData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExplain = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getExplanations(rowIndex, rowIndex + 1);
      setExplainData(data);
    } catch (err) {
      setError("Failed to fetch explanations");
      console.error("Explanation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="card bg-base-100 shadow-xl p-6 w-full">
        <h3 className="text-lg font-semibold mb-3">Model Explanations</h3>
        <RowInput rowIndex={rowIndex} setRowIndex={setRowIndex} onSubmit={handleExplain} />
        {error && (
          <div className="alert alert-error mt-2">
            <span>{error}</span>
          </div>
        )}
        {isLoading && <div className="text-center">Loading...</div>}
      </div>

      {explainData && (
        <div className="space-y-6 w-full">
          <GlobalShapResults data={explainData.global_feature_importance} model_type={explainData.model_type}/>
          <LocalShapResults data={explainData.local_explanations} model_type={explainData.model_type}/>
        </div>
      )}
    </div>
  );
}

export default ExplainModel;