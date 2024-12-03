import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const { resetToken } = useParams(); // Extract the reset token from the URL
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Optional: You can add a check to validate the reset token here
  }, [resetToken]);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5050/api/auth/password-reset/${resetToken}`,
        { new_password: newPassword }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>New Password:</h3>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>

      {/* Display success or error messages */}
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      
    </div>
  );
};

export default ResetPassword;
