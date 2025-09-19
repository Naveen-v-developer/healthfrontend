// src/pages/Dashboard.jsx

import React, { useState } from 'react';
import './Dashboard.css';
import VitalsForm from './VitalsForm';
import { useNavigate } from 'react-router-dom';
import PredictedScore from './PredictedScore';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [tip, setTip] = useState('');
  const [refresh, setRefresh] = useState(0); // ✅ Refresh counter
  const navigate = useNavigate();

  // 🔁 Call this when score is calculated
  const handleScoreCalculated = () => {
    setRefresh(prev => prev + 1); // Triggers PredictedScore re-fetch
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.username || 'User'}!</h2>
      <p className="dashboard-subtitle">
        Track your daily vitals and improve your health.
      </p>

      <div className="dashboard-grid">
        <VitalsForm onTipUpdate={setTip} onScoreCalculated={handleScoreCalculated} />
      </div>

      {/* 🧠 Predicted Score Box */}
      <div>
        <PredictedScore userId={user._id} refreshTrigger={refresh} />
      </div>

      <div className="leaderboard-link">
  <button onClick={() => navigate('/leaderboard')}>
    🏆 View Weekly Leaderboard
  </button>
</div>

    </div>
  );
};

export default Dashboard;
