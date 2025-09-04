const Catering = require("../models/catering");
const EventDecoration = require("../models/eventDecoration");
const OnlineBooking = require("../models/onlineBooking");
const User = require("../models/user");

// Get all bookings for admin
exports.getAllBookings = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const [cateringBookings, decorationBookings, onlineBookings] = await Promise.all([
      Catering.find().populate('user', 'username email'),
      EventDecoration.find().populate('user', 'username email'),
      OnlineBooking.find().populate('user', 'username email')
    ]);

    res.json({
      catering: cateringBookings,
      decorations: decorationBookings,
      onlineBookings: onlineBookings,
    });
  } catch (error) {
    console.error('Error fetching admin bookings:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { type, id } = req.params;
    const { status, adminNotes } = req.body;

    let booking;
    let model;

    switch (type) {
      case 'catering':
        model = Catering;
        break;
      case 'decoration':
        model = EventDecoration;
        break;
      case 'onlineBooking':
        model = OnlineBooking;
        break;
      default:
        return res.status(400).json({ message: 'Invalid booking type' });
    }

    booking = await model.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    if (adminNotes) {
      booking.adminNotes = adminNotes;
    }

    await booking.save();
    await booking.populate('user', 'username email');

    res.json({ message: 'Booking status updated successfully', booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Server error while updating booking status' });
  }
};

// Get booking statistics
exports.getBookingStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const [cateringStats, decorationStats, onlineStats] = await Promise.all([
      Catering.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      EventDecoration.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      OnlineBooking.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ]);

    const totalUsers = await User.countDocuments();
    const totalBookings = cateringStats.reduce((sum, stat) => sum + stat.count, 0) +
                         decorationStats.reduce((sum, stat) => sum + stat.count, 0) +
                         onlineStats.reduce((sum, stat) => sum + stat.count, 0);
    
    res.json({
      catering: cateringStats,
      decorations: decorationStats,
      onlineBookings: onlineStats,
      totalUsers,
      totalBookings
    });
  } catch (error) {
    console.error('Error fetching booking stats:', error);
    res.status(500).json({ message: 'Server error while fetching statistics' });
  }
};