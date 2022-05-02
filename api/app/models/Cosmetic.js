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
});

const Cosmetic = model("Cosmetic", CosmeticSchema, "cosmetic");

const gold = new Cosmetic();
gold.name = "gold";
gold.price = 10000;
gold.save();

const obama = new Cosmetic();
obama.name = "obama";
obama.price = 30000;
obama.save();

module.exports = Cosmetic;
