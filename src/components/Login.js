import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
  const [prn, setPrn] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/hms/api/login",
        { prn, password },
        { withCredentials: true }
      );

      if (response.data === "Login successful") {
        sessionStorage.setItem("prn", prn); // ✅ Store PRN for session
        navigate("/home"); // ✅ Redirect to Home page
      } else {
        setMessage(response.data);
      }
    } catch (error) {
      setMessage("Error: Unable to login.");
    }
  };

  return (
    <div className="login-container">
      <h2>CDAC Girls Hostel Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>PRN Number</label>
          <input
            type="text"
            className="form-control"
            value={prn}
            onChange={(e) => setPrn(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>

        {/* Register Link */}
        <p className="mt-3">
          Don't have an account?{" "}
          <button
            type="button"
            className="btn btn-success"
            onClick={() => navigate("/register")}
          >
            Register here
          </button>
        </p>

        {/* Admin Login Button */}
        <p className="mt-3">
        <button onClick={() => navigate("/login")}>Admin Login</button>
        </p>

        {message && <p className="text-danger mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
