exports.saveFund = async (req, res) => {
  const fundId = req.body.fundId || req.body.schemeCode; // Support both names

  if (!fundId) return res.status(400).json({ msg: "Fund ID is required" });

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

    console.log("Fund saved:", saved);
    res.status(201).json({ msg: "Fund saved successfully" });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ msg: "⚠️ Fund already saved" });
    }
    console.error("Error saving fund:", err);
    res.status(500).json({ msg: "Server error while saving fund" });
  }
};