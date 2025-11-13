import React from "react";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left section */}
        <div className="left-side">
          <div className="logo">
            <h2>eliya</h2>
            <p>MANAGE YOUR FINANCE EASY</p>
          </div>
          <div className="illustration">
            <img src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png" alt="Finance illustration" />
          </div>
        </div>

        {/* Right section */}
        <div className="right-side">
          <div className="curvy-bg">
            <h1 className="login-title">login</h1>
            <svg className="curve" viewBox="0 0 500 150" preserveAspectRatio="none">
              <path d="M0,0 C150,100 350,0 500,100 L500,0 L0,0 Z" style={{ fill: "#ffeef2" }} />
            </svg>
          </div>

          <div className="form-section">
            <form className="login-form">
              <input type="email" placeholder="balavaishnav@gmail.com" />
              <input type="password" placeholder="********" />
              <button type="submit">LOGIN</button>
            </form>

            <div className="divider">or</div>

            <div className="social-login">
              <button className="google">G</button>
              <button className="facebook">f</button>
              <button className="twitter">t</button>
            </div>

            <p className="signup-text">
              Don’t have an account? <a href="#">SIGNUP</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
