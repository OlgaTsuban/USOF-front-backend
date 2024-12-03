import React, { useState } from 'react';
import axios from 'axios';

const RequestResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5050/api/auth/password-reset', { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Request Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Email Address:</h3>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default RequestResetPassword;
