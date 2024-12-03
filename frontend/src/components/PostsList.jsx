import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/PostsList.css';


const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('likes'); // Default sorting parameter
  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    endDate: '',
    status: '',
  });
  const [filteredPosts, setFilteredPosts] = useState([]);
  const pageSize = 10;

  const fetchPosts = async (page, sort) => {
    try {
      console.log(sort);
      //const response = await axios.get(`http://localhost:5050/api/posts?page=${page}&pageSize=${pageSize}`, { withCredentials: true });
      const response = await axios.get(
        `http://localhost:5050/api/posts?page=${page}&pageSize=${pageSize}&sort=${sort}`,
        { withCredentials: true }
      );
      console.log('Fetched posts:', response.data.data);
      setPosts(response.data.data);
      console.log('Pagination details:', response.data.pagination);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage, sortBy);
  }, [currentPage, sortBy]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSortChange = (e) => {
    setSortBy(e.target.value); // Update sortBy state when the user selects a different option
  };

  const fetchFilteredPosts = async () => {
    try {
      console.log(filters);
      const response = await axios.get('http://localhost:5050/api/posts/postFiltering', {
        params: filters,
        withCredentials: true,
      });

      console.log('Filtered posts:', response.data);
      setFilteredPosts(response.data);
    } catch (error) {
      console.error('Error filtering posts:', error);
    }
  };
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle filter submit
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchFilteredPosts();
  };


  return (
    <div className="posts-list">
  <h1>All Posts</h1>
  <Link to="/filter-posts" className="filter-link">
        Filter Posts
      </Link>
  
  

  {/* Sort Options */}
  <div className="sort-options">
    <label htmlFor="sort-by">Sort by:</label>
    <select id="sort-by" value={sortBy} onChange={handleSortChange}>
      <option value="likes">Likes</option>
      <option value="date">Date</option>
    </select>
  </div>

  {/* Posts Grid */}
  <ul className="posts-grid">
    {posts.map((post) => (
      <li key={post.id} className="post-card">
        <Link to={`/posts/${post.id}`}>
          <h2 className="post-title">{post.title}</h2>
          <p className="post-snippet">{post.content.slice(0, 100)}...</p>
          
        </Link>
      </li>
    ))}
  </ul>

  {/* Pagination */}
  <div className="pagination">
    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
      >
        {page}
      </button>
    ))}
  </div>
</div>

  );
};

export default PostsList;
