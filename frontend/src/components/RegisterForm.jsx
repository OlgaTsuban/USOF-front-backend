import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    passwordConfirmation: '',
    email: '',
    fullName: '',
  });
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    // RE for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setMessage('Please enter a valid email address.');
      return;
    } else {
      setEmailError(''); 
    }
    if (formData.password !== formData.passwordConfirmation) {
      setMessage('Passwords do not match.');
      return;
    } else {
      setPasswordError('');
    }
    try {
      
      const response = await axios.post('http://localhost:5050/api/auth/register', formData);
      console.log("response", response);
      setMessage(response.data.message);
      navigate('/confirm-email');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error during registration, check duplicates');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input type="text" name="login" placeholder="Login" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input
        type="password"
        name="passwordConfirmation"
        placeholder="Confirm Password"
        onChange={handleChange}
        required
      />
      <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
      <button type="submit" className="btn btn-primary btn-block btn-large">Register</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default RegisterForm;
