import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../styles/UserProfile.css';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [userData, setUserData] = useState({
    login: '',
    email: '',
    fullName: '',
    profile_picture: ''
  });
  const handleEditClick = () => {
    navigate(`/user/update/${user.id}`);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/api/users/${userId}`, { withCredentials: true });
        console.log(response);
        setUser(response.data);
        
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user details.");
      }
    };
    fetchUser();
  }, [userId]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle avatar upload
  const handleAvatarUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const response = await axios.patch(
        "http://localhost:5050/api/users/avatar", 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true // Ensure credentials are sent for authentication
        }
      );

      if (response.status === 200) {
        setUserData((prevState) => ({
          ...prevState,
          profile_picture: response.data.avatar
        }));
        alert("Avatar uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Error uploading avatar.");
    }
  };
  return (
    <div className="user-profile">
      <h1>{user.fullName || "User Profile"}</h1>
      {/* Display the current profile picture */}
      <div className="avatar-container">
        <img
          src={`http://localhost:5050/${user.profile_picture }`}
          alt="Profile Avatar"
          className="profile-avatar"
          onClick={() => document.getElementById("fileInput").click()} // Trigger file input click on image click
        />
        
        {/* Hidden file input for selecting a new image */}
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {/* Button to trigger avatar upload */}
      <button onClick={handleAvatarUpload}>Update Avatar</button>
      
      <div className="profile-info">
        <p><strong>Login:</strong> {user.login}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Full Name:</strong> {user.full_name || "N/A"}</p>
      </div>
      <button onClick={handleEditClick} className="edit-button">
        Edit Profile
      </button>
    </div>
  );
};

export default UserProfile;
