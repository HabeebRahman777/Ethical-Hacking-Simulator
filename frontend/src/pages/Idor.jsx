import React, { useState } from "react";
import { axiosInstance } from "../lib/axios"; // Adjust based on your axios setup

const IDORExample = () => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const fetchUserData = async () => {
    if (!userId) {
      setError("Please enter a User ID");
      return;
    }

    try {
      const response = await axiosInstance.get(`/tasks/idor/${userId}`);
      setUserData(response.data);
      setError(""); // Clear errors on success
    } catch (err) {
      setUserData(null);
      setError("Failed to fetch user data. Make sure the ID exists.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
      <h1>IDOR Vulnerability Demo</h1>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="userId">Enter User ID:</label>
        <br />
        <input
          id="userId"
          type="text"
          value={userId}
          onChange={handleInputChange}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>
      <button onClick={fetchUserData} style={{ padding: "10px 20px", marginBottom: "15px" }}>
        Fetch User Data
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {userData && (
        <div style={{ textAlign: "left", border: "1px solid #ccc", padding: "15px", borderRadius: "5px" }}>
          <h2>User Details:</h2>
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>Username:</strong> {userData.username}</p>
        </div>
      )}
    </div>
  );
};

export default IDORExample;
