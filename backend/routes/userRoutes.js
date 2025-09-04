const express = require("express");
const { loginUser, signupUser, logout, getUser, getUserBookings, forgotPassword, resetPassword, supportForm } = require("../controllers/userController");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn } = require("../middleware/authMiddleware");


router.post("/api/signup", signupUser); // Create User
router.post("/api/login", loginUser); // User Login
router.get("/api/logout" , logout) // logout
router.get("/api/getUser" , getUser)
router.get("/api/user/bookings", isLoggedIn, getUserBookings);
router.post("/api/forgot-password", forgotPassword); // Forgot password
router.post("/api/reset-password/:token", resetPassword); // Reset password
router.post('/api/support', supportForm);


module.exports = router;