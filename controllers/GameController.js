const Game = require('../models/Game');

exports.getAllGames = async (req, res) => {
  try {

    const games = await Game.findAll();

    if(games != ""){
      res.status(200).json(games);
    }else{
      res.status(404).json({message:'No games found'})
    }
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createGame = async (req, res) => {
  try {
    const { title, description, genre, rating, price, images, videos } = req.body;

    await Game.create({ title, description, genre, rating, price, images, videos });

    res.status(201).json({ message: 'Game created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, genre, rating, price, images, videos } = req.body;

    const game = await Game.findOne({ where: { id } });

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    await game.update({ title, description, genre, rating, price, images, videos });

    res.status(200).json({ message: 'Game updated successfully' });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

