const express = require('express');
const router = express.Router();
const GameController = require('../controllers/GameController');

router.get('/', GameController.getAllGames);
router.get('/:id', GameController.getGameById);
router.post('/', GameController.createGame);
router.put('/:id', GameController.updateGame);
router.patch('/:id', GameController.changePrice);
router.delete('/:id', GameController.deleteGame);

module.exports = router;
