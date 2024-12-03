import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Category.css';
const CategoryManagementPage = (user) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({ title: '', description: '' });
  const [editCategory, setEditCategory] = useState(null);
  const [updatedCategory, setUpdatedCategory] = useState({ title: '', description: '' });

  const fetchCategories = async () => {
    try {
        console.log(user.user.role);
      const response = await axios.get('http://localhost:5050/api/categories', { withCredentials: true });
      setCategories(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5050/api/categories',
        newCategory,
        { withCredentials: true }
      );
      alert('Category created successfully');
      setNewCategory({ title: '', description: '' });
      fetchCategories(); // Refresh the list
    } catch (err) {
      console.error('Error creating category:', err);
      alert('Error creating category');
    }
  };

  const handleEditClick = (category) => {
    setEditCategory(category);
    setUpdatedCategory({ title: category.title, description: category.description });
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/categories/${editCategory.id}`,
        updatedCategory,
        { withCredentials: true }
      );
      alert('Category updated successfully');
      setEditCategory(null);
      fetchCategories();
    } catch (err) {
      console.error('Error updating category:', err);
      alert('Error updating category');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/categories/${categoryId}`,
        { withCredentials: true }
      );
      alert('Category deleted successfully');
      fetchCategories(); // Refresh the list
    } catch (err) {
      console.error('Error deleting category:', err);
      alert('Error deleting category');
    }
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="category-management-page">
      <h1>Category Management</h1>
  
      {/* Category List */}
      <div className="category-list">
        <h2>Categories</h2>
        {user.user.role === 'admin' && ( // Only admins can see the "Add New Category" link
          <nav>
            <Link to="/categories/new">Add New Category</Link>
          </nav>
        )}
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            {editCategory?.id === category.id ? (
              <div className="edit-category">
                <input
                  type="text"
                  value={updatedCategory.title}
                  onChange={(e) => setUpdatedCategory({ ...updatedCategory, title: e.target.value })}
                />
                <textarea
                  value={updatedCategory.description}
                  onChange={(e) => setUpdatedCategory({ ...updatedCategory, description: e.target.value })}
                />
                <button onClick={handleUpdateCategory}>Save</button>
                <button onClick={() => setEditCategory(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                {/* Conditionally Render Edit/Delete Buttons */}
                {user.user.role === 'admin' && (
                  <>
                    <button onClick={() => handleEditClick(category)}>Edit</button>
                    <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};  
export default CategoryManagementPage;
