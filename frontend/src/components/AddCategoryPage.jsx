import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategoryPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5050/api/categories',
        { title, description },
        { withCredentials: true }
      );
      alert('Category added successfully!');
      navigate('/categories');
    } catch (err) {
      console.error('Error adding category:', err);
      alert('Failed to add category.');
    }
  };

  return (
    <div>
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
        </div>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategoryPage;
