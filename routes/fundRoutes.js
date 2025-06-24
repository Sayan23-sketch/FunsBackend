const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  saveFund,
  getSavedFunds,
  addCustomFund,
  getCustomFunds,
  removeSavedFund,
} = require("../controllers/fundController");

router.post("/save", authMiddleware, saveFund);
router.get("/saved", authMiddleware, getSavedFunds);
router.post("/custom", authMiddleware, addCustomFund);
router.get("/custom", authMiddleware, getCustomFunds);
router.delete("/remove/:id", authMiddleware, removeSavedFund);

module.exports = router;
