const { Schema, model } = require("../database");


/**
 * @typedef Cosmetic
 * @property {string} name
 * @property {number} price
 * @property {string} type
 */
const CosmeticSchema = new Schema({
  name: String,
  price: Number,
});

const Cosmetic = model("Cosmetic", CosmeticSchema, "cosmetic");

// Cosmetic.deleteMany({}, function ( err ) {
//   console .log( "success" );
// });

Cosmetic.exists({name : "obama"}).then((value) => { 
  if(value === null){
    const obama = new Cosmetic();
    obama.name = "obama";
    obama.price = 30000;
    obama.save();
  }})

Cosmetic.exists({name : "gold"}).then((value) => { 
  if(value === null){
    const gold = new Cosmetic();
    gold.name = "gold";
    gold.price = 10000;
    gold.save();
  }})

Cosmetic.exists({name : "basic"}).then((value) => { 
  if(value === null){
    const basic = new Cosmetic();
    basic.name = "basic";
    basic.price = 0;
    basic.save();
  }})

module.exports = Cosmetic;
