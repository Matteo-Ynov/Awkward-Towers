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
      newUsers.current_skin = request.body.current_skin;
      const data = await newUsers.save();
      response.send("data inserted");
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  },
  findByName: async (request, response) => {
    try {
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
  delete: async (request, response) => {
    try {
      const targetUsername = request.params.username;
      const targetUsers = await Users.findOneAndDelete({
        username: targetUsername
      })
      response.json(targetUsers)
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  },
  update: async (request, response) => {
    try {
      headers = request.headers
      const filter = { username: request.params.username };
      const update = { username: headers["username"], password: headers["password"], gold: headers["gold"], highest_score: headers["highest_score"] };
      console.log(update)
      const targetUsers = await Users.findOneAndUpdate(filter, update, {
        new: true
      });
      response.json(request.headers)
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  }
};

module.exports = UsersController;
