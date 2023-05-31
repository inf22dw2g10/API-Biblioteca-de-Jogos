const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const checkAuth = require('../middlewares/checkAuth');

// Comment routes

router.get('/:commentId', CommentController.getComment);
router.get('/game/:gameId', CommentController.getCommentsByGameId);
router.get('/user/:userId', CommentController.getCommentsByUserId);


router.post('/game/:gameId', checkAuth, CommentController.createComment);
router.put('/:commentId', checkAuth, CommentController.editComment);
router.delete('/:commentId', checkAuth, CommentController.deleteComment);


module.exports = router;