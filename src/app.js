const express = require("express");
const app = express();
const data = require("./data.json");

app.get("/players", (req, res) => {
  res.status(200).send(data.players.sort((a, b) => a.id - b.id));
});

app.get("/players/:id", (req, res) => {
  const player = data.players.find(({id}) => id == +req.params.id);
  if (!player) res.status(404).send();
  res.status(200).send(player);
});

module.exports = app;
