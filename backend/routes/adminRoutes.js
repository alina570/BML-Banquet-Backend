const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/authMiddleware");
const { getAllBookings, updateBookingStatus, getBookingStats } = require("../controllers/adminController");

// Admin routes
router.get("/api/admin/bookings", isLoggedIn, getAllBookings);
router.put("/api/admin/bookings/:type/:id", isLoggedIn, updateBookingStatus);
router.get("/api/admin/stats", isLoggedIn, getBookingStats);

module.exports = router;