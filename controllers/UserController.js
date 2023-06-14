const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../database');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Session = require('../models/Session');
const Game = require('../models/Game');
const { createAccessToken, createRefreshToken, createCookie } = require('../middlewares/createToken');
require('dotenv').config();
const axios = require('axios');


exports.myAvatar = async (req, res) => {
  const user = req.user;
  try{
    const userAvatar = await User.findByPk(req.user.id, {
      attributes: ['avatar']
    });
    res.status(200).json({ userAvatar });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while logging in.' });
  }
  
}
exports.userData = async (req, res) => {
  try {
    const user = req.user;

    const userData = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password', 'gitHubToken', 'balance','createdAt','updatedAt','games','admin'] }
    });
    res.status(200).json({ userData });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while logging in.' });
  }
};

exports.register = async (req, res) => {
  try {
    const checkEmail = await User.findOne({ where: { email: req.body.email } });
    if (!checkEmail) {
      const checkUsername = await User.findOne({ where: { username: req.body.username } });
      if(!checkUsername){
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });
        res.status(201).json({ username: 'User Created.' });
      }else {
        res.status(409).json({ username: 'Username already taken, try a different one' });
      }
    } else {
      res.status(409).json({ username: 'Email already registered' });
    }
  } catch (error) {
    res.status(400).json({ message: 'An error occurred while registering the user.' });
  }
};

exports.logout = async (req, res) => {
  try {
    const UserId = jwt.decode(req.cookies.token).id;
    const deleteSession = await Session.destroy({ where: { accessToken: req.cookies.token, UserId: UserId } });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while retrieving the user.' });
  }
};

exports.login = async (req, res) => {
  try {
    let user
    if(req.body.email == null){
      user = await User.findOne({ where: { username: req.body.username }});
    }else{
      user = await User.findOne({ where: { email: req.body.email }});
    }
    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }
    if (user.password) {
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }

      if (req.cookies.token) {
        const UserId = jwt.decode(req.cookies.token).id;
        const deleteSession = await Session.destroy({ where: { accessToken: req.cookies.token, UserId: UserId } });
        res.clearCookie('token');
      }

      const accessToken = createAccessToken(user.id, user.username , user.email,user.admin);
      const refreshToken = createRefreshToken(user.id, user.username , user.email,user.admin);

      const newSession = await Session.create({
        accessToken: accessToken,
        refreshToken: refreshToken,
        expirationDate: jwt.decode(refreshToken).exp * 1000,
        UserId: user.id,
      });

      createCookie(res, accessToken, jwt.decode(refreshToken).exp);
      res.status(200).json({ message: 'Logged In' });
    } else {
      res.status(401).json({ message: 'Utilizador está registado com outro método' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in.' });
  }
};

exports.authGithub = (req, res) => {
  try {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`;
    res.status(200).json({callback: githubAuthUrl});
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while retrieving the user.' });
  }
};

exports.authGithubCallback = async (req,res) => {
  try {
    // Get the authorization code from the query parameters
    const code = req.query.code;
    // Exchange the authorization code for an access token
    axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code
    })
    .then(function  (response) {
      const gitAccessToken = response.data.split("=")[1].split("&")[0]
      axios.get("https://api.github.com/user/emails", {headers: { Authorization: `Bearer ${gitAccessToken}` } })
      .then(async function (response) {

        if(req.cookies.token){
          const UserId = jwt.decode(req.cookies.token).id
          const deletSession = await Session.destroy({where: { accessToken: req.cookies.token }})
          res.clearCookie("token")
        }

        const userEmail = response.data[0].email 

        var user = await User.findOne({where:{ email : userEmail}})
        if(!user){    
          // Registar
          axios.get("https://api.github.com/user", {headers: { Authorization: `Bearer ${gitAccessToken}` } })
          .then(async function(response){
            var newUsername = response.data.login

            var newUser = await User.create({
              username: newUsername,
              email : userEmail,
              gitHubToken: gitAccessToken
            })
            

            const accessToken = createAccessToken(newUser.id, newUser.username , newUser.email, newUser.admin)
            const refreshToken = createRefreshToken(newUser.id, newUser.username , newUser.email, newUser.admin)
            
            const newSession = await Session.create({
              accessToken: accessToken,
              refreshToken: refreshToken,
              expirationDate: jwt.decode(refreshToken).exp*1000,
              UserId: newUser.id,
            })  

            createCookie(res, accessToken, jwt.decode(refreshToken).exp)
            res.status(201).redirect(`http://localhost:3000/`)


          }).catch(function(err){
            res.status(500).json({ message: err });
          });
        }else{
          //Login
          var existingUser = await User.update({
            gitHubToken:gitAccessToken
          },
          {where:{
            id: user.id
          }})

          const accessToken = createAccessToken(user.id, user.username , user.email, user.admin)
          const refreshToken = createRefreshToken(user.id, user.username , user.email, user.admin)
          
          const newSession = await Session.create({
            accessToken: accessToken,
            refreshToken: refreshToken,
            expirationDate: jwt.decode(refreshToken).exp*1000,
            UserId: user.id,
          })

          createCookie(res, accessToken, jwt.decode(refreshToken).exp)
          res.status(200).redirect(`http://localhost:3000/`)
        }
        
      }).catch(function(err){
        res.status(500).json({ message: err });
      });
    })
    .catch(function (error) {
      res.status(500).json({ message: err });
    });
    
  } catch (err) {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}

