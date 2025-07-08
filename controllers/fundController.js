const SavedFund = require("../models/SavedFund");
const CustomFund = require("../models/CustomFund"); // optional

// ✅ Save a fund by fundId
exports.saveFund = async (req, res) => {
  const fundId = req.body.fundId || req.body.schemeCode;

  if (!fundId) return res.status(400).json({ msg: "Fund ID is required" });

  try {
    const existing = await SavedFund.findOne({
      userId: req.user.id,
      fundId,
    });

    if (existing) {
      return res.status(400).json({ msg: "⚠️ Fund already saved" });
    }

    const saved = await SavedFund.create({
      userId: req.user.id,
      fundId,
    });

    console.log("Fund saved:", saved);
    res.status(201).json({ msg: "Fund saved successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ msg: "⚠️ Fund already saved" });
    }
    console.error("Error saving fund:", err);
    res.status(500).json({ msg: "Server error while saving fund" });
  }
};

// ✅ Get all saved funds for the logged-in user
exports.getSavedFunds = async (req, res) => {
  try {
    const savedFunds = await SavedFund.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(savedFunds);
  } catch (err) {
    console.error("Error fetching saved funds:", err);
    res.status(500).json({ msg: "Server error while fetching saved funds" });
  }
};

// ✅ Add a custom fund (user-defined)
exports.addCustomFund = async (req, res) => {
  const { name, nav, fundHouse, category } = req.body;

  if (!name || !nav || !fundHouse || !category) {
    return res.status(400).json({ msg: "All custom fund fields are required" });
  }

  try {
    const customFund = await CustomFund.create({
      userId: req.user.id,
      name,
      nav,
      fundHouse,
      category,
    });
    res.status(201).json(customFund);
  } catch (err) {
    console.error("Error adding custom fund:", err);
    res.status(500).json({ msg: "Server error adding custom fund" });
  }
};

// ✅ Get all custom funds created by the user
exports.getCustomFunds = async (req, res) => {
  try {
    const customFunds = await CustomFund.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(customFunds);
  } catch (err) {
    console.error("Error fetching custom funds:", err);
    res.status(500).json({ msg: "Server error fetching custom funds" });
  }
};

// ✅ Remove a saved fund by its database _id
exports.removeSavedFund = async (req, res) => {
  try {
    const removed = await SavedFund.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!removed) {
      return res.status(404).json({ msg: "Saved fund not found" });
    }

    res.json({ msg: "Fund removed successfully" });
  } catch (err) {
    console.error("Error removing saved fund:", err);
    res.status(500).json({ msg: "Server error while removing fund" });
  }
};
