const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/authMiddleware");
const { checkDateConflict } = require("../middleware/bookingMiddleware");
const {
    createCatering,
    getUserCaterings,
    getCatering,
    updateCatering,
    deleteCatering
} = require("../controllers/cateringController");

router.post("/api/catering", isLoggedIn, checkDateConflict, createCatering);
router.get("/api/catering", isLoggedIn, getUserCaterings);
router.get("/api/catering/:id", isLoggedIn, getCatering);
router.put("/api/catering/:id", isLoggedIn, checkDateConflict, updateCatering);
router.delete("/api/catering/:id", isLoggedIn, deleteCatering);

module.exports = router;