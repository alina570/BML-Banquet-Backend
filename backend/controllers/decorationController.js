const EventDecoration = require("../models/eventDecoration");

// Create new decoration booking
exports.createDecoration = async (req, res) => {
    try {
        const decoration = new EventDecoration({ ...req.body, user: req.user._id });
        await decoration.save();
        res.status(201).json({ message: "Event decoration booked successfully", decoration });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all decoration bookings for logged in user
exports.getUserDecorations = async (req, res) => {
    try {
        const decorations = await EventDecoration.find({ user: req.user._id });
        res.json(decorations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get specific decoration booking
exports.getDecoration = async (req, res) => {
    try {
        const decoration = await EventDecoration.findOne({ 
            _id: req.params.id, 
            user: req.user._id 
        });
        if (!decoration) {
            return res.status(404).json({ message: "Decoration booking not found" });
        }
        res.json(decoration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update decoration booking
exports.updateDecoration = async (req, res) => {
    try {
        const decoration = await EventDecoration.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!decoration) {
            return res.status(404).json({ message: "Decoration booking not found" });
        }
        res.json({ message: "Decoration updated successfully", decoration });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete decoration booking
exports.deleteDecoration = async (req, res) => {
    try {
        const decoration = await EventDecoration.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user._id 
        });
        if (!decoration) {
            return res.status(404).json({ message: "Decoration booking not found" });
        }
        res.json({ message: "Decoration deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};