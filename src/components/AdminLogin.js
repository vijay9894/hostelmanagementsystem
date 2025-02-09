import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/hms/api/admin/login",
        { adminId, password },
        { withCredentials: true }
      );

      if (response.data === "Admin login successful") {
        sessionStorage.setItem("adminId", adminId); // ✅ Store Admin ID for session
        navigate("/adminhome"); // ✅ Redirect to Admin Home
      } else {
        setMessage(response.data);
      }
    } catch (error) {
      setMessage("Error: Unable to login.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>CDAC Girls Hostel Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="adminId">Admin ID</label>
            <input
              type="text"
              className="form-control"
              id="adminId"
              placeholder="Enter Admin ID"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>

          {/* Forgot Password */}
          
          <button type="button" className="btn btn-secondary mt-2" onClick={() => navigate("/")}>
            Student Login
          </button>
          {message && <p className="text-danger mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
