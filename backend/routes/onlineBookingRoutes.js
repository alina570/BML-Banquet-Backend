const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/authMiddleware");
const { checkDateConflict } = require("../middleware/bookingMiddleware");
const {
    createOnlineBooking,
    getUserOnlineBookings,
    getOnlineBooking,
    updateOnlineBooking,
    deleteOnlineBooking
} = require("../controllers/onlineBookingController");

router.post("/api/online-booking", isLoggedIn, checkDateConflict, createOnlineBooking);
router.get("/api/online-booking", isLoggedIn, getUserOnlineBookings);
router.get("/api/online-booking/:id", isLoggedIn, getOnlineBooking);
router.put("/api/online-booking/:id", isLoggedIn, checkDateConflict, updateOnlineBooking);
router.delete("/api/online-booking/:id", isLoggedIn, deleteOnlineBooking);

module.exports = router;