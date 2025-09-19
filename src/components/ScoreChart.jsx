import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import './ScoreChartPage.css';

const ScoreChartPage = () => {
  const { userId } = useParams();
  const [scoreData, setScoreData] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      console.log('📡 Fetching scores for userId:', userId);

      try {
        const res = await axios.get(`https://health-hx5a.onrender.com/api/sco/${userId}`);
        console.log('✅ Raw API response:', res.data);

        const sorted = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        console.log('📅 Sorted data by date:', sorted);

        const last7 = sorted.slice(-7);
        console.log('🎯 Final 7 scores:', last7);

        setScoreData(last7);
      } catch (err) {
        console.error('❌ Error fetching score data:', err);
      }
    };

    if (userId) {
      console.log('🆔 userId from URL:', userId);
      fetchScores();
    } else {
      console.warn('⚠️ No userId found in URL.');
    }
  }, [userId]);

  return (
    <div className="score-chart-container">
      <h2 className="score-chart-title">📊 Score Histogram</h2>
      {scoreData.length > 0 ? (
        <ScoreChart data={scoreData} />
      ) : (
        <p className="loading-text">Loading score data...</p>
      )}
    </div>
  );
};

const ScoreChart = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString(),
  }));

  const getBarColor = (score) => {
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 50) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="score">
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScoreChartPage;
