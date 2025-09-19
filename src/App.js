import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Leaderboard from './components/Leaderboard';
import ScoreChartPage from './components/ScoreChart'; // ✅ import the correct page

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/score-chart/:userId" element={<ScoreChartPage />} /> {/* ✅ Fixed */}

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
