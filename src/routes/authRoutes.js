const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// POST /api/auth/staff/login
router.post("/staff/login", authController.staffLogin);

// POST /api/auth/guest/register
router.post("/guest/register", authController.guestRegister);

module.exports = router;
