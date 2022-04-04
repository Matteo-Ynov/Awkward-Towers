const { Schema, model } = require("../database");


/**
 * @typedef Friend
 * @property {string} user_id_1
 * @property {string} user_id_2
 * @property {date} added_at
 */
const FriendSchema = new Schema({
  user_id_1: String,
  user_id_2: String,
  added_at: Date,
});

const Friend = model("Friend", FriendSchema, "friend");
module.exports = Friend;
