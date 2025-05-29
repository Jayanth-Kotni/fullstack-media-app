import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);

      alert('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Welcome Back</h2>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="auth-input" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="auth-input" />
        <button type="submit" className="auth-button">Login</button>
        <p className="auth-switch">Don't have an account? <span onClick={() => navigate('/register')}>Register</span></p>
      </form>
    </div>
  );
};

export default Login;
