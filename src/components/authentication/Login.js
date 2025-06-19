// components/authentication/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
    await AuthService.login(username, password);
    navigate("/rings");
    window.location.reload();
  } catch (error) {
    let resMessage = "Could not log in";

    if (error.response) {
      if (error.response.status === 401) {
        resMessage = "Wrong name or password";
      } else if (error.response.data && error.response.data.message) {
        resMessage = error.response.data.message;
      }
    } else if (error.message) {
      resMessage = error.message;
    }

    setMessage(resMessage);
    setLoading(false);
  }
};

  return (
    <div className="login-container">
      <div className="card">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Login
        </h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="submit-btn" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>

          {message && <div className="error-message">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
