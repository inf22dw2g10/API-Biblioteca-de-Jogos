const express = require('express');
const router = express.Router();
const GameController = require('../controllers/GameController');
const checkAuth = require('../middlewares/checkAuth');
const checkPerm = require('../middlewares/checkPerm');

//Game routes

router.get('/', GameController.getAllGames);
router.get('/search', GameController.searhGames);
router.get('/:id', GameController.getGameById);


// Necessita de permissões de administrador
router.post('/',checkAuth, checkPerm, GameController.createGame);
router.put('/:id',checkAuth, checkPerm, GameController.updateGame);
router.delete('/:id',checkAuth, checkPerm, GameController.deleteGame);

module.exports = router;
