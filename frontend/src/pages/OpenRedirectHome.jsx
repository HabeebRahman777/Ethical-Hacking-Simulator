import React from "react";
import { useLocation } from "react-router-dom";

const OpenRedirectHome = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");
  

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Home Page</h1>
      <p>Your User ID: {userId}</p>
    </div>
  );
};

export default OpenRedirectHome;
