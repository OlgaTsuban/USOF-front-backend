import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/PostDetails.css';
import { Link } from 'react-router-dom';
import confetti from "https://esm.run/canvas-confetti@1";



const PostDetails = (user) => {
  const { postId } = useParams(); 
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentReaction, setCurrentReaction] = useState(null);
  const [lockStatus, setLockStatus] = useState();
  const [canToggleLock, setCanToggleLock] = useState(false); 
  
  const navigate = useNavigate();
  const fetchPost = async () => {
    try {
      // Fetch a single post
      const response = await axios.get(`http://localhost:5050/api/posts/${postId}`, { withCredentials: true });
      const postData = response.data.data; // Assuming this is a single post object
  
      // Fetch the author of the post
      const authorResponse = await axios.get(
        `http://localhost:5050/api/users/${postData.author_id}`,
        { withCredentials: true }
      );
      setAuthor(authorResponse.data);
  
      // Fetch likes for the post
      const likesResponse = await axios.get(
        `http://localhost:5050/api/posts/${postData.id}/likes`,
        { withCredentials: true }
      );
  
      // Check if likesResponse.data is an array and count likes and dislikes
      if (Array.isArray(likesResponse.data.data)) {
        const likes = likesResponse.data.data.filter((like) => like.type === 'like').length;
        const dislikes = likesResponse.data.data.filter((like) => like.type === 'dislike').length;
  
        // Set the post data with author and like counts
        setPost({
          ...postData,
          author: authorResponse.data.full_name,
          likesCount: likes,
          dislikesCount: dislikes,
        });
  
        const isOwner = postData.author_id === user.user.id;
        const isAdmin = user.user.role === 'admin';
        setCanToggleLock(isOwner || isAdmin);
        // Set the likes and dislikes state
        setLikes(likes);
        setDislikes(dislikes);
        console.log(postData);
        setLockStatus(postData.locked);
      } else {
        console.error('Invalid format for likes response:', likesResponse.data);
      }
  
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };
  
  const toggleLock = async () => {
    try {
      // Toggle lock status
      const newLockStatus = !lockStatus; 
      console.log("stat", newLockStatus);
      const response = await axios.patch(
        `http://localhost:5050/api/posts/${postId}/lock`,
        { lock: newLockStatus }, // Send the new lock status
        { withCredentials: true } // Ensure credentials are included
      );

      alert(response.data.message); // Show success message
      setLockStatus(newLockStatus); // Update lock status in the UI
    } catch (err) {
      console.error('Error toggling lock status:', err);
      alert(err.response?.data?.message || 'Failed to toggle lock status.');
    }
  };
  const checkSubscriptionStatus = async () => {
    try {
        const response = await axios.get(`http://localhost:5050/api/posts/${postId}/subscribed-posts`, { withCredentials: true });
        console.log(response);
        const subscribedUsers = response.data.subscribedUsers || [];
        const userId = user.user.id;

        // Check if the current user ID is in the subscribed users array
        const isSubscribedToCurrentPost = subscribedUsers.includes(userId);
        setIsSubscribed(isSubscribedToCurrentPost);
    } catch (err) {
        console.error('Error checking subscription status:', err);
    }
  };
  const checkIfFavorited = async () => {
    try {
        const response = await axios.get(
            `http://localhost:5050/api/favorites`,
            { withCredentials: true }
        );
        console.log(response.data);
        console.log(response.data.posts);

        const postIdToCheck = Number(postId);
        console.log(postId);
        const isPostFavorited = response.data.posts.some(post => post.id === postIdToCheck);
        console.log(isFavorited);
    setIsFavorited(isPostFavorited); 
    } catch (err) {
        console.error('Error checking favorite status:', err);
    }
}; 

const fetchReaction = async () => {
  try {
    console.log("HELLLOOOOO");
    const response = await axios.get(
      `http://localhost:5050/api/posts/${postId}/likes`,
      { withCredentials: true }
    );
    console.log('User object:', user);
    console.log('User ID:', user.user.id);
    console.log('response ID:', response.data.data);


    const userReaction = response.data.data.find(
      (like) => like.id === user.user.id // Replace `user.id` with the correct variable for the logged-in user's ID
    );
    console.log("userRec", userReaction);
    // Set the current reaction type if the user has a reaction
    setCurrentReaction(userReaction ? userReaction.type : null); // Set to 'like', 'dislike', or null
  } catch (err) {
    console.error('Error fetching reaction:', err);
  }
};
  useEffect(() => {
    fetchPost();
    checkSubscriptionStatus();
    checkIfFavorited();
  
    fetchReaction();
  }, [postId, user]);

  if (!post) {
    return <p>Loading post details...</p>;
  }

  if (!author) {
    return <p>Loading author details...</p>;
  }


const handleSubscribe = async () => {
    try {
      console.log(postId)
        await axios.post(`http://localhost:5050/api/posts/${postId}/subcribe`, {}, { withCredentials: true });
        setIsSubscribed(true);
        alert('Subscribed successfully!');
    } catch (err) {
        console.error('Error subscribing to post:', err);
        if (err.response && err.response.status === 400) {
          alert(err.response.data.message || 'Already subscribed.');
      } else {
          alert('Failed to subscribe.');
      }
    }
};

const handleUnsubscribe = async () => {
  try {
      await axios.post(`http://localhost:5050/api/posts/${postId}/unsubcribe`, {}, { withCredentials: true });
      setIsSubscribed(false);
      alert('Unsubscribed successfully!');
  } catch (err) {
      console.error('Error unsubscribing from post:', err);
  }
};

const handleLikeDislike = async (type) => {
  try {
    console.log("currreact", currentReaction);
    console.log("type", type)
    if (currentReaction === type) {
      // If the user clicks the same reaction, delete it
      await axios.delete(
        `http://localhost:5050/api/posts/${postId}/like`,
        { withCredentials: true }
      );

      alert('Reaction removed successfully!');
      setCurrentReaction(null); // Reset reaction state

      // Update counts on the frontend
      if (type === 'like') {
        setLikes(likes - 1);
      } else if (type === 'dislike') {
        setDislikes(dislikes - 1);
      }
    } else {
      // Otherwise, send a new like/dislike request
      console.log("type", type);
      await axios.post(
        `http://localhost:5050/api/posts/${postId}/like`,
        { type },
        { withCredentials: true }
      );

      confetti({
        particleCount: 150,
        spread: 60,
      });

      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!`);
      setCurrentReaction(type); // Update reaction state

      // Update counts on the frontend
      if (type === 'like') {
        setLikes(likes + 1);
        if (currentReaction === 'dislike') setDislikes(dislikes - 1); // Adjust dislikes if switching
      } else if (type === 'dislike') {
        setDislikes(dislikes + 1);
        if (currentReaction === 'like') setLikes(likes - 1); // Adjust likes if switching
      }
    }
  } catch (err) {
    console.error('Error handling like/dislike:', err);
    alert(err.response?.data?.message || 'Failed to process your request.');
  }
};


  const handleAddFavorite = async () => {
    try {
        await axios.post(`http://localhost:5050/api/favorites/${post.id}`, {}, { withCredentials: true });
        setIsFavorited(true);
        alert('Post added to favorites!');
    } catch (err) {
        console.error('Error adding post to favorites:', err);
    }
};

const handleRemoveFavorite = async () => {
    try {
        await axios.delete(`http://localhost:5050/api/favorites/${post.id}`,  { withCredentials: true });
        setIsFavorited(false);
        alert('Post removed from favorites!');
    } catch (err) {
        console.error('Error removing post from favorites:', err);
    }
};
  const handleEdit = () => {
    navigate(`/posts/${postId}/edit`);
  };

  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5050/api/posts/${post.id}`,
          { withCredentials: true } 
        );
        alert(response.data.message); // Show success message
        // Redirect or refresh the page after successful deletion
        window.location.href = "/";
      } catch (err) {
        console.error("Error deleting post:", err);
        alert(err.response?.data?.message || "Failed to delete the post.");
      }
    }
  };
  

  return (
    <div className="post-container">
      <div className="post-details">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>
          <strong>Author:</strong> {author.full_name}
        </p>
        <img
          src={`http://localhost:5050/uploads/posts/${post.images}`}
          alt="No photo"
        />
        <p className="date">
          <strong>Date:</strong> {new Date(post.created_at).toLocaleDateString()}
        </p>
        <div className="post-stats">
          <p><strong>Likes:</strong> {likes}</p>
          <p><strong>Dislikes:</strong> {dislikes}</p>
        </div>
        <div className="like-buttons">
          <button className="button" onClick={() => handleLikeDislike('like')}>
            <span>👍</span>
            Like
          </button>
          <button className="button" onClick={() => handleLikeDislike('dislike')}>
            <span>👎</span>
            Dislike
          </button>
          <Link to={`/posts/${post.id}/add-comment`} className="add-comment-link">
            Add Comment
          </Link>


        </div>
        <Link to={`/posts/${post.id}/comments`} className="comments-link">View Comments</Link>
        <button onClick={handleEdit} className="edit-button">Edit Post</button>
        <button onClick={handleDeletePost} className="delete-button">
        Delete Post
      </button>
      <div>
      {canToggleLock && (
        <button onClick={toggleLock} className={`lock-btn ${lockStatus ? 'locked' : 'unlocked'}`}>
          {lockStatus ? 'Unlock Post' : 'Lock Post'}
        </button>
      )}
    </div>
        <div className="subscription-buttons">
                {isSubscribed ? (
                    <button onClick={handleUnsubscribe}>Unsubscribe</button>
                ) : (
                    <button onClick={handleSubscribe}>Subscribe</button>
                )}
            </div>
                {/* Add/Remove from Favorites Buttons */}
      <div className="favorite-buttons">
                {isFavorited ? (
                    <button onClick={handleRemoveFavorite} className="remove-favorite">Remove from Favorites</button>
                ) : (
                    <button onClick={handleAddFavorite} className="add-favorite">Add to Favorites</button>
                )}
            </div>
      </div>

    </div>
  );
};

export default PostDetails;