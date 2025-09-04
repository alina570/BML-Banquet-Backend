const { set } = require("mongoose");
const Event = require("../models/event");
const User = require("../models/user");
const sendEmail = require("../sendEmail");

// Get Events
exports.getEvents = async (req, res) => {
  try {
    const allEvents = await Event.find({});
    res.send(allEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      date,
      imageURL,
    } = req.body;
    if (
      !title ||
      !description ||
      !location ||
      !date ||
      !imageURL
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const capacity = Number(req.body.capacity);
    const bookedSeats = Number(req.body.bookedSeats);
   
    if (bookedSeats > capacity) {
      return res.status(400).json({ message: "Booked Seats must be lower than cpacity" });
    }

    const newEvent = new Event({
      title,
      description,
      location,
      date,
      capacity,
      bookedSeats,
      imageURL,
    });

    newEvent.createdBy = req.user.id;
    await newEvent.save();

    res
      .status(201)
      .json({ message: "User saved successfully", user: newEvent });
  } catch (error) {
    console.error("Error creating new event:", error);
    res.status(500).json({ message: error.message });
  }
};

// Book Seat
exports.bookSeat = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.id;
  const userEmail = req.user.email;

  try {
    const event = await Event.findById(eventId);
    console.log(event);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.bookedSeats >= event.capacity) {
      return res.status(400).json({ message: "Event is fully booked" });
    }

    if (event.usersBooked.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already booked this event" });
    }

    event.bookedSeats += 1;
    event.usersBooked.push(userId);

    await event.save();

    // Send confirmation email
    const emailSubject = `Booking Confirmation for ${event.title}`;
    const emailText = `Hi there,\n\nYour booking for the event "${event.title}" is confirmed.\n\nEvent Details:\n- Location: ${event.location}\n- Date: ${new Date(event.date).toLocaleString()}\n\nThank you!`;
    await sendEmail(userEmail, emailSubject, emailText);

    res.status(200).json({ message: "Seat booked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

//Booked Events
exports.bookedEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookedEvents = await Event.find({ usersBooked: userId }).populate(
      "usersBooked"
    );
    res.status(200).json(bookedEvents);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//Edit Route
exports.editEvents = async (req, res) => {
  const eventId = req.params.eventId;
  const updateData = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData);
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res
      .status(200)
      .json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

//Delete Events
exports.deleteEvents = async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res
      .status(200)
      .json({ message: "Event deleted successfully", deletedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};

//Booked Events Delete
exports.cancelBooking = async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const { user } = req.body;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const userIndex = event.usersBooked.indexOf(user);

    if (userIndex === -1) {
      return res
        .status(400)
        .json({ message: "User has not booked this event" });
    }

    event.usersBooked.splice(userIndex, 1);
    event.bookedSeats -= 1;
    await event.save();
    res.status(200).json({ message: "Booking canceled successfully", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
