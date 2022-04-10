//Required modules
const express = require("express");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || "8888";

// Services
const cryptoController = require('./controllers/CryptoController');

// Paths to folders and/or files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
//Formatting tools - Libraries required
app.locals.moment = require('moment');
app.locals.numeral = require('numeral');


//page routes
app.get("/", async (req, res) => {
  let cryptoData = await cryptoController.getCryptos();
  // console.log(cryptoData);
  res.render("index", { title: "Home", cryptoData: cryptoData });
});

app.get("/events", async (req, res) => {
  let eventsData = await cryptoController.getCryptoEvents();
  // console.log(eventsData);
  res.render("events", { title: "Events", eventsData: eventsData });
});

//server listenner
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`); //${port} is called template literal with ` backwards quotes

});




