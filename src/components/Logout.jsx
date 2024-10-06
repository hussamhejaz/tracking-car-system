// Logout.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add your logout logic here, e.g., clear user data, tokens, etc.
    // After logging out, redirect to the login or dashboard page.
    navigate("/login"); // Redirect to login page after logout
  }, [navigate]);

  return <div>Logging out...</div>; // Optional loading message
};

export default Logout;
