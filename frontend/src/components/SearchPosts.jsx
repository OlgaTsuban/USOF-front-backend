import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const SearchPosts = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || ""); // State for the search term
  const [searchResults, setSearchResults] = useState([]); // State for search results

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term state
  };

  useEffect(() => {
    if (searchTerm) {
      fetchSearchResults(searchTerm); // Fetch search results if searchTerm is available
    }
  }, [searchTerm]);

  const fetchSearchResults = async () => {
    try {
        console.log(searchTerm);
      const response = await axios.get("http://localhost:5050/api/posts/search?", {
        params: { name: searchTerm }, // Pass the search term as a query parameter
        withCredentials: true,
      });

      console.log("Search results:", response.data); // Log results for debugging
      setSearchResults(response.data); // Update search results state
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent form default submission behavior
    fetchSearchResults(); // Fetch search results from the backend
  };

  return (
    <div className="search-posts-page">
      <h1>Search Results for "{searchTerm}"</h1>
      {searchResults.length > 0 ? (
        <ul className="posts-grid">
          {searchResults.map((post) => (
            <li key={post.id} className="post-card">
              <Link to={`/posts/${post.id}`}>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-snippet">{post.content.slice(0, 100)}...</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default SearchPosts;