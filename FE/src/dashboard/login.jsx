import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/login.css"; // Import CSS file for styling
import { FaUser, FaLock } from "react-icons/fa"; // Import icons

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "adminsate" && password === "admin123") {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-icon">
              <FaUser className="icon" />
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Enter your username" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon">
              <FaLock className="icon" />
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" />
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
