const { response } = require("express");
const res = require("express/lib/response");
const Users = require("../models/Users");


const UsersController = {
  findAll: async (request, response) => {
    try {
      const allUsers = await Users.find();
      response.json(allUsers);
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  },
  create: async (request, response) => {
    try {
      const newUsers = new Users();
      newUsers.username = request.body.username;
      newUsers.password = request.body.password;
      newUsers.highest_score = request.body.highest_score;
      newUsers.gold = request.body.gold;
      newUsers.elo = request.body.elo;
      newUsers.connected = request.body.connected;
      newUsers.last_connection = request.body.last_connection;
      const data = await newUsers.save();
      response.send("data inserted");
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  },
  findByName: async(request, response) =>{
    try {
      Users.deleteMany({})
        const targetUsername = request.params.username;
        const targetUsers = await Users.findOne({
            username: targetUsername
        })
        response.json(targetUsers)
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
},
};

module.exports = UsersController;
