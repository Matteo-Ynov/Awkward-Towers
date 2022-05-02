const { Schema, model } = require("../database");


/**
 * @typedef Users
 * @property {string} username
 * @property {string} password
 * @property {number} highest_score
 * @property {number} gold
 * @property {number} elo
 * @property {boolean} connected
 * @property {date} last_connection
 */
const UsersSchema = new Schema({
  username: String,
  password: String,
  highest_score: Number,
  gold: Number,
  elo: Number,
  connected: Boolean,
  current_skin: String,
});

const Users = model("Users", UsersSchema, "users");
module.exports = Users;