import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddComment = () => {
    const { postId } = useParams();
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content) {
            setError('Content is required.');
            return;
        }

        try {
            await axios.post(
                `http://localhost:5050/api/posts/${postId}/comments`,
                { content },
                { withCredentials: true }
            );
            navigate(`/posts/${postId}`);
        } catch (err) {
            console.error('Error adding comment:', err);
            setError(err.response?.data?.message || 'Failed to add comment.');
        }
    };

    return (
        <div>
            <h1>Add a Comment</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your comment here..."
                    rows={5}
                    cols={50}
                />
                <br />
                <button type="submit">Submit Comment</button>
            </form>
        </div>
    );
};

export default AddComment;
