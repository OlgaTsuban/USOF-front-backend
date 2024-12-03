import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    email: '',
  });
  console.log("hello from");
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit triggered with data:", formData);
    try {
      const response = await axios.post('http://localhost:5050/api/auth/login', formData, { withCredentials: true });
      console.log(response);
      onLogin(response.data.data.user); // Pass the user data to App's handleLogin function
      alert('Login successful');
      navigate('/');
      //setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error during login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input type="text" name="login" placeholder="Login" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      {/* Links for Register and Recover Password */}
      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <p style={{ color: '#D8BFD8', cursor: 'pointer' }}>
          
          Don't have an account?{' '}
          <span
            style={{ color: 'white', cursor: 'pointer' }}
            onClick={() => navigate('/register')}
          >
            <strong>Register here</strong>
          </span>
        </p>
        <p style={{ color: '#D8BFD8', cursor: 'pointer' }}>
          Forgot your password?{' '}
          <span
            style={{ color: 'white', cursor: 'pointer' }}
            onClick={() => navigate('/password-reset')}
          >
            <strong>Recover it here</strong>
          </span>
        </p>
      </div>
      <button type="submit" className="btn btn-primary btn-block btn-large">Login</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default LoginForm;
