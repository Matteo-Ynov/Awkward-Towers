const { Schema, model } = require("../database");


/**
 * @typedef Cosmetic
 * @property {string} name
 * @property {number} price
 * @property {string} type
 */
const CosmeticSchema = new Schema({
  name: String,
  price: Number,
  type: String,
});

const Cosmetic = model("Cosmetic", CosmeticSchema, "cosmetic");
module.exports = Cosmetic;
