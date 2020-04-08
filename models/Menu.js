const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  menuName: String,
  menuImage: String,
  menuPrice: String,
  menuDesc: String,
  menuCategory: String,
});
module.exports = mongoose.model("Menu", menuSchema);
