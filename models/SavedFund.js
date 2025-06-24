const mongoose = require("mongoose");

const savedFundSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fundId: { type: String, required: true }, // MFAPI schemeCode or custom _id
  },
  { timestamps: true }
);

// ✅ Ensure a user can't save the same fund twice
savedFundSchema.index({ userId: 1, fundId: 1 }, { unique: true });

module.exports = mongoose.model("SavedFund", savedFundSchema);
