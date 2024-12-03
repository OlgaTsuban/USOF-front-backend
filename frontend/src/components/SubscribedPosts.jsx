import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/SubscribedPosts.css';

const SubscribedPosts = (user) => {
    const [subscribedPosts, setSubscribedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSubscribedPosts = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log(user.user?.id);
            const user_id = user.user?.id; 
            console.log(user_id);
            if (!user_id) {
                setError('User is not logged in.');
                return;
            }

            const response = await axios.get(`http://localhost:5050/api/posts/subscribed-posts`, {
                withCredentials: true, // Include session credentials
            });

            setSubscribedPosts(response.data.subscribedPosts);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('You are not subscribed to any posts.');
            } else {
                setError('Failed to load subscribed posts. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchSubscribedPosts();
    }, []);

    if (loading) return <p>Loading subscribed posts...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="subscribed-posts">
            <h1>Subscribed Posts</h1>
            {subscribedPosts.length === 0 ? (
                <p>You are not subscribed to any posts.</p>
            ) : (
                <ul>
                    {subscribedPosts.map((post) => (
                        <li key={post.id} className="post-item">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <Link to={`/posts/${post.id}`}>View Post</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SubscribedPosts;
