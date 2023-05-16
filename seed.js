const faker = require('faker');
const User = require('./models/user');
const Game = require('./models/Game');
const Comment = require('./models/Comment');

async function populateDatabase() {
  // Populate User table
  for (let i = 0; i < 30; i++) {
    await User.create({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      gitHubToken: faker.random.uuid(),
    });
  }

  // Populate Game table
  for (let i = 0; i < 30; i++) {
    await Game.create({
      title: faker.random.words(),
      description: faker.lorem.paragraph(),
      cover: faker.image.imageUrl(),
      price: faker.random.float({ min: 0, max: 100 }),
      year: faker.random.number({ min: 2000, max: 2023 }),
    });
  }

  // Populate Comment table
  const users = await User.findAll();
  const games = await Game.findAll();

  for (let i = 0; i < 30; i++) {
    await Comment.create({
      text: faker.lorem.sentence(),
      rating: faker.random.number({ min: 1, max: 5 }),
      UserId: users[Math.floor(Math.random() * users.length)].id,
      GameId: games[Math.floor(Math.random() * games.length)].id,
    });
  }

  console.log('Database populated successfully.');
}

populateDatabase();
