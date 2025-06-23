import React, { useState } from "react";
import UploadCSV from "./components/UploadCSV";

function App() {
  const [csvSummary, setCsvSummary] = useState(null);

  return (
    <div className="min-h-screen bg-base-200 p-8">
      {/* setCsvSummary(result) where result is the response received from making axios call to upload-csv/ in api backend */}
      <UploadCSV onUploadSuccess={setCsvSummary} />

      {csvSummary && (
        <div className="mt-6 bg-white shadow-md p-4 rounded max-w-xl mx-auto">
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
      )}
    </div>
  );
}

export default App;
