import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const FilterPosts = ({ posts = [] }) => {
    const [filters, setFilters] = useState({ category: "", startDate: "", endDate: "", status: "" });
    const [filteredPosts, setFilteredPosts] = useState(posts);

    const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    };
    const fetchFilteredPosts = async () => {
      try {
        const activeFilters = Object.fromEntries(
            Object.entries(filters)
        .filter(([_, value]) => value) // Filter out empty values
        .map(([key, value]) => {
          if (key === "startDate") key = "start_date"; // Ensure correct format for start_date
          if (key === "endDate") key = "end_date"; // Ensure correct format for end_date
          return [key, value];
        })
    );
    
        console.log("Active filters:", activeFilters);
        console.log(filters); // Log filters for debugging
        // const activeFilters = {
        //     start_date: "2024-11-28",
        //     end_date: "2024-12-02",
        //   };
        console.log(activeFilters);
          const response = await axios.get("http://localhost:5050/api/posts/postFiltering", {
            params: activeFilters,
            withCredentials: true,
          });
  
        console.log("Filtered posts:", response.data); // Log filtered posts for debugging
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("Error filtering posts:", error);
      }
    };
  
    const handleFilterSubmit = (e) => {
      e.preventDefault();
      fetchFilteredPosts(); // Call the API to fetch filtered posts
    };

  

  return (
    <div className="filter-posts-page">
      <h1>Filter Posts</h1>
      <form className="filter-form" onSubmit={handleFilterSubmit}>
        
        <div className="filter-options">
          <label htmlFor="category">Category:</label>
          <input
            id="category"
            name="category"
            type="text"
            value={filters.category}
            onChange={handleFilterChange}
          />

          <label htmlFor="start-date">Start Date:</label>
          <input
            id="start-date"
            name="startDate"
            type="date"
            value={filters.startDate}
            onChange={handleFilterChange}
          />

          <label htmlFor="end-date">End Date:</label>
          <input
            id="end-date"
            name="endDate"
            type="date"
            value={filters.endDate}
            onChange={handleFilterChange}
          />

          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" className="filter-btn">Apply Filters</button>
      </form>

      <h2>Filtered Results</h2>
      <ul className="posts-grid">
      {filteredPosts.map((post) => (
        <li key={post.id} className="post-card">
          <Link to={`/posts/${post.id}`}>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-snippet">{post.content.slice(0, 100)}...</p>
          </Link>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default FilterPosts;
