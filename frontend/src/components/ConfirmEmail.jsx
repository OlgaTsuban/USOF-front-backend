import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmEmail = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/login'); // Navigate to login page
  };

  return (
    <div className="confirm-email">
      <h1>Email Confirmation</h1>
      <p>Please check your email and follow the instructions to confirm your account.</p>
      <button onClick={handleNavigate} className="btn btn-primary">Go to Login</button>
    </div>
  );
};

export default ConfirmEmail;
