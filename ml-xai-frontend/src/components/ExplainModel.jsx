import React, { useState } from "react";
import { getExplanations } from "../utils/api";
import RowInput from "./RowInput";
import GlobalShapResults from "./GlobalSHAPResults";
import LocalShapResults from "./LocalSHAPResults";


function ExplainModel() {
  const [rowIndex, setRowIndex] = useState(0);
  const [explainData, setExplainData] = useState(null);

  const handleExplain = async () => {
    try {
      const data = await getExplanations(rowIndex, rowIndex + 1);
      setExplainData(data);
    } catch (err) {
      console.error("Explanation error:", err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Explain Predictions</h2>

      <RowInput rowIndex={rowIndex} setRowIndex={setRowIndex} onSubmit={handleExplain} />

      {explainData && (
        <div className="mt-6 space-y-4">
          <GlobalShapResults data={explainData.global_feature_importance} model_type={explainData.model_type} />
          <LocalShapResults data={explainData.local_explanations} model_type={explainData.model_type} />
        </div>
      )}
    </div>
  );
}

export default ExplainModel;