exports.changePW = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;

    const dbUser = await User.findByPk(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, dbUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid old password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update(
      { password: hashedPassword },
      { where: { id: user.id } }
    );

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving the user.' });
  }
};
exports.createPW = async (req, res) => {
  try {
    const user = req.user;
    const { newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update(
      { password: hashedPassword },
      { where: { id: user.id } }
    );

    return res.status(200).json({ message: 'Password created successfully' });

  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving the user.' });
  }
};

exports.changeName = async (req, res) => {
  try {
    const user = req.user;
    const newName = req.body.newName;

    if (newName) {
      await User.update(
        { username: newName },
        { where: { id: user.id } }
      );
      return res.status(200).json({ message: 'Name updated successfully' });
    } else {
      return res.status(400).json({ message: 'Error updating name' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving the user.' });
  }
};
exports.changeDescription = async (req, res) => {
  try {
    const user = req.user;
    const newDescription = req.body.newDescription;

    if (newDescription) {
      await User.update(
        { description: newDescription },
        { where: { id: user.id } }
      );
      return res.status(200).json({ message: 'Description updated successfully' });
    } else {
      return res.status(400).json({ message: 'Error updating description' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving the user.' });
  }
};

exports.deleteMyAccount = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.user.id } });
    res.clearCookie("token");
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving the user.' });
  }
};
exports.addGame = async (req, res) => {
  const user = req.user;
  const { gameId } = req.params;
  const gameIdInt = parseInt(gameId);

  try {
    const dbUser = await User.findByPk(user.id);
    const findGame = await Game.findByPk(gameIdInt);
    if (findGame) {
      const gamesArr = dbUser.games.games;

      if (gamesArr.includes(gameIdInt)) {
        return res.status(400).json({ message: 'Game already added' });
      }
      
      if(dbUser.dataValues.balance >= findGame.dataValues.price){
        gamesArr.push(gameIdInt);
        newJson = {"games": gamesArr}

        await User.update(
          { games: newJson, balance: dbUser.dataValues.balance - findGame.dataValues.price},{where:{id:user.id}}
        );
        
        return res.status(200).json({ message: 'User games updated' });
      }else{
        return res.status(400).json({ message: 'Not enough balance' });
      }
    } else {
      return res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving the user.' });
  }
};

exports.userGames = async (req, res) => {
  const { userId } = req.params;

  try {
    const dbUser = await User.findByPk(userId);
    const gamesArr = await Promise.all(
      dbUser.games.games.map(async (element) => {
        const findGame = await Game.findByPk(element);
        return findGame.dataValues;
      })
    );

    res.status(200).json({ games: gamesArr });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving the user.' });
  }
};

exports.userProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    let commentsArray = []
    const dbUser = await User.findByPk(userId);
    const gamesArr = await Promise.all(
      dbUser.games.games.map(async (element) => {
        const findGame = await Game.findByPk(element);
        return findGame.dataValues;
      })
    );
    const comments = await Comment.findAll({ where: { UserId: userId } });
    
    comments.forEach(comment => {
      commentsArray.push(comment.dataValues)
    });

    res.status(200).json({
      id: dbUser.dataValues.id,
      username: dbUser.dataValues.username,
      description: dbUser.dataValues.description,
      avatar: dbUser.dataValues.avatar,
      games: gamesArr,
      comments: commentsArray,
    });
    
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving the user.' });
  }
};
exports.balance = async (req,res)=> {
  const user = req.user
  try{
    const dbUser = await User.findByPk(user.id)

    res.status(200).json({balance: dbUser.dataValues.balance})

  }catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving the user.' });
  }
}
exports.addBalance = async (req,res)=> {
  const user = req.user
  const { depositValue } = req.body
  try{
    const dbUser = await User.findByPk(user.id)
    await dbUser.update({balance: dbUser.dataValues.balance + depositValue})
    

    res.status(200).json({message: 'Balance updated'})

  }catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving the user.' });
  }
}

exports.searhUsers = async (req, res) => {
  const {user} = req.query
  try {
    const users = await User.findAll({attributes: ['username', 'id'],where:{
      username: sequelize.where(sequelize.fn('LOWER', sequelize.col('username')), 'LIKE', '%' + user.toLowerCase() + '%')
    }});
    if (users.length !== 0) {
      res.status(200).json(users);
    } else {
      res.status(200).json();
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
