const User = require('./models/User');
const Game = require('./models/Game');
const Comment = require('./models/Comment');

const gamesData = [
    {
      "title" : "Counter Strike: Global Offensive",
      "description" : "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).",
      "cover" : "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg?t=1683566799",
      "price" : 0,
      "year" : 2013,
      "genre" : "First-Person Shooter"
    },
    {
      "title" : "Minecraft",
      "description" : "Build and explore your own virtual world",
      "cover" : "https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_Minecraft.jpg",
      "price" : 26.95,
      "year" : 2011,
      "genre" : "Sandbox, Survival"
    },
    {
      "title" : "The Witcher 3: Wild Hunt",
      "description" : "Embark on a quest in a vast open world",
      "cover" : "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg?t=1630403201",
      "price" : 39.99,
      "year" : 2015,
      "genre" : "Action RPG"
    },
    {
      "title" : "Grand Theft Auto V",
      "description" : "Experience the criminal underworld of Los Santos",
      "cover" : "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg?t=1625823438",
      "price" : 29.99,
      "year" : 2013,
      "genre" : "Action-Adventure"
    },
    {
      "title" : "Fortnite",
      "description" : "Battle against other players in a colorful, online world",
      "cover" : "https://cdn2.unrealengine.com/c4-s2-battle-pass-1920x1080-603842488c24.jpg",
      "price" : 0,
      "year" : 2017,
      "genre" : "Battle Royale"
    },
    {
      "title" : "Red Dead Redemption 2",
      "description" : "Explore the wild west as an outlaw on the run",
      "cover" : "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg?t=1621989781",
      "price" : 59.99,
      "year" : 2018,
      "genre" : "Action-Adventure"
    },
    {
      "title" : "The Legend of Zelda: Breath of the Wild",
      "description" : "Embark on an epic adventure in the kingdom of Hyrule",
      "cover" : "https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/wiiu_14/SI_WiiU_TheLegendOfZeldaBreathOfTheWild_image1600w.jpg",
      "price" : 59.99,
      "year" : 2017,
      "genre" : "Action-Adventure"
    },
    {
      "title" : "Overwatch",
      "description" : "Team-based multiplayer shooter with unique heroes",
      "cover" : "https://news.xbox.com/en-us/wp-content/uploads/sites/2/2022/10/OW2-be9287b234afbe7898ac.jpg",
      "price" : 19.99,
      "year" : 2016,
      "genre" : "First-Person Shooter"
    },
    {
      "title" : "Fallout 4",
      "description" : "Survive and explore a post-apocalyptic open world",
      "cover" : "https://cdn.cloudflare.steamstatic.com/steam/apps/377160/header.jpg?t=1631712276",
      "price" : 29.99,
      "year" : 2015,
      "genre" : "Action RPG"
    },
    {
      "title" : "League of Legends",
      "description" : "Competitive MOBA with strategic gameplay",
      "cover" : "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/LOL_2560x1440-98749e0d718e82d27a084941939bc9d3",
      "price" : 0,
      "year" : 2009,
      "genre" : "MOBA"
    },
    {
      "title" : "PlayerUnknown's Battlegrounds",
      "description" : "Battle royale game with intense multiplayer action",
      "cover" : "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg?t=1611206863",
      "price" : 29.99,
      "year" : 2017,
      "genre" : "Battle Royale"
    },
    {
      "title" : "FIFA 21",
      "description" : "Realistic soccer simulation game",
      "cover" : "https://cdn.4gnews.pt/imagens/fifa21-2-cke.jpg",
      "price" : 59.99,
      "year" : 2020,
      "genre" : "Sports"
    },
    {
      "title" : "Call of Duty: Warzone",
      "description" : "Free-to-play battle royale experience",
      "cover" : "https://assets.xboxservices.com/assets/d2/e7/d2e74bfc-22e1-4985-860f-dc76d69e5b8f.jpg?n=CoD-Warzone_GLP-Page-Hero-1084_1920x1080.jpg",
      "price" : 0,
      "year" : 2020,
      "genre" : "Battle Royale"
    },
    {
      "title" : "Assassin's Creed Valhalla",
      "description" : "Become a legendary Viking raider in England",
      "cover" : "https://gaming-cdn.com/images/products/6147/orig/assassin-s-creed-valhalla-pc-jogo-ubisoft-connect-europe-cover.jpg?v=1650550345",
      "price" : 59.99,
      "year" : 2020,
      "genre" : "Action-Adventure"
    },
    {
      "title" : "Among Us",
      "description" : "Social deduction game of teamwork and betrayal",
      "cover" : "https://cdn.akamai.steamstatic.com/steam/apps/945360/header.jpg?t=1620925321",
      "price" : 4.99,
      "year" : 2018,
      "genre" : "Social Deduction"
    },
    {
      "title" : "Cyberpunk 2077",
      "description" : "Dystopian RPG set in Night City",
      "cover" : "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg?t=1632942094",
      "price" : 59.99,
      "year" : 2020,
      "genre" : "Action RPG"
    },
    {
      "title" : "Apex Legends",
      "description" : "Free-to-play battle royale with unique heroes",
      "cover" : "https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg?t=1631314104",
      "price" : 0,
      "year" : 2019,
      "genre" : "Battle Royale"
    },
    {
      "title" : "Genshin Impact",
      "description" : "Open-world action RPG with elemental combat",
      "cover" : "https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_GenshinImpact_miHoYoLimited_S1_2560x1440-91c6cd7312cc2647c3ebccca10f30399",
      "price" : 0,
      "year" : 2020,
      "genre" : "Action RPG"
    },
    {
      "title" : "World of Warcraft",
      "description" : "Massively multiplayer online role-playing game",
      "cover" : "https://sm.ign.com/ign_pt/screenshot/default/wow-boss-compilation-wallpaper_svhf.jpg",
      "price" : 14.99,
      "year" : 2004,
      "genre" : "MMORPG"
    },
    {
      "title" : "Super Mario Odyssey",
      "description" : "Platformer adventure with Mario in a 3D world",
      "cover" : "https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_SuperMarioOdyssey_image1600w.jpg",
      "price" : 59.99,
      "year" : 2017,
      "genre" : "Platformer"
    },
    {
      "title" : "The Elder Scrolls V: Skyrim",
      "description" : "Immersive open-world fantasy RPG",
      "cover" : "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg?t=1610462431",
      "price" : 19.99,
      "year" : 2011,
      "genre" : "Action RPG"
    },
    {
      "title" : "NBA 2K23",
      "description" : "Rise to the occasion in NBA 2K23. Showcase your talent in MyCAREER. Pair All-Stars with timeless legends in MyTEAM. Build your own dynasty in MyGM, or guide the NBA in a new direction with MyLEAGUE. Take on NBA or WNBA teams in PLAY NOW and feel true-to-life gameplay.",
      "cover" : "https://gaming-cdn.com/images/products/12530/orig/nba-2k23-michael-jordan-edition-michael-jordan-edition-pc-jogo-steam-europe-cover.jpg?v=1671555398",
      "price" :59.99,
      "year" : 2023,
      "genre" : "Sports"
    },
    {
      "title" : "Cities: Skylines  II",
      "description" : "Raise a city from the ground up and transform it into a thriving metropolis with the most realistic city builder ever. Push your creativity and problem-solving to build on a scale you've never experienced. With deep simulation and a living economy, this is world-building without limits.",
      "cover" : "https://sm.ign.com/t/ign_pt/news/c/cities-sky/cities-skylines-2-revealed-for-current-gen-consoles-coming-l_vbne.1280.jpg",
      "price" :49.99,
      "year" : 2023,
      "genre" : "City Builder"
    },
    {
      "title" : "Terraria",
      "description" : "Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game. Four Pack also available!",
      "cover" : "https://gaming-cdn.com/images/products/12003/616x353/terraria-xbox-one-xbox-series-x-s-xbox-series-x-s-xbox-one-jogo-microsoft-store-estados-unidos-cover.jpg?v=1683791520",
      "price" :9.99,
      "year" : 2011,
      "genre" : "Open World Survival Craft"
    },
    {
      "title" : "Rust",
      "description" : "The only aim in Rust is to survive. Everything wants you to die - the island's wildlife and other inhabitants, the environment, other survivors. Do whatever it takes to last another night.",
      "cover" : "https://i0.wp.com/news.xbox.com/en-us/wp-content/uploads/sites/2/2021/03/Rust.jpg?fit=1920%2C1080&ssl=1",
      "price" :39.99,
      "year" : 2018,
      "genre" : "Survival Crafting"
    },
    {
      "title" : "Hogwart's Legacy",
      "description" : "Hogwarts Legacy is an immersive, open-world action RPG. Now you can take control of the action and be at the center of your own adventure in the wizarding world.",
      "cover" : "https://gaming-cdn.com/images/products/7072/orig/hogwarts-legacy-pc-jogo-steam-europe-cover.jpg?v=1683557192",
      "price" :59.99,
      "year" : 2023,
      "genre" : "Fantasy Open World"
    },
    {
      "title" : "STAR WARS Jedi: Survivor",
      "description" : "The story of Cal Kestis continues in STAR WARS Jedi: Survivor™, a galaxy-spanning, third-person, action-adventure game.",
      "cover" : "https://image.api.playstation.com/vulcan/ap/rnd/202211/2222/mBqBHTdjAZ2ri7KTJytFGqJt.png",
      "price" :69.99,
      "year" : 2023,
      "genre" : "Adventure Souls-like"
    },
    {
      "title" : "Beat Saber",
      "description" : "Beat Saber is a VR rhythm game where you slash the beats of adrenaline-pumping music as they fly towards you, surrounded by a futuristic world.",
      "cover" : "https://salaodejogos.net/wp-content/uploads/2019/01/beat-saber-8.jpg",
      "price" :29.99,
      "year" : 2019,
      "genre" : "VR Rhythm"
    },
    {
      "title" : "Marvel’s Spider-Man Remastered",
      "description" : "Encontra um Peter Parker experiente e combate o crime e os vilões icónicos da Nova Iorque da Marvel.",
      "cover" : "https://gaming-cdn.com/images/products/11907/orig/marvel-s-spider-man-remastered-pc-jogo-steam-cover.jpg",
      "price" :59.99,
      "year" : 2022,
      "genre" : "Single-Player"
    },
    {
      "title" : "The Escapists 2",
      "description" : "Tens o que é preciso para escapar?",
      "cover" : "https://gaming-cdn.com/images/products/8830/orig/the-escapists-2-game-of-the-year-edition-goty-edition-pc-mac-jogo-steam-cover.jpg",
      "price" :4.99,
      "year" : 2017,
      "genre" : "Co-Op"
    },
    {
      "title" : "Devil May Cry 5",
      "description" : "O derradeiro Devil Hunter voltou ao seu melhor estilo no jogo de ação pelo qual os fãs salivavam.",
      "cover" : "https://gaming-cdn.com/images/products/3501/orig/devil-may-cry-5-xbox-one-xbox-series-x-s-xbox-one-xbox-series-x-s-jogo-microsoft-store-cover.jpg",
      "price" :29.99,
      "year" : 2019,
      "genre" : "Single-Player"
    },
    {
      "title" : "Monster Hunter: World",
      "description" : "Usa todos os recursos à tua disposição para caçar monstros num mundo a transbordar de surpresas e adrenalina.",
      "cover" : "https://image.api.playstation.com/vulcan/img/rnd/202010/0106/IyY3JSzHNCVoh7FultMPaE8F.jpg",
      "price" :29.99,
      "year" : 2018,
      "genre" : "Co-Op"
    },
]

