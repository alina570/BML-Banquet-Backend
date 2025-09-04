const Catering = require("../models/catering");

// Create new catering booking
exports.createCatering = async (req, res) => {
    try {
        const catering = new Catering({ ...req.body, user: req.user._id });
        await catering.save();
        res.status(201).json({ message: "Catering service booked successfully", catering });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all catering bookings for logged in user
exports.getUserCaterings = async (req, res) => {
    try {
        const caterings = await Catering.find({ user: req.user._id });
        res.json(caterings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get specific catering booking
exports.getCatering = async (req, res) => {
    try {
        const catering = await Catering.findOne({ 
            _id: req.params.id, 
            user: req.user._id 
        });
        if (!catering) {
            return res.status(404).json({ message: "Catering booking not found" });
        }
        res.json(catering);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update catering booking
exports.updateCatering = async (req, res) => {
    try {
        const catering = await Catering.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!catering) {
            return res.status(404).json({ message: "Catering booking not found" });
        }
        res.json({ message: "Catering updated successfully", catering });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete catering booking
exports.deleteCatering = async (req, res) => {
    try {
        const catering = await Catering.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user._id 
        });
        if (!catering) {
            return res.status(404).json({ message: "Catering booking not found" });
        }
        res.json({ message: "Catering deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};