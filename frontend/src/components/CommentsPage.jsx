import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CommentsPage = (user) => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [updatedContent, setUpdatedContent] = useState('');
  const [updatedActiveStatus, setUpdatedActiveStatus] = useState(true); // Assuming active status is a boolean
  const [likes, setLikes] = useState({});
const [dislikes, setDislikes] = useState({});

  const navigate = useNavigate();

  const fetchLikesDislikes = async () => {
    try {
      const tempLikes = {};
      const tempDislikes = {};
  
      const updatedComments = await Promise.all(
        comments.map(async (comment) => {
          const likesResponse = await axios.get(
            `http://localhost:5050/api/comments/${comment.id}/like`,
            { withCredentials: true }
          );
          console.log(likesResponse);
          //const subscribedUsers = response.data.subscribedUsers || [];
           // Default to empty array if the response data is not an array
        const likesData = Array.isArray(likesResponse.data) ? likesResponse.data : [];
        console.log(likesData);
          //const likesData = likesResponse.data ;
          const likesCount = likesData.filter((like) => like.type === 'like').length;
          const dislikesCount = likesData.filter((like) => like.type === 'dislike').length;
  
          tempLikes[comment.id] = likesCount;
          tempDislikes[comment.id] = dislikesCount;
  
          return comment;
          
        })
      );
  
      setLikes(tempLikes);
      setDislikes(tempDislikes);
      setComments(updatedComments);
    } catch (err) {
      console.error('Error fetching likes/dislikes:', err);
    }
  };

  useEffect(() => {
    
    
    const fetchCommentsWithAuthors = async () => {
      try {
        // Fetch comments for the post
        const response = await axios.get(`http://localhost:5050/api/posts/${postId}/comments`, { withCredentials: true });
        const commentsData = response.data.data;

        // Fetch author details for each comment
        const commentsWithAuthors = await Promise.all(
          commentsData.map(async (comment) => {
            try {
                console.log(comment);
              const authorResponse = await axios.get(
                `http://localhost:5050/api/users/${comment.
                    author_id}`, 
                { withCredentials: true }
              );
              console.log('author', authorResponse.data.full_name);
              return { ...comment, author: authorResponse.data.full_name }; // Assuming the API returns the author's name as `name`
            } catch (err) {
              console.error(`Error fetching author for comment ID ${comment.id}:`, err);
              return { ...comment, author: 'Unknown' };
            }
          })
        );

        setComments(commentsWithAuthors);
      } catch (err) {
        console.error('Error fetching comments:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCommentsWithAuthors();
  }, [postId]);

  useEffect(() => {
    if (comments.length > 0) {
      fetchLikesDislikes();
    }
  }, [comments]);


  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setUpdatedContent(comment.content);
    setUpdatedActiveStatus(comment.active);
  };

  const handleLikeDislike = async (commentId, type) => {
    try {
      await axios.post(
        `http://localhost:5050/api/comments/${commentId}/like`,
        { type },
        { withCredentials: true }
      );
  
      if (type === 'like') {
        setLikes((prev) => ({ ...prev, [commentId]: (prev[commentId] || 0) + 1 }));
      } else if (type === 'dislike') {
        setDislikes((prev) => ({ ...prev, [commentId]: (prev[commentId] || 0) + 1 }));
      }
    } catch (err) {
      console.error('Error liking/disliking comment:', err);
    }
  };
  

  const handleUpdateComment = async (comment) => {
    try {
      console.log(editingCommentId);
      console.log("user", user.user);
      if ( user.user.id !== comment.author_id) {
        //alert('Permission denied: You cannot update this comment.');
        navigate('/');
      } else {
      const response = await axios.patch(
        `http://localhost:5050/api/comments/${editingCommentId}`, 
        { content: updatedContent }, 
        { withCredentials: true }
      );
      alert('Comment updated successfully');
      // Update the local state with the new comment data
      setComments(comments.map((comment) =>
        comment.id === editingCommentId 
          ? { ...comment, content: updatedContent }
          : comment
      ));
      setEditingCommentId(null); 
    }
    } catch (err) {
      console.error('Error updating comment:', err);
      alert('Error updating comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/comments/${commentId}`,
        { withCredentials: true }
      );
      alert('Comment deleted successfully');
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert('Error deleting comment. Make sure you have permission.');
    }
  };

  if (loading) {
    return <p>Loading comments...</p>;
  }

  

  console.log(comments);
  return (
    <div className="comments-page">
      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.content}</p>
            <p>
              <strong>Author:</strong> {comment.author}
            </p>
            <p>
              <strong>Date:</strong> {new Date(comment.created_at).toLocaleDateString()}
            </p>
            <div className="comment-actions">
              <button onClick={() => handleLikeDislike(comment.id, 'like')}>👍 Like ({likes[comment.id] || 0})</button>
              <button onClick={() => handleLikeDislike(comment.id, 'dislike')}>👎 Dislike ({dislikes[comment.id] || 0})</button>
              <button onClick={() => handleDeleteComment(comment.id)}>🗑️ Delete</button>
            
            </div>
            
            {editingCommentId !== comment.id ? (
              <button onClick={() => handleEditClick(comment)}>Edit</button>
            ) : (
              <div className="edit-comment-form">
                <textarea 
                  value={updatedContent} 
                  onChange={(e) => setUpdatedContent(e.target.value)} 
                />
                <div>
                  <label>
                    Active:
                    <input 
                      type="checkbox" 
                      checked={updatedActiveStatus} 
                      onChange={(e) => setUpdatedActiveStatus(e.target.checked)} 
                    />
                  </label>
                </div>
                <button onClick={() => handleUpdateComment(comment)}>Save</button>
                <button onClick={() => setEditingCommentId(null)}>Cancel</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentsPage;
