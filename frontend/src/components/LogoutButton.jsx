import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5050/api/auth/logout', {}, { withCredentials: true });
      alert(response.data.message);
      onLogout(); // Reset the user state to default
      navigate('/login'); // Redirect to login page
    } catch (error) {
      alert('Error during logout');
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;

