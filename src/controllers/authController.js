const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");

exports.staffLogin = async (req, res, next) => {
  try {
    const { employeeId, password } = req.body;
    console.log(employeeId, password);
    if (!employeeId || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing credentials" });
    }

    const staff = await authModel.getStaffByEmployeeId(employeeId);
    if (!staff) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, staff.passwordHash);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: staff.id, role: staff.role, employeeId: staff.employeeId },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      success: true,
      token,
      staff: {
        id: staff.id,
        employeeId: staff.employeeId,
        name: staff.name,
        role: staff.role,
        department: staff.department,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.guestRegister = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newGuest = await authModel.createGuest({
      firstName,
      lastName,
      email,
      phone,
      passwordHash,
    });

    res.status(201).json({ success: true, guestId: newGuest.id });
  } catch (err) {
    if (err.message.includes("UNIQUE")) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }
    next(err);
  }
};
