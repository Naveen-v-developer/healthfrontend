import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './predictedScore.css';

const PredictedScore = ({ userId }) => {
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId || !userId.trim()) {
      setError('User ID not found. Please log in again.');
      return;
    }

    setLoading(true);
    setError('');

    const trimmedId = userId.trim();

    axios
      .get(`https://ml-1-wp2i.onrender.com/predict-score?userId=${trimmedId}`)
      .then(res => {
        console.log('Prediction response:', res.data);

        if (res.data.predicted_scores !== undefined) {
          setScore(res.data.predicted_scores);
        } else {
          setError('Prediction not available');
        }
      })
      .catch(err => {
        console.error('Prediction error:', err);
        if (err.response?.status === 400) {
          setError(err.response.data?.error || 'Not enough data to predict');
        } else if (err.code === 'ERR_NETWORK') {
          setError('Network error: Cannot reach prediction server');
        } else {
          setError('Failed to fetch prediction');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="prediction-box">
      <h3>🧠 Tomorrow's Predicted Score</h3>
      {loading ? (
        <p className="prediction-loading">Loading...</p>
      ) : score !== null ? (
        <p className="prediction-score">{score}</p>
      ) : (
        <p className="prediction-error">{error}</p>
      )}
    </div>
  );
};

export default PredictedScore;
