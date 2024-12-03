import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PostCreate.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/categories', {
          withCredentials: true,
        });
        console.log(response.data);
        // Check if the response structure differs
        setCategories(response.data); 
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || selectedCategories.length === 0) {
      setError('Title, content, and at least one category are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    selectedCategories.forEach((categoryId) => formData.append('categories[]', categoryId)); // Append multiple category IDs
    if (image) {
        formData.append('image', image);
    }


    try {
      const response = await axios.post('http://localhost:5050/api/posts', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        // Redirect to the newly created post or posts list
        navigate(`/posts/${response.data.postId}`);
      }
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    console.log("Selected Category ID:", selectedCategoryId);
    
  };
  

  return (
    <div className="create-post-container">
      <h1>Create a New Post</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
  <label>Select Categories:</label>
  {Array.isArray(categories) && categories.length > 0 ? (
    categories.map((category) => (
      <div key={category.id}>
        <label>
          <input
            type="checkbox"
            value={category.id}
            onChange={(e) => {
              const { value, checked } = e.target;
              setSelectedCategories((prev) =>
                checked
                  ? [...prev, parseInt(value)]
                  : prev.filter((id) => id !== parseInt(value))
              );
            }}
          />
          {category.title}
        </label>
      </div>
    ))
  ) : (
    <p>No categories available</p>
  )}
</div>
        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="submit-button">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
