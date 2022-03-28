const { Schema, model } = require("../database");


/**
 * @typedef Inventory
 * @property {string} user_id
 * @property {string} cosmetic_id
 */
const InventorySchema = new Schema({
  user_id: String,
  cosmetic_id: String,
});

const Inventory = model("Inventory", InventorySchema, "inventory");
module.exports = Inventory;
