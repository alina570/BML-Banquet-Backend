const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/authMiddleware");
const { checkDateConflict } = require("../middleware/bookingMiddleware");
const {
    createDecoration,
    getUserDecorations,
    getDecoration,
    updateDecoration,
    deleteDecoration
} = require("../controllers/decorationController");

router.post("/api/decoration", isLoggedIn, checkDateConflict, createDecoration);
router.get("/api/decoration", isLoggedIn, getUserDecorations);
router.get("/api/decoration/:id", isLoggedIn, getDecoration);
router.put("/api/decoration/:id", isLoggedIn, checkDateConflict, updateDecoration);
router.delete("/api/decoration/:id", isLoggedIn, deleteDecoration);

module.exports = router;