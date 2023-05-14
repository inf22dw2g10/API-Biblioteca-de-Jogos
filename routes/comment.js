const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const checkAuth = require('../middlewares/checkAuth');

router.get('/game/:gameId', CommentController.getCommentsByGameId);
router.get('/user/:userId', CommentController.getCommentsByUserId);
router.post('/game/:gameId', checkAuth, CommentController.createComment);

module.exports = router;

