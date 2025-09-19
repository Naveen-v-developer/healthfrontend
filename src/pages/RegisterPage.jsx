import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [message2, setMessage2]= useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('https://health-hx5a.onrender.com/api/auth/register', formData);
      setMessage(res.data.message || 'Registered successfully!');
    } catch (err) {
      setMessage2(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="register-input"
          />
          <button type="submit" className="register-button">Register</button>
        </form>
        {message && <p className="register-message">{message}</p>}
         {message2 && <p className="register-message2">{message2}</p>}

        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
