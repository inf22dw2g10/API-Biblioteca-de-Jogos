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
    const { title, description, year, price, cover  } = req.body;

    await Game.create({ title, description, year, price, cover });

    res.status(201).json({ message: 'Game created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, year, price, cover } = req.body;

    const game = await Game.findOne({ where: { id } });

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    await game.update({ title, description, year, price, cover });

    res.status(200).json({ message: 'Game updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.changePrice = async (req,res) => {
  try {
    const { id } = req.params
    const { newPrice } = req.body

    const game = await Game.findByPk(id)

    if(!game){
      return res.status(404).json({ message: 'Game not found' });
    }else{
      await Game.update({price: newPrice},{where:{ id : id}})
      res.status(201).json({ message: 'Price updated successfully' });
    }


  }catch(err){
    res.status(500).json({ message: 'Internal server error' });
  }
}
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

