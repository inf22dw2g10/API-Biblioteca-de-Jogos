const Game = require('../models/Game');
const sequelize = require('../database');

exports.getAllGames = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 12;
    const totalCount = await Game.count();
    const offset = (page - 1) * limit;

    const games = await Game.findAll({
      offset,
      limit
    });
    if (games.length !== 0) {
      res.status(200).json({
        games,
        page,
        totalPages: Math.ceil(totalCount / limit),
      });
    } else {
      res.status(404).json({ message: 'No games found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.searhGames = async (req, res) => {
  const {game} = req.query
  try {
    const games = await Game.findAll({where:{
    
      title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + game.toLowerCase() + '%')

    }});
    if (games.length !== 0) {
      res.status(200).json(games);
    } else {
      res.status(200).json();

    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findOne({ where: { id } });

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createGame = async (req, res) => {
  try {
    const { title, description, year, genre, price, cover } = req.body;
    await Game.create({ title, description, year, genre, price, cover });

    res.status(201).json({ message: 'Game created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, year, genre, price, cover } = req.body;
    const game = await Game.findOne({ where: { id } });

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    await game.update({ title, description, year, genre, price, cover });

    res.status(200).json({ message: 'Game updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findOne({ where: { id } });

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    await game.destroy();
    res.status(200).json({ message: 'Game deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
