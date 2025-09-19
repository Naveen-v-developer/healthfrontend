// src/components/DailyTip.jsx
import React from 'react';
import './Tip.css';

const DailyTip = ({ tip }) => {
  return (
    <div className="tip-container">
      <h3>💡 Daily Health Tip</h3>
      <p>{tip || 'No tip available yet. Submit your vitals to get one!'}</p>
    </div>
  );
};

export default DailyTip;
