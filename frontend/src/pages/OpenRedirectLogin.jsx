import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

const OpenRedirectLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    const searchParams = new URLSearchParams(location.search);
    const redirectUrl = searchParams.get("redirect");

    try {
      const response = await axiosInstance.post("/tasks/open-redirect", {
        username,
        password,
      });

      if (response.data.success) {
        const userId = response.data.userId;

        if (redirectUrl) {
          window.location.href = `${redirectUrl}?userId=${userId}`;
        } else {
          alert("No redirect URL found.");
        }
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Instruction text - Styled and properly placed below the form */}
        <p className="mt-4 p-3 text-sm text-gray-700 bg-gray-100 rounded-md border border-gray-300 text-center">
          <span className="font-semibold">Hint:</span> Change the <code>redirect</code> value in the URL.
          <br />
          <span className="font-semibold">Sample Login Credentials:</span>
          <br />
          <span className="text-blue-600">Username:</span> victim1
          <br />
          <span className="text-blue-600">Password:</span> 111111
        </p>
      </div>
    </div>
  );
};

export default OpenRedirectLogin;
