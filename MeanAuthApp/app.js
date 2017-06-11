const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
  console.log('Connected to DB') + config.database;
});

mongoose.connection.on('error', (err)=>{
  console.log('Error during db connection') + config.database;
});

const app = express();
//port for the server
const port = 3000;

const users = require('./routes/users');

//calling out Cross Origin Resource Sharing middleware
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

//calling out the body parser middleware
app.use(bodyParser.json());

app.use('/users', users);

//index route
app.get("/", (req, res)=>{
  res.send("Hi! this is Sujeet");
});

//starting the server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
