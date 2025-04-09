import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";

const CommandInjection = () => {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState("");

  const handleScan = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/tasks/command-injection", {
        ip,
      });
      setResult(response.data.result);
    } catch (error) {
      setResult("Error occurred while scanning.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Ping a Server
        </h2>
        <form onSubmit={handleScan} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">
              Enter IP Address:
            </label>
            <input
              type="text"
              placeholder="e.g., 192.168.1.1"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Ping
          </button>
        </form>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 border rounded-md shadow-sm">
            <h4 className="text-lg font-semibold text-gray-700">Result:</h4>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandInjection;
