import React from "react";

function LocalShapResults({ data, model_type }) {
  if (!data || !data.length || !model_type) return null;

  return (
    <div className="card bg-base-100 shadow-xl p-6 w-full mt-6">
      <h3 className="text-lg font-semibold mb-3">Local Explanations</h3>
      {data.map((item) => {
        const rowId = item.row_index;
        const prediction = item.prediction;

        if (model_type === "RandomForestRegressor") {
          const sortedContributions = Object.entries(item.shap_contributions).sort(
            (a, b) => Math.abs(b[1]) - Math.abs(a[1])
          );

          return (
            <div key={rowId} className="mb-4">
              <p className="font-medium text-base">Row #{rowId}</p>
              <p className="text-sm mb-2">
                <strong>Prediction:</strong>{" "}
                {Number(prediction).toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
              </p>
              <ul className="menu bg-base-100 shadow-md rounded-box p-4 space-y-2">
                {sortedContributions.map(([feature, val]) => (
                  <li key={feature} className="text-base">
                    <span>
                      <strong>{feature}:</strong>{" "}
                      {Number(val).toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        if (model_type === "RandomForestClassifier") {
          const predictedClass = item.class_wise_feature_contributions.find(
            (c) => c.class === prediction
          );
          const sortedContributions = Object.entries(predictedClass.contributions).sort(
            (a, b) => Math.abs(b[1]) - Math.abs(a[1])
          );

          return (
            <div key={rowId} className="mb-4">
              <p className="font-medium text-base">Row #{rowId}</p>
              <p className="text-sm mb-2">
                <strong>Predicted Class:</strong> {prediction} {" "}
                <strong>Probability:</strong> {predictedClass.probability.toFixed(3)}
              </p>
              <ul className="menu bg-base-100 shadow-md rounded-box p-4 space-y-2">
                {sortedContributions.map(([feature, val]) => (
                  <li key={feature} className="text-base">
                    <span>
                      <strong>{feature}:</strong> {val.toFixed(3)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

export default LocalShapResults;