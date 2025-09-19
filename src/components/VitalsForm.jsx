import React, { useState } from 'react';
import axios from 'axios';
import './VitalsForm.css';
import Modal from './PopupModal'; // Popup Modal Component

const VitalsForm = ({ onTipUpdate }) => {
  const [vitals, setVitals] = useState({
    sleep: '',
    water: '',
    food: '',
    exercise: '',
  });
  const [score, setScore] = useState(null);
  const [message, setMessage] = useState('');
  const [tip, setTip] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setVitals({ ...vitals, [e.target.name]: e.target.value });
  };

  const calculateScore = ({ sleep, water, food, exercise }) => {
    let total = 0;
    const sleepVal = parseFloat(sleep);
    const waterVal = parseInt(water);
    const foodVal = parseInt(food);
    const exerciseVal = parseInt(exercise);

    // Sleep
    if (sleepVal >= 7 && sleepVal <= 9) total += 25;
    else if (sleepVal >= 6) total += 20;
    else if (sleepVal >= 5) total += 15;
    else total += 5;

    // Water
    if (waterVal >= 8) total += 25;
    else if (waterVal >= 6) total += 20;
    else if (waterVal >= 4) total += 15;
    else total += 5;

    // Food
    total += Math.min(foodVal, 10) * 2.5;

    // Exercise
    if (exerciseVal >= 30 && exerciseVal <= 60) total += 25;
    else if (exerciseVal >= 15) total += 20;
    else if (exerciseVal >= 5) total += 10;

    return Math.round(total);
  };

  const generateTip = ({ sleep, water, food, exercise }) => {
    const sleepVal = parseFloat(sleep);
    const waterVal = parseInt(water);
    const foodVal = parseInt(food);
    const exerciseVal = parseInt(exercise);

    if (sleepVal < 6) {
      return '😴 Try to get at least 7–8 hours of quality sleep tonight.';
    } else if (waterVal < 5) {
      return '💧 Increase your water intake to stay hydrated.';
    } else if (foodVal < 5) {
      return '🥗 Include more fruits and vegetables in your meals.';
    } else if (exerciseVal < 3) {
      return '🏃‍♂️ Add a short walk or workout to your day.';
    } else {
      return '✅ Great job! Keep maintaining your healthy routine.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setTip('');

    const calculated = calculateScore(vitals);
    const generatedTip = generateTip(vitals);

    setScore(calculated);
    setTip(generatedTip);

    if (onTipUpdate) onTipUpdate(generatedTip);
    setShowPopup(true);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const date = new Date().toISOString().slice(0, 10);

      const payload = {
        userId: user?.id || user?._id,
        sleep: parseFloat(vitals.sleep),
        water: parseInt(vitals.water),
        food: parseInt(vitals.food),
        exercise: parseInt(vitals.exercise),
        score: calculated,
        date,
      };

      await axios.post('http://localhost:5002/api/score/add', payload);
      setMessage('Score calculated and saved successfully!');
    } catch (err) {
      console.error('Error during score submission:', err);
      setMessage('Failed to save score.');
    }
  };

  return (
    <div className="vitals-container">
      <h2>Daily Vitals</h2>
      <form onSubmit={handleSubmit} className="vitals-form">
        <label>
          Sleep (hours):
          <input
            type="number"
            name="sleep"
            placeholder="e.g. 7.5"
            value={vitals.sleep}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Water (glasses):
          <input
            type="number"
            name="water"
            placeholder="e.g. 8"
            value={vitals.water}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Food quality (1–10):
          <input
            type="number"
            name="food"
            placeholder="e.g. 7"
            value={vitals.food}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Exercise (minutes):
          <input
            type="number"
            name="exercise"
            placeholder="e.g. 30"
            value={vitals.exercise}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Calculate Score</button>
      </form>

      {message && <p className="vitals-message">{message}</p>}
      {score !== null && (
        <p className="vitals-score">
          Your Health Score: <strong>{score}</strong>/100
        </p>
      )}

      {/* ✅ Pass score so PopupModal can change color */}
      <Modal
        show={showPopup}
        onClose={() => setShowPopup(false)}
        score={score}
      >
        <h3>Your Health Score: {score}</h3>
        <p>{tip}</p>
      </Modal>
    </div>
  );
};

export default VitalsForm;
