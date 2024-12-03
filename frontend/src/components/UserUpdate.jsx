import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

const UserUpdate = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    login: '',
    email: '',
    fullName: ''
  });

  useEffect(() => {
    // Fetch user data by ID to pre-fill the form
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/api/users/${userId}`, { withCredentials: true });
        console.log(response);
        const data = response.data; // Axios response body is already parsed as JSON
        setUserData({
          login: data.login,
          email: data.email,
          fullName: data.full_name
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.patch(
            `http://localhost:5050/api/users/${userId}`, 
            userData,
            {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true // Ensure credentials are sent for authentication
            }
          );
          if (response.status === 200) {
            navigate(`/profile/${userId}`); // Redirect to profile page after successful update
          } else {
            console.error('Error updating user:', response.data);
          }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  
  return (
    <div className="user-update">
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            id="login"
            name="login"
            value={userData.login}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={userData.fullName}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">Update Profile</button>
      </form>
    </div>
  );
};

export default UserUpdate;
