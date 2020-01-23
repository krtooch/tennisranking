const express = require("express");
const app = express();

const query = require("./query");

app.get("/players", async (req, res) => {
  const data = await query();
  res.status(200).send(data.players.sort((a, b) => a.id - b.id));
});

app.get("/players/:id", async (req, res) => {
  const data = await query();
  const player = data.players.find(({ id }) => id == +req.params.id);
  if (!player) res.status(404).send();
  res.status(200).send(player);
});

module.exports = app;
