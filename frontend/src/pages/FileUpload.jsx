import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post("/tasks/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadResult(response.data.fileUrl);
    } catch (err) {
      console.error("File upload error:", err.message);
      alert("File upload failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          File Upload Vulnerability
        </h1>

        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Upload File
          </button>
        </form>

        {uploadResult && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md border border-gray-300">
            <h2 className="text-lg font-semibold text-gray-700">
              Uploaded File:
            </h2>
            <a
              href={`http://localhost:3050${uploadResult}`}
              className="text-blue-600 hover:underline"
            >
              View Uploaded File
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
