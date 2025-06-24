const SavedFund = require("../models/SavedFund");
const CustomFund = require("../models/CustomFund");

// @desc Save a mutual fund from external API or custom
// @route POST /api/funds/save
// @access Private
exports.saveFund = async (req, res) => {
  const fundId = req.body.fundId || req.body.schemeCode; //  Support both names

  if (!fundId) return res.status(400).json({ msg: " Fund ID is required" });

  try {
    // Check if already saved
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

    console.log(" Fund saved:", saved);
    res.status(201).json({ msg: " Fund saved successfully" });
  } catch (err) {
    console.error(" Error saving fund:", err);
    res.status(500).json({ msg: " Server error while saving fund" });
  }
};

// @desc Get saved fund IDs (for both API and custom funds)
// @route GET /api/funds/saved
// @access Private
exports.getSavedFunds = async (req, res) => {
  try {
    const saved = await SavedFund.find({ userId: req.user.id }).select(
      "fundId"
    );

    const savedFundIds = saved.map((f) => f.fundId);
    console.log(" Saved fund IDs:", savedFundIds);

    res.json({ savedFundIds });
  } catch (err) {
    console.error(" Error fetching saved funds:", err);
    res.status(500).json({ msg: " Error fetching saved funds" });
  }
};

// @desc Add a custom fund manually
// @route POST /api/funds/custom
// @access Private
exports.addCustomFund = async (req, res) => {
  const { name, fundHouse, nav, date } = req.body;

  if (!name || !fundHouse || !nav || !date) {
    return res.status(400).json({ msg: " All fields are required" });
  }

  try {
    const created = await CustomFund.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json({
      message: " Custom fund added successfully",
      fundId: created._id, // Needed in frontend
    });
  } catch (err) {
    console.error(" Failed to add custom fund:", err);
    res.status(500).json({ msg: " Failed to add custom fund" });
  }
};

// @desc Get all custom funds added by the user
// @route GET /api/funds/custom
// @access Private
exports.getCustomFunds = async (req, res) => {
  try {
    const funds = await CustomFund.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(funds);
  } catch (err) {
    console.error(" Error fetching custom funds:", err);
    res.status(500).json({ msg: " Error fetching custom funds" });
  }
};

// @desc Remove a saved fund (API fund or custom)
// @route DELETE /api/funds/remove/:id
// @access Private
exports.removeSavedFund = async (req, res) => {
  try {
    const result = await SavedFund.deleteOne({
      userId: req.user.id,
      fundId: req.params.id,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Fund not found" });
    }

    res.json({ msg: "Fund removed successfully" });
  } catch (err) {
    console.error(" Error removing fund:", err);
    res.status(500).json({ msg: "Error removing fund" });
  }
};
