const express = require("express");
const router = express.Router();
const requestsController = require("../controllers/requestsController");
const { verifyStaffToken } = require("../middleware/authMiddleware");
const { requireFields } = require("../middleware/validateInput");

// Guest or staff can create
router.post(
  "/create",
  requireFields("roomId", "type", "priority", "description"),
  requestsController.createRequest
);

// Staff view & resolve
router.get("/", verifyStaffToken, requestsController.getAllRequests);
router.put(
  "/:requestId/resolve",
  verifyStaffToken,
  requestsController.resolveRequest
);

module.exports = router;
