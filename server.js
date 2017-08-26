const express          = require("express");
const path             = require("path");
const mustacheExpress  = require("mustache-express");
const routes           = require("./routes/index");
const bodyParser       = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const app              = express();
const fs = require("fs");
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/snippetdb');

app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.set("layout", "layout");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(expressValidator());
app.use(session({
  secret: "Hangman",
  resave: false,
  saveUninitialized: false
}));

app.use(routes);

app.listen(3000, function() {
  console.log("App is running on localhost:3000");
});