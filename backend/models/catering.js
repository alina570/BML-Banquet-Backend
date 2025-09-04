const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cateringSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true,
        enum: ['Wedding', 'Birthday', 'Corporate', 'Anniversary', 'Other']
    },
    dateOfEvent: {
        type: Date,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true,
        min: 1
    },
    menuPreferences: {
        type: String,
        required: true
    },
    cateringType: [{
        type: String,
        required: true
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
        status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending'
    },
    adminNotes: {
        type: String,
        default: ''
    }
}, { timestamps: true });

// Compound index to prevent double bookings for the same date
cateringSchema.index({ dateOfEvent: 1 }, { unique: false });

module.exports = mongoose.model('Catering', cateringSchema);