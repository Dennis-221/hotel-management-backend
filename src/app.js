require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

// ✅ Import custom middleware
const { auditLogger } = require("./middleware/audit");
const { errorHandler } = require("./middleware/errorHandler");

// ✅ Core Express middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ✅ Custom audit logging
app.use(auditLogger);

// ✅ PHASE 1 ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/guests", require("./routes/guestRoutes"));
app.use("/api/housekeeping", require("./routes/housekeepingRoutes"));
app.use("/api/restaurant", require("./routes/restaurantRoutes"));

// ✅ PHASE 2 ROUTES
app.use("/api/bills", require("./routes/billingRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/amenities", require("./routes/amenitiesRoutes"));
app.use("/api/requests", require("./routes/requestsRoutes"));
app.use("/api/staff", require("./routes/staffRoutes"));
app.use("/api/reports", require("./routes/reportsRoutes"));

// ✅ Health check route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Hotel Management API is running" });
});

// ✅ Central error handler
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
