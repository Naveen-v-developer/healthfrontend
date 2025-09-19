import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css';
import { useNavigate } from 'react-router-dom';

// Generates a playful avatar using DiceBear Avatars API (ShareIt-like style)
const getAvatarUrl = (name) => {
  const seed = encodeURIComponent(name.trim());
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
};

// Medal emojis
const getMedalEmoji = (rank) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
};

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5002/api/auth/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Failed to load users:', err));
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
      const results = [];

      for (const user of users) {
        try {
          const res = await axios.get(`http://localhost:5002/api/scores/history/${user._id}`);
          const scores = res.data;

          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

          const weeklyScores = scores.filter((s) => new Date(s.date) >= sevenDaysAgo);
          const bestScore = Math.max(...weeklyScores.map((s) => s.score), 0);

          results.push({ name: user.name, bestScore, _id: user._id });
        } catch (err) {
          console.error(`Error fetching history for ${user.name}`, err);
        }
      }

      results.sort((a, b) => b.bestScore - a.bestScore);
      setLeaderboard(results);
    };

    if (users.length > 0) fetchScores();
  }, [users]);

  return (
    <div className="leaderboard-container">
      <h2>🏆 Weekly Leaderboard</h2>
      <ol>
        {leaderboard.slice(0, 15).map((user, index) => {
          const rank = index + 1;
          return (
            <li
              key={user._id}
              onClick={() => navigate(`/score-chart/${user._id}`)}
              title={`View ${user.name}'s score history`}
            >
              <span className="rank">{getMedalEmoji(rank)}</span>
              <div className="user-info">
                <img
                  src={getAvatarUrl(user.name)}
                  alt={user.name}
                  className="avatar"
                />
                <span className="username">{user.name}</span>
              </div>
              <span className="score">{user.bestScore}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Leaderboard;
