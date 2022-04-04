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
      newCosmetic.user_id_1 = request.body.user_id_1;
      newCosmetic.user_id_2 = request.body.user_id_2;
      newCosmetic.added_at = request.body.seed;
      const data = await newCosmetic.save();
      response.send("data inserted");
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  },
  findById: async(request, response) =>{
    try {
        const targetId = request.params.id;
        const targetCosmetic = await Cosmetic.findOne({
            id: targetId
        })
        response.json(targetCosmetic)
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
},
};

module.exports = CosmeticController;
