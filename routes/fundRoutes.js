const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  saveFund,
  getSavedFunds,
  addCustomFund,
  getCustomFunds,
  removeSavedFund
} = require("../controllers/fundController");

// Save a mutual fund (public or custom)
router.post("/save", authMiddleware, saveFund);

// Get all saved fund IDs for the logged-in user
router.get("/saved", authMiddleware, getSavedFunds);

// Add a custom fund (created manually by the user)
router.post("/custom", authMiddleware, addCustomFund);

// Get all custom funds created by the user
router.get("/custom", authMiddleware, getCustomFunds);

// Remove a saved fund by its fundId or _id
router.delete("/remove/:id", authMiddleware, removeSavedFund);

module.exports = router;
