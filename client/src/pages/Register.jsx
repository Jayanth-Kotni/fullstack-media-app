import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Create Account</h2>
        <input name="username" placeholder="Username" onChange={handleChange} required className="auth-input" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="auth-input" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="auth-input" />
        <button type="submit" className="auth-button">Register</button>
        <p className="auth-switch">Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
      </form>
    </div>
  );
};

export default Register;
