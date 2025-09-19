import React from 'react';
import './PopupModal.css';

const PopupModal = ({ show, onClose, children, score }) => {
  if (!show) return null;

  // Function to decide color based on score value
  const getScoreClass = (score) => {
    if (score >= 61) return 'score-high';    // Green
    if (score >= 31) return 'score-medium';  // Yellow
    return 'score-low';                      // Red
  };

  return (
    <div className="modal-overlay">
      <div className={`modal-box ${getScoreClass(score)}`}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default PopupModal;