const usersData =[
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'pedro', 
    email: 'pedro@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 1,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'rui', 
    email: 'rui@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'jorge', 
    email: 'jorge@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'tiago', 
    email: 'tiago@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'joao', 
    email: 'joao@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'miguel', 
    email: 'miguel@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'dinis', 
    email: 'dinis@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'daniel', 
    email: 'daniel@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'goncalo', 
    email: 'goncalo@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'david', 
    email: 'david@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'davide', 
    email: 'davide@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'ricardo', 
    email: 'ricardo@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'jose', 
    email: 'jose@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'ze', 
    email: 'ze@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'joana', 
    email: 'joana@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'tomas', 
    email: 'tomas@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'manuel', 
    email: 'manuel@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'senou7', 
    email: 'senou7@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'zoro1', 
    email: 'zoro1@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'yesgl', 
    email: 'yesgl@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'ymen', 
    email: 'ymen@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'antonio', 
    email: 'antonio@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'vski', 
    email: 'vski@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'wuant', 
    email: 'wuant@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'kazio', 
    email: 'kazio@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'casio', 
    email: 'casio@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'steam', 
    email: 'steam@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'gas', 
    email: 'gas@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'joaquim', 
    email: 'joaquim@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'catarina', 
    email: 'catarina@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'ana', 
    email: 'ana@gmail.com',
    password: '$2b$10$FKpb9RBG.eVf4OvEybaOAOn6WKFm3Kwk6HIzDp3EQP7Tz9QR2MSv6',
    admin: 0,
  },
]

