const jwt = require("jsonwebtoken");

exports.generateStaffToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });
};
