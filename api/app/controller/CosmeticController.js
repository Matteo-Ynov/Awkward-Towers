const { response } = require("express");
const res = require("express/lib/response");
const Cosmetic = require("../models/Cosmetic");

const CosmeticController = {
  findAll: async (request, response) => {
    try {
      const allCosmetic = await Cosmetic.find();
      response.json(allCosmetic);
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  },
  create: async (request, response) => {
    try {
      const newCosmetic = new Cosmetic();
      newCosmetic.name = request.body.name;
      newCosmetic.price = request.body.price;
      const data = await newCosmetic.save();
      response.send("data inserted");
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  },
  findByName: async(request, response) =>{
    try {
        const targetName = request.params.name;
        const targetCosmetic = await Cosmetic.findOne({
            name: targetName
        })
        response.json(targetCosmetic)
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
},
};

module.exports = CosmeticController;
