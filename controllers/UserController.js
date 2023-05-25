const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Session = require('../models/Session');
const Game = require('../models/Game');
const { createAccessToken, createRefreshToken, createCookie } = require('../middlewares/createToken');
require('dotenv').config();
const axios = require('axios');

exports.userData = async (req, res) => {
  try {
    const user = req.user;

    const userData = await User.findByPk(req.user.id);
    const userComments = await Comment.findAll({
      where: {
        UserId: req.user.id,
      },
    });

    res.status(200).json({ userData, userComments });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while logging in.' });
  }
};

exports.register = async (req, res) => {
  try {
    const checkUser = await User.findOne({ where: { email: req.body.email } });
    if (!checkUser) {
      const saltRounds = 10; // Number of rounds for password hashing
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      res.status(201).json({ username: 'User Created.' });
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
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }
    if (user.password) {
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      if (req.cookies.token) {
        const UserId = jwt.decode(req.cookies.token).id;
        const deleteSession = await Session.destroy({ where: { accessToken: req.cookies.token, UserId: UserId } });
        res.clearCookie('token');
      }

      const accessToken = createAccessToken(user.id, user.username, user.email);
      const refreshToken = createRefreshToken(user.id, user.username, user.email);

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
    res.redirect(githubAuthUrl);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while retrieving the user.' });
  }
};

exports.authGithubCallback = async (req, res) => {
  try {
    const code = req.query.code;

    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
    });

    const gitAccessToken = response.data.split("=")[1].split("&")[0];

    const emailResponse = await axios.get("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${gitAccessToken}` },
    });

    if (req.cookies.token) {
      const UserId = jwt.decode(req.cookies.token).id;
      const deleteSession = await Session.destroy({ where: { accessToken: req.cookies.token } });
      res.clearCookie("token");
    }

    const userEmail = emailResponse.data[0].email;

    let user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      const gitUserResponse = await axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${gitAccessToken}` },
      });

      const newUsername = gitUserResponse.data.login;

      const newUser = await User.create({
        username: newUsername,
        email: userEmail,
        gitHubToken: gitAccessToken,
      });

      const accessToken = createAccessToken(newUser.id, newUser.username, newUser.email);
      const refreshToken = createRefreshToken(newUser.id, newUser.username, newUser.email);

      const newSession = await Session.create({
        accessToken: accessToken,
        refreshToken: refreshToken,
        expirationDate: jwt.decode(refreshToken).exp * 1000,
        UserId: newUser.id,
      });

      createCookie(res, accessToken, jwt.decode(refreshToken).exp);
      res.redirect('http://localhost:3006/about');
    } else {
      const existingUser = await User.update(
        {
          gitHubToken: gitAccessToken,
        },
        {
          where: {
            id: user.id,
          },
        }
      );

      const accessToken = createAccessToken(user.id, user.username, user.email);
      const refreshToken = createRefreshToken(user.id, user.username, user.email);

      const newSession = await Session.create({
        accessToken: accessToken,
        refreshToken: refreshToken,
        expirationDate: jwt.decode(refreshToken).exp * 1000,
        UserId: user.id,
      });

      createCookie(res, accessToken, jwt.decode(refreshToken).exp);
      res.redirect('http://localhost:3006/about');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

      gamesArr.push(gameIdInt);

      await User.update(
        { games: { games: gamesArr } },
        { where: { id: user.id } }
      );

      return res.status(200).json({ message: 'User games updated' });
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
    const dbUser = await User.findByPk(userId);
    const gamesArr = await Promise.all(
      dbUser.games.games.map(async (element) => {
        const findGame = await Game.findByPk(element);
        return findGame.dataValues;
      })
    );

    res.status(200).json({
      username: dbUser.dataValues.username,
      avatar: dbUser.dataValues.avatar,
      games: gamesArr,
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving the user.' });
  }
};


