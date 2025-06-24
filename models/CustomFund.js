const mongoose = require("mongoose");

const customFundSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  nav: Number,
  date: String,
  fundHouse: String,
});

module.exports = mongoose.model("CustomFund", customFundSchema);
