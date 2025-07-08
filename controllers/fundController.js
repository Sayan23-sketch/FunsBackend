const SavedFund = require("../models/SavedFund");

// Save a fund
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

// Get saved funds for the user
exports.getSavedFunds = async (req, res) => {
  try {
    const funds = await SavedFund.find({ userId: req.user.id });
    res.json(funds);
  } catch (err) {
    console.error("Error fetching saved funds:", err);
    res.status(500).json({ msg: "Server error while fetching saved funds" });
  }
};

// Add a custom fund
exports.addCustomFund = async (req, res) => {
  const { fundId } = req.body;
  if (!fundId) {
    return res.status(400).json({ msg: "Fund ID is required" });
  }

  try {
    const fund = new SavedFund({
      userId: req.user.id,
      fundId,
    });

    await fund.save();
    res.status(201).json({ msg: "Custom fund added" });
  } catch (err) {
    console.error("Error adding custom fund:", err);
    res.status(500).json({ msg: "Server error while adding custom fund" });
  }
};

// Get all custom funds (same as saved funds here)
exports.getCustomFunds = async (req, res) => {
  try {
    const customFunds = await SavedFund.find({ userId: req.user.id });
    res.json(customFunds);
  } catch (err) {
    console.error("Error fetching custom funds:", err);
    res.status(500).json({ msg: "Server error while fetching custom funds" });
  }
};

// Remove a saved fund
exports.removeSavedFund = async (req, res) => {
  try {
    const deleted = await SavedFund.findOneAndDelete({
      userId: req.user.id,
      fundId: req.params.id,
    });

    if (!deleted) {
      return res.status(404).json({ msg: "Fund not found" });
    }

    res.json({ msg: "Fund removed successfully" });
  } catch (err) {
    console.error("Error removing fund:", err);
    res.status(500).json({ msg: "Server error while removing fund" });
  }
};
