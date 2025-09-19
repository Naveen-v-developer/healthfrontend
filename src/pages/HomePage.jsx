import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">HealthMark</div>
        <div className="navbar-buttons">
          <button onClick={() => navigate('/login')} className="nav-button">Login</button>
          <button onClick={() => navigate('/register')} className="nav-button">Register</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="home-container">
        <h1 className="home-title">Welcome to HealthMark</h1>
        <p className="home-subtitle">
          HealthMark is your personal health dashboard.<br />
          Track your daily vitals like sleep, water intake, food, and exercise.<br />
          Get personalized tips, predictions, and stay consistent to improve your well-being.
        </p>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>
          Designed & Developed by Team<span className="highlight">Critical Thinkers</span>
        </p>
      </footer>
    </div>
  );
}
