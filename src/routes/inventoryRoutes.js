const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const { verifyStaffToken } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleCheck");
const { requireFields } = require("../middleware/validateInput");

// Staff only
router.get("/", verifyStaffToken, inventoryController.getInventory);
router.post(
  "/usage",
  verifyStaffToken,
  requireFields("itemId", "quantityUsed"),
  inventoryController.recordUsage
);

module.exports = router;
