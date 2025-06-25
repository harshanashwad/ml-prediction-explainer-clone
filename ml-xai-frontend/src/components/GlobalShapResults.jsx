import React from "react";

function GlobalShapResults({ data, model_type }) {
  if (!data || !model_type) return null;

  let displayData = [];

  if (model_type === "RandomForestRegressor") {
    // For regression, use the data directly and sort by importance
    displayData = [...data].sort((a, b) => b.importance - a.importance);
  } else if (model_type === "RandomForestClassifier") {
    // For classification, aggregate feature importances across classes
    const featureSums = {};
    const featureCounts = {};

    data.forEach((classData) => {
      classData.features.forEach((item) => {
        featureSums[item.feature] = (featureSums[item.feature] || 0) + item.importance;
        featureCounts[item.feature] = (featureCounts[item.feature] || 0) + 1;
      });
    });

    displayData = Object.keys(featureSums).map((feature) => ({
      feature,
      importance: featureSums[feature] / featureCounts[feature],
    })).sort((a, b) => b.importance - a.importance);
  }

  return (
    <div className="card bg-base-100 shadow-xl p-6 w-full">
      <h3 className="text-lg font-semibold mb-3">
        Global Feature Importance
        {model_type === "RandomForestClassifier" && (
          <span className="text-sm text-base-content/70 ml-2">
            (Averaged across all classes)
          </span>
        )}
      </h3>
      <ul className="menu bg-base-100 shadow-md rounded-box p-4 space-y-2">
        {displayData.map((item) => (
          <li key={item.feature} className="text-base">
            <span>
              <strong>{item.feature}:</strong>{" "}
              {model_type === "RandomForestRegressor"
                ? Number(item.importance).toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })
                : item.importance.toFixed(3)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GlobalShapResults;