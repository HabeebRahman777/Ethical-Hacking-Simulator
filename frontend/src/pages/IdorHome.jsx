import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { useLocation } from "react-router-dom";

const IdorHome = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(""); 
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return; 

      try {
        const response = await axiosInstance.get(`/tasks/idor/${userId}`);
        setUserData(response.data);
      } catch (err) {
        setError("⚠️ Failed to fetch user data. Please try again.");
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [userId]); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to the Home Page
        </h1>
        <p className="text-gray-700">
          <strong>Your User ID:</strong> {userId || "N/A"}
        </p>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {userData ? (
          <div className="mt-6 p-4 bg-gray-100 rounded-md border border-gray-300 text-left">
            <h2 className="text-lg font-semibold text-gray-700">User Details</h2>
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
            <p>
              <strong>Password:</strong> {userData.password}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-gray-600">🔄 Loading user details...</p>
        )}

        <p className="mt-4 p-3 text-sm text-gray-700 bg-gray-100 rounded-md border border-gray-300 text-center">
          <span className="font-semibold">Hint:</span> Change the <code>userId</code> value in the URL.
        </p>

      </div>
    </div>
  );
};

export default IdorHome;
