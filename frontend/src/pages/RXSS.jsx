import React, { useState } from "react";

const RXSS = () => {
  const xssPayload = `<img src="x" onerror="alert('XSS')">`;
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Directly render user input without sanitization (Intentional for XSS Challenge)
    setResult(`You searched for: ${query}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Reflected XSS Challenge
        </h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter search term"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
        {result && (
          <div className="mt-4 p-3 border rounded-md bg-gray-50">
            {/* Intentionally vulnerable to XSS */}
            <p dangerouslySetInnerHTML={{ __html: result }}></p>
          </div>
        )}
        <div className="mt-4 text-gray-700">
          <p>Try the following input:</p>
          <code className="bg-gray-200 p-1 rounded-md block">{xssPayload}</code>
        </div>
      </div>
    </div>
  );
};

export default RXSS;
