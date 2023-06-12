const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const checkAuth = require('../middlewares/checkAuth');


// User routes

router.get('/games/:userId', checkAuth,  UserController.userGames); // New
router.get('/profile/:userId', UserController.userProfile); //New
router.get('/search', checkAuth, UserController.searhUsers); //New

router.get('/auth/github', UserController.authGithub)
router.get("/auth/github/callback", UserController.authGithubCallback)
router.post('/register', UserController.register);
router.post('/login', UserController.login);


router.get('/logout', checkAuth, UserController.logout);
router.get('/mydata',checkAuth, UserController.userData);
router.get('/addGame/:gameId', checkAuth, UserController.addGame) // New
router.patch('/changePassword', checkAuth, UserController.changePW)
router.patch('/changeName', checkAuth, UserController.changeName)
router.patch('/changeDescription', checkAuth, UserController.changeDescription)
router.patch("/createPW",checkAuth, UserController.createPW)

router.get('/myavatar',checkAuth, UserController.myAvatar) // New
router.get('/balance', checkAuth, UserController.balance) // New
router.patch('/addBalance', checkAuth, UserController.addBalance) // New

router.delete("/deleteMyAccount",checkAuth, UserController.deleteMyAccount)


module.exports = router;
