const express = require('express');
const router = express.Router();
const GameController = require('../controllers/GameController');
const checkAuth = require('../middlewares/checkAuth');
const checkPerm = require('../middlewares/checkPerm');

router.get('/', GameController.getAllGames);
router.get('/:id', GameController.getGameById);
router.post('/',checkAuth, checkPerm, GameController.createGame);
router.put('/:id',checkAuth, checkPerm, GameController.updateGame);
router.patch('/:id',checkAuth, checkPerm, GameController.changePrice);
router.delete('/:id',checkAuth, checkPerm, GameController.deleteGame);

module.exports = router;
