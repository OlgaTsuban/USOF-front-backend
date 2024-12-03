import React from 'react';
import LogoutButton from './LogoutButton';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const Header = ({ onSearch, user }) => {

  console.log(user);
  const [localUser, setLocalUser] = useState(user);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(localUser);
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible); // Toggle the menu visibility
  };

  /*useEffect(() => {
    if (!Array.isArray(user) || user.length === 0) {
      setLocalUser([
        {
          full_name: 'Default User',
          role: 'Guest',
          profile_picture: '/uploads/avatars/default.png',
          id: null,
        },
      ]);
      console.log(localUser);
    } else {
      console.log(localUser);
      setLocalUser(user);
    }
  }, [user]);*/
  

  // const [localUser, setLocalUser] = useState(
  //   user 
  //     ? user
  //     : [
  //         {
  //           full_name: 'Default User',
  //           role: 'Guest',
  //           profile_picture: '/uploads/avatars/default.png',
  //           id: null,
  //         },
  //       ]
  // );
  console.log("Current localUser state:", localUser.profile_picture);
  console.log("Current User state:", user);
  /*const [localUser, setLocalUser] = useState(user);*/
  const handleLogout = () => {
    setLocalUser(
      {
        login: 'DefaultUser',
        role: 'Guest',
        profile_picture: 'uploads/avatars/default-header.png',
        id: null,
      },
    );
  };

  const handleSearch = () => {
    console.log("search par", searchTerm);
    if (searchTerm.trim()) {
      navigate(`/search`, { state: { searchTerm } }); // Navigate to SearchPosts with searchTerm in state
    }
  };

  const navigate = useNavigate();
  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        {/* Service Name */}
        <h1 style={styles.serviceName} onClick={toggleMenu}>
          USOF
        </h1>
        
        {/* Search Bar */}
        <div style={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search post by name..."
            style={styles.searchInput}
            onChange={(e) => setSearchTerm(e.target.value)} // Handle search input
          />
           <button onClick={handleSearch} style={styles.searchButton}>
          Search
        </button>

        </div>
        
        {/* User Info and Logout Button */}
        {/* User Info and Logout Button */}
        <div style={styles.userInfo}>
        <span style={styles.userName}>{localUser.login}</span>
        <span style={styles.userRole}>{localUser.role}</span>
        <img
            src={`http://localhost:5050/${ localUser.profile_picture}`}
            alt="Avatar"
            style={styles.avatar}
            onClick={() => navigate(`/profile/${user.id || localUser[0].id}`)}
          /> 
          <LogoutButton onLogout={handleLogout} />
          </div>
      </div> 

      {/* Menu Section */}
      {isMenuVisible && (
        <div style={styles.menu}>
          <ul style={styles.menuList}>
            <li style={styles.menuItem} onClick={() => navigate('/')}>Home</li>
            <li style={styles.menuItem} onClick={() => navigate(`/profile/${user.id}`)}>Profile</li>
            <li style={styles.menuItem} onClick={() => navigate('/post-create')}>CreatePost</li>
            <li style={styles.menuItem} onClick={() => navigate('/subscribed-posts')}>Subscribtion</li>
            <li style={styles.menuItem} onClick={() => navigate('/favorites')}>Favorites</li>
            <li style={styles.menuItem} onClick={() => navigate('/categories')}>Category</li>
            <li style={styles.menuItem} onClick={() => navigate('/about')}>About</li>
            <li style={styles.menuItem} onClick={() => navigate('/login')}>Login</li>
          </ul>
        </div>
      )}
    </header>
  );
};


{/* <img
            src={`http://localhost:5050/${ localUser[0].profile_picture}`}
            alt="Avatar"
            style={styles.avatar}
            onClick={() => navigate(`/profile/${user[0]?.id || localUser[0].id}`)}
          /> */}


const styles = {
  header: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    padding: '4px 25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  serviceName: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginRight: '20px',
  },
  searchWrapper: {
    display: 'flex', // Use flex to align input and button in a row
    alignItems: 'center',
    flex: 1,
    maxWidth: '950px',
    gap: '10px', // Add spacing between the input and button
  },
  searchInput: {
    flex: 1, // Input takes available space
    padding: '8px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  searchButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginLeft: '20px',
  },
  userName: {
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: '14px',
    color: '#bdc3c7',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid #fff',
  },
  logoutButton: {
    backgroundColor: 'purple',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  menu: {
    position: 'absolute',
    top: '50px',
    left: '20px',
    backgroundColor: '#34495e',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  menuList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  menuItem: {
    padding: '10px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid #ccc',
    textAlign: 'left',
  },
  menuItemLast: {
    borderBottom: 'none', // No border for the last item
  },
};


export default Header;
