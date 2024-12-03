import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = (user) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', categories: [] });
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/api/posts/${postId}`, { withCredentials: true });
        const postData = response.data.data;

        const response2 = await axios.get(`http://localhost:5050/api/posts/${postId}/categories`, { withCredentials: true });
        console.log("resp2", response2);
        setCategories(response2.data.data);
        console.log('cat', categories);
        // Check if the user is the author
        const userId = user.user.id; // Adjust based on your API
        console.log("user id", user.user.role)
        console.log("author id", postData)
        if (postData.author_id === userId || user.user.role == 'admin') {
          setPost({ title: postData.title, content: postData.content, categories: postData.categories });
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
        setIsAuthorized(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, parseInt(value)] : prev.filter((id) => id !== parseInt(value))
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(selectedCategories);
        console.log(post.title, post.content)
      await axios.patch(
        `http://localhost:5050/api/posts/${postId}`,
        { title: post.title, content: post.content, categories: selectedCategories},
        {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true 
          }
      );
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!isAuthorized) {
    return <p>You are not authorized to edit this post.</p>;
  }

  return (
    <div className="edit-post-container">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
        </div>
        <div>
          <label>Categories</label>
          <div>
            {categories.map((category) => (
              <label key={category.id}>
                <input
                  type="checkbox"
                  value={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onChange={handleCategoryChange}
                />
                {category.title}
              </label>
            ))}
          </div>
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
