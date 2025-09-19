import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScoreChart from '../components/ScoreChart';
import './UserHistory.css';
import axios from 'axios';

const UserHistory = () => {
  const { userId } = useParams();
  const [scores, setScores] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get score history for the user
        const historyRes = await axios.get(`https://health-bxi5.onrender.com/api/scores/history/${userId}`);
        setScores(historyRes.data);

        // Get user details to fetch the name
        const userRes = await axios.get(`https://health-bxi5.onrender.com/api/auth/users`);
        const user = userRes.data.find(u => u._id === userId);
        setUserName(user?.name || 'User');
      } catch (err) {
        console.error('Error loading user history:', err);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="history-container">
      <h2>{userName}'s Health Score History</h2>
      {scores.length > 0 ? (
        <ScoreChart data={scores} />
      ) : (
        <p>No health scores found for this user.</p>
      )}
    </div>
  );
};

export default UserHistory;
