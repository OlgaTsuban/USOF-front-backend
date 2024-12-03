const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/authMiddleware');
const postController = require('../controllers/postController');
const subscribeController = require('../controllers/subscriptionsController');
const pool = require('../config/db');


// Public - Get all posts with paginatio
router.get('/', isAuthenticated, postController.getAllPosts);
// sorting - filtering
router.get('/postSorting', postController.getPostsSort);
router.get('/postFiltering', postController.getFilteredPosts);

router.get('/subscribed-posts',isAuthenticated, subscribeController.getSubscribedPostsByUser);
router.get('/search',isAuthenticated, async (req, res) => {
    const { name } = req.query; // Get the search term from query parameters

    if (!name) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    try {
        const posts = await pool.query(
            'SELECT * FROM posts WHERE title LIKE ?',
            [`%${name}%`]
        );
        res.status(200).json(posts[0]); 
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:post_id',isAuthenticated, postController.getPostById);
router.get('/:post_id/comments',isAuthenticated, postController.getCommentsByPostId);
router.post('/:post_id/comments',isAuthenticated, postController.createComment);

router.post('/:post_id/subcribe',isAuthenticated, subscribeController.subscribe);
router.post('/:post_id/unsubcribe',isAuthenticated, subscribeController.unsubscribe);
router.get('/subscribed-posts',isAuthenticated, subscribeController.getSubscribedPostsByUser);
router.get('/:post_id/subscribed-posts',isAuthenticated, subscribeController.getSubscribedUsersForPost);

router.get('/:post_id/categories',isAuthenticated, postController.getCategoriesByPostId);
router.get('/:post_id/likes', isAuthenticated, postController.getLikesByPostId);
router.post('/', isAuthenticated, postController.createPost);
router.post('/:post_id/like',isAuthenticated, postController.createLike);
router.patch('/:post_id',isAuthenticated, postController.updatePost);
router.delete('/:post_id', isAuthenticated, postController.deletePost);
router.delete('/:post_id/like', isAuthenticated, postController.deleteLike);
router.patch('/:post_id/lock',isAuthenticated, postController.lockPostById);



module.exports = router;