const Comment = require('../models/Comment');


exports.getComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId)

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getCommentsByGameId = async (req, res) => {
  try {
    const { gameId } = req.params;

    const comments = await Comment.findAll({ where: { GameId: gameId } });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getCommentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params

    const comments = await Comment.findAll({ where: { UserId: userId } });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.editComment = async (req, res) => {
  try{
    const { text, rating } = req.body
    const { commentId } = req.params
    const userId = req.user.id

    if(rating >= 0 && rating <= 5)  {

      const targetComment = await Comment.findOne({where:{ id: commentId, UserId:userId  }})
      if(targetComment){
        const editedComment = await Comment.update({text: text, rating:rating}, {where:  { id: commentId, UserId: userId}})
        res.status(200).json({ message: 'Comment updated successfully' });
      }else{
        res.status(400).json({message:"This is not your Comment"})
      }
    }else{
      res.status(400).json({ message: 'Rating must be beetween 0 and 5' });
    }
  }catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }

}

exports.createComment = async (req, res) => {
  try {
    const { text, rating } = req.body;
    const { gameId } = req.params;
    const userId = req.user.id;
    
    if(rating >= 0 && rating <= 5)  {

      const findComment = await Comment.findOne({where:{ GameId: gameId, UserId: userId}})

      if(findComment){
        res.status(400).json({ message: 'Too many comments' });
      }else{
        await Comment.create({ text, rating, UserId: userId, GameId: gameId })
        res.status(201).json({ message: 'Comment created successfully' });
      }

    }else{
      res.status(400).json({ message: 'Rating must be beetween 0 and 5' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;
    
    const comment = await Comment.findOne({where:{ id: commentId, UserId: userId}})

    if(!comment){
      res.status(400).json({ message: 'Comment not found' });
    }else{
      await Comment.destroy({where:{id : commentId}})
      res.status(200).json({ message: 'Comment deleted' });
    }

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};