const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const onlineBookingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    dateOfEvent: {
      type: Date,
      required: true,
    },
    eventSlot: {
      type: String,
      required: true,
      enum: [
        "Morning (9AM-12PM)",
        "Afternoon (1PM-4PM)",
        "Evening (6PM-9PM)",
        "Night (10PM-2AM)",
      ],
    },
    eventType: {
      type: String,
      required: true,
      enum: ["Wedding", "Birthday", "Corporate", "Anniversary", "Other"],
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: 1,
    },
    decorationType: [
      {
        type: String,
      },
    ],
    cateringType: [
      {
        type: String,
      },
    ],
    soundLighting: [{
      type: String,
      required: false
    }],
    // NEW FIELD: Banquet selection
    banquetName: {
      type: String,
      required: true,
    },
    banquetCity: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
    adminNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Compound index to prevent double bookings for the same date, time slot, and banquet
onlineBookingSchema.index({ 
  dateOfEvent: 1, 
  eventSlot: 1, 
  banquetName: 1 
}, { unique: true });

module.exports = mongoose.model("OnlineBooking", onlineBookingSchema);