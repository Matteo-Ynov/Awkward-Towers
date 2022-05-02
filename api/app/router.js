const express = require("express");
const UsersController = require("./controller/UsersController");
const InventoryController = require("./controller/InventoryController");
const GameController = require("./controller/GameController");
const FriendController = require("./controller/FriendController");
const CosmeticController = require("./controller/CosmeticController");

const router = express.Router();

router.get("/users", UsersController.findAll);
router.get("/user/:username", UsersController.findByName);
router.delete("/user/:username", UsersController.delete);
router.patch("/user/:username", UsersController.update);
router.post("/users", UsersController.create);


router.get("/inventories", InventoryController.findAll);
router.get("/inventory/:username", InventoryController.findById);
router.post("/inventory/:username", InventoryController.create);



router.get("/games", GameController.findAll);
router.get("/game/:id", GameController.findById);
router.post("/games", GameController.create);


router.get("/friends", FriendController.findAll);
router.get("/friend/:id", FriendController.findById);
router.post("/friends", FriendController.create);


router.get("/cosmetics", CosmeticController.findAll);
router.get("/cosmetic/:id", CosmeticController.findByName);
router.post("/cosmetics", CosmeticController.create);

module.exports = router;
