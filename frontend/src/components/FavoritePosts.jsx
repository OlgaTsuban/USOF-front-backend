import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const FavoritePosts = ({ user }) => {
    const [favoritePosts, setFavoritePosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        totalPosts: 0,
        totalPages: 0,
        currentPage: 1,
        postsPerPage: 10,
    });

    const fetchFavoritePosts = async (page = 1) => {
        try {
            setLoading(true);
            setError(null);

            if (!user?.id) {
                setError('User is not logged in.');
                return;
            }

            const response = await axios.get(`http://localhost:5050/api/favorites`, {
                withCredentials: true, // Include session credentials
            });

            setFavoritePosts(response.data.posts);
            setPagination({
                ...pagination,
                totalPosts: response.data.pagination.totalPosts,
                totalPages: response.data.pagination.totalPages,
                currentPage: page,
            });
        } catch (err) {
            setError('Failed to load favorite posts. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavoritePosts(pagination.currentPage);
    }, [pagination.currentPage]);

    const handlePageChange = (page) => {
        setPagination({
            ...pagination,
            currentPage: page,
        });
    };

    if (loading) return <p>Loading favorite posts...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="favorite-posts">
            <h1>Favorite Posts</h1>
            {favoritePosts.length === 0 ? (
                <p>You have no favorite posts.</p>
            ) : (
                <ul>
                    {favoritePosts.map((post) => (
                        <li key={post.id} className="post-item">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <Link to={`/posts/${post.id}`}>View Post</Link>
                        </li>
                    ))}
                </ul>
            )}

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
                    <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default FavoritePosts;
