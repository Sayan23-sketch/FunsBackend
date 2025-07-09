const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  saveFund,
  getSavedFunds,
  addCustomFund,
  getCustomFunds,
  removeSavedFund,
  getFundById, // ✅ add this
} = require("../controllers/fundController");

router.post("/save", authMiddleware, saveFund);
router.get("/saved", authMiddleware, getSavedFunds);
router.post("/custom", authMiddleware, addCustomFund);
router.get("/custom", authMiddleware, getCustomFunds);
router.delete("/remove/:id", authMiddleware, removeSavedFund);

// ✅ New route to get a fund by ID
router.get("/:id", getFundById); // ✅ Public


module.exports = router;
