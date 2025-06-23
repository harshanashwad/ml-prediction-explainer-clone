import React, { useState } from "react";
import { uploadCSV } from "../utils/api";

// onUploadSuccess is a prop function. We decide when to call it here. What it does depends on the logic of this function in the parent
const UploadCSV = ({ onUploadSuccess }) => {

// file, uploading and error are state variables that trigger rerender when updated
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const result = await uploadCSV(file);
      onUploadSuccess(result); // Pass result to parent component
    } catch (err) {
      setError("Upload failed: " + err.response?.data?.detail || err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md w-full max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">Upload Your CSV</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full max-w-xs mb-4"
      />

      <button
        className="btn btn-primary"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default UploadCSV;
