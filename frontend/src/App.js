import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Importing the necessary components
import { useState } from 'react'; // Add useState here

import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Header from './components/Header';
import ResetPassword from './components/ResetPassword';
import RequestResetPassword from './components/RequestResetPassword';
import PostsList from './components/PostsList';
import PostDetails from './components/PostDetails';
import CommentsPage from './components/CommentsPage';
import CreatePost from './components/CreatePost';
import UserProfile from './components/UserProfile';
import UserUpdate from './components/UserUpdate';
import About from './components/About';
import EditPost from './components/EditPost';
import ConfirmEmail from './components/ConfirmEmail';
import AddComment from './components/AddComment';
import SubscribedPosts from './components/SubscribedPosts';
import FilterPosts from './components/FilterPosts';
import CategoryManagementPage from './components/CategoryManagementPage';
import AddCategoryPage from './components/AddCategoryPage';
import SearchPosts from './components/SearchPosts';
import FavoritePosts from './components/FavoritePosts';


function App() {
  /*const [user, setUser] = useState(null); // State to store logged-in user info

  const handleLogin = (userData) => {
    // This function will be called after successful login
    console.log("Logged in user:", userData);
    setUser(userData);
  };*/

  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage if available
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  
  const handleSearch = (query) => {
    console.log('Search query:', query); // Handle search functionality here
  };

  return (
    <Router>
      <div className="App">
        {/* Conditionally render the Header only if user is logged in */}
        {user && <Header onSearch={handleSearch} user={user} />}

        <Routes>
          {/* Pass handleLogin to LoginForm */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/password-reset" element={<RequestResetPassword />} />
          <Route path="/password-reset/:resetToken" element={<ResetPassword />} />
          <Route path="/" element={<PostsList />} />
          <Route path="/posts/:postId" element={<PostDetails user={user}/>} />
          <Route path="/posts/:postId/comments" element={<CommentsPage user={user} />} />
          <Route path="/post-create" element={<CreatePost />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/user/update/:userId" element={<UserUpdate />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts/:postId/edit" element={<EditPost user={user} />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/posts/:postId/add-comment" element={<AddComment />} />
          <Route path="/subscribed-posts" element={<SubscribedPosts user={user}/>} />
          <Route path="/filter-posts" element={<FilterPosts />} />
          <Route path="/categories" element={<CategoryManagementPage user={user}/>} />
          <Route path="/categories/new" element={<AddCategoryPage />} />
          <Route path="/search" element={<SearchPosts />} />
          <Route path="/favorites" element={<FavoritePosts user={user}/>} />
        </Routes>
      </div>
    </Router>
  );
}

/*function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}*/

export default App;