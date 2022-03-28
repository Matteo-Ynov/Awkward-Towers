const { Schema, model } = require("../database");


/**
 * @typedef Game
 * @property {string} user_id_1
 * @property {string} user_id_2
 * @property {number} seed
 * @property {boolean} ended
 */
const GameSchema = new Schema({
  user_id_1: String,
  user_id_2: String,
  seed: Number,
  ended: Boolean,
});

const Game = model("Game", GameSchema, "game");
module.exports = Game;