const commentsData =[
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 1,
    UserId: 1,
    GameId: 1,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 0,
    UserId: 2,
    GameId: 1,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 1,
    UserId: 3,
    GameId: 1,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 0,
    UserId: 4,
    GameId: 1,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 1,
    UserId: 5,
    GameId: 1,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 0,
    UserId: 6,
    GameId: 1,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 1,
    UserId: 7,
    GameId: 1,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 0,
    UserId: 8,
    GameId: 2,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 1,
    UserId: 9,
    GameId: 3,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 0,
    UserId: 10,
    GameId: 6,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 1,
    UserId: 11,
    GameId: 7,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 0,
    UserId: 12,
    GameId: 7,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 1,
    UserId: 13,
    GameId: 7,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 0,
    UserId: 14,
    GameId: 4,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 1,
    UserId: 15,
    GameId: 10,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 0,
    UserId: 16,
    GameId: 19,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 1,
    UserId: 17,
    GameId: 19,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 0,
    UserId: 18,
    GameId: 19,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 1,
    UserId: 19,
    GameId: 19,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 0,
    UserId: 20,
    GameId: 19,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 1,
    UserId: 21,
    GameId: 1,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 0,
    UserId: 22,
    GameId: 2,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 1,
    UserId: 23,
    GameId: 6,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 0,
    UserId: 24,
    GameId: 8,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 1,
    UserId: 25,
    GameId: 8,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 0,
    UserId: 26,
    GameId: 7,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 1,
    UserId: 27,
    GameId: 6,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 0,
    UserId: 28,
    GameId: 30,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 1,
    UserId: 29,
    GameId: 30,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 0,
    UserId: 30,
    GameId: 32,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    rating: 1,
    UserId: 31,
    GameId: 31,
  },

]


exports.populateDatabase = async () => {
  try {
    const usersCount = await User.count();
    if (usersCount === 0) {
      usersData.forEach(async (userData) => {
        const user = new User(userData);
        await user.save();
      });
    }

    const gamesCount = await Game.count();
    if (gamesCount === 0) {
      gamesData.forEach(async (gameData) => {
        const game = new Game(gameData);
        await game.save();
      });
    }

    const commentsCount = await Comment.count();
    if (commentsCount === 0) {
      commentsData.forEach(async (commentData) => {
        const comment = new Comment(commentData);
        await comment.save();
      });
    }
    
    console.log('Database populated successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
  }
};
