import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const AdminLogin = () => {
  const [prn, setPrn] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('PRN:', prn, 'Password:', password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Cdac Girls Hostel Management </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="prn">Admin Id</label>
            <input
              type="text"
              className="form-control"
              id="prn"
              placeholder="Enter Admin Id"
              value={prn}
              onChange={(e) => setPrn(e.target.value)}
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
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <p className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;