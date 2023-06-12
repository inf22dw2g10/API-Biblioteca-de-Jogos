const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require("cookie-parser")
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const sequelize = require('./database');
const userRoutes = require('./routes/user');
const gameRoutes = require('./routes/game');
const commentRoutes = require('./routes/comment');
const seed = require('./seed');
const corsOptions = {
  origin: true,
  methods: 'GET, POST, PATCH, DELETE, PUT' , 
  allowedHeaders: 'Content-Type, Authorization', 
  credentials:true,
};


const app = express();


app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Biblioteca de Jogos",
    version: "1.0.0",
    description: "Biblioteca de Jogos",
    contact: { name: "Biblioteca de Jogos" },
  },
  servers: [ {url: "http://localhost:5000"}],
  components: {
    securitySchemes: {
      BearerAuth: { type: "http", scheme: "bearer"},
    },
  },
  security: [{ BearerAuth: [] }],
}

const options = {
  swaggerDefinition,
  apis: ["./docs/**.yaml"],
}


const swaggerSpec = swaggerJSDoc(options)



app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(express.static(__dirname + "/public"));

app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/comments', commentRoutes);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/login.html")
});




sequelize
  .sync()
  .then(()=>{
    seed.populateDatabase()
  })
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}` ));
  })
  .catch((err) => console.error(err));
