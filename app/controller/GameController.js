const { response } = require("express");
const res = require("express/lib/response");
const Game = require("../models/Game");

const GameController = {
  findAll: async (request, response) => {
    try {
      const allGame = await Game.find();
      response.json(allGame);
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  },
  create: async (request, response) => {
    try {
      const newGame = new Game();
      newGame.user_id_1 = request.body.user_id_1;
      newGame.user_id_2 = request.body.user_id_2;
      newGame.seed = request.body.seed;
      newGame.ended = request.body.ended;
      const data = await newGame.save();
      response.send("data inserted");
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  },
  findById: async(request, response) =>{
    try {
        const targetId = request.params.id;
        const targetGame = await Game.findOne({
            id: targetId
        })
        response.json(targetGame)
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
},
};

module.exports = GameController;
