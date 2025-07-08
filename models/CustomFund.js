const mongoose = require("mongoose");

const customFundSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  nav: { type: Number, required: true },
  date: { type: String, required: true },
  fundHouse: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("CustomFund", customFundSchema);