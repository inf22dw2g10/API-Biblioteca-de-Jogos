const Comment = require('../models/Comment');

exports.getCommentsByGameId = async (req, res) => {
  try {
    const { gameId } = req.params;

    const comments = await Comment.findAll({ where: { GameId: gameId } });

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getCommentsByUserId = async (req, res) => {
  try {
    const { email } = req.params;

    const comments = await Comment.findAll({ where: { email: email } });

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.createComment = async (req, res) => {
  try {
    const { text, rating } = req.body;
    const { gameId } = req.params;
    const userId = req.user.id;
    
    if(rating >= 0 && rating <= 5)  {
      
      await Comment.create({ text, rating, date: new Date(), UserId: userId, GameId: gameId })
      res.status(201).json({ message: 'Comment created successfully' });
      
    }else{
      res.status(400).json({ message: 'Rating must be beetween 0 and 5' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
