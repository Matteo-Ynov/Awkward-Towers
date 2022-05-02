const { response } = require("express");
const res = require("express/lib/response");
const Inventory = require("../models/Inventory");

const InventoryController = {
  findAll: async (request, response) => {
    try {
      const allInventory = await Inventory.find();
      response.json(allInventory);
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  },
  create: async (request, response) => {
    try {
      const newInventory = new Inventory();
      newInventory.username = request.params.username;
      newInventory.cosmetic_id = request.headers.cosmetic_id;
      const data = await newInventory.save();
      response.send("data inserted");
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  },
  findById: async (request, response) => {
    try {
      const targetName = request.params.username;
      const targetInventory = await Inventory.find({
        username: targetName
      })
      response.json(targetInventory)
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  },
};

module.exports = InventoryController;
