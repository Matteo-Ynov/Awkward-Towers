const { Schema, model } = require("../database");


/**
 * @typedef Inventory
 * @property {string} username
 * @property {string} cosmetic_id
 */
const InventorySchema = new Schema({
  username: String,
  cosmetic_id: String,
});

const Inventory = model("Inventory", InventorySchema, "inventory");
module.exports = Inventory;
