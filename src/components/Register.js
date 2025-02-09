import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

const Register = () => {
  const [prn, setPrn] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/hms/api/register",
        { prn, password }
      );

      if (response.data === "User registered successfully") {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage(response.data);
      }
    } catch (error) {
      setMessage("Error: Unable to register.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit" className="btn btn-success">Register</button>

        <p className="mt-3">
          Already have an account?{" "}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Login here
          </button>
        </p>

        {message && <p className="text-danger mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
