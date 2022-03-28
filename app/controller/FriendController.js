const { response } = require("express");
const res = require("express/lib/response");
const Friend = require("../models/Friend");

const FriendController = {
  findAll: async (request, response) => {
    try {
      const allFriend = await Friend.find();
      response.json(allFriend);
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  },
  create: async (request, response) => {
    try {
      const newFriend = new Friend();
      newFriend.user_id_1 = request.body.user_id_1;
      newFriend.user_id_2 = request.body.user_id_2;
      newFriend.added_at = request.body.seed;
      const data = await newFriend.save();
      response.send("data inserted");
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  },
  findById: async(request, response) =>{
    try {
        const targetId = request.params.id;
        const targetFriend = await Friend.findOne({
            id: targetId
        })
        response.json(targetFriend)
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
},
};

module.exports = FriendController;
