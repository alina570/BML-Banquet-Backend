const OnlineBooking = require("../models/onlineBooking");

// Create new online booking
exports.createOnlineBooking = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.user);
        const onlineBooking = new OnlineBooking({ ...req.body, user: req.user._id });
        await onlineBooking.save();
        res.status(201).json({ message: "Online booking created successfully", onlineBooking });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ 
                message: "This time slot is already booked" 
            });
        }
        console.error('Error creating online booking:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get all online bookings for logged in user
exports.getUserOnlineBookings = async (req, res) => {
    try {
        const onlineBookings = await OnlineBooking.find({ user: req.user._id });
        res.json(onlineBookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get specific online booking
exports.getOnlineBooking = async (req, res) => {
    try {
        const onlineBooking = await OnlineBooking.findOne({ 
            _id: req.params.id, 
            user: req.user._id 
        });
        if (!onlineBooking) {
            return res.status(404).json({ message: "Online booking not found" });
        }
        res.json(onlineBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update online booking
exports.updateOnlineBooking = async (req, res) => {
    try {
        const onlineBooking = await OnlineBooking.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!onlineBooking) {
            return res.status(404).json({ message: "Online booking not found" });
        }
        res.json({ message: "Online booking updated successfully", onlineBooking });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ 
                message: "This time slot is already booked" 
            });
        }
        res.status(500).json({ message: error.message });
    }
};

// Delete online booking
exports.deleteOnlineBooking = async (req, res) => {
    try {
        const onlineBooking = await OnlineBooking.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user._id 
        });
        if (!onlineBooking) {
            return res.status(404).json({ message: "Online booking not found" });
        }
        res.json({ message: "Online booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};