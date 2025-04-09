import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

const SXSS = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Fetch comments from the backend
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get("/tasks/SXSS/comments");
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, []);

  // Submit a new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/tasks/SXSS/comments", { name, comment });
      setComments((prev) => [...prev, { name, comment }]); // Update state
      setName("");
      setComment("");
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Stored XSS Challenge
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              Comment:
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">All Comments</h2>
        <ul className="mt-3 space-y-3">
          {comments.map((c, index) => (
            <li
              key={index}
              className="p-3 border rounded-md bg-gray-50 shadow-sm"
            >
              <strong className="text-blue-600">{c.name}</strong>:{" "}
              <span dangerouslySetInnerHTML={{ __html: c.comment }}></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SXSS;
