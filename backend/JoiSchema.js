const Joi = require('joi');

// Event Decoration Schema
const eventDecorationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    eventType: Joi.string().valid('Wedding', 'Birthday', 'Corporate', 'Anniversary', 'Other').required(),
    dateOfEvent: Joi.date().greater('now').required(),
    numberOfGuests: Joi.number().min(1).required(),
    decorationType: Joi.array().items(Joi.string()).min(1).required()
});

// Catering Schema
const cateringSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    eventType: Joi.string().valid('Wedding', 'Birthday', 'Corporate', 'Anniversary', 'Other').required(),
    dateOfEvent: Joi.date().greater('now').required(),
    numberOfGuests: Joi.number().min(1).required(),
    menuPreferences: Joi.string().required(),
    cateringType: Joi.array().items(Joi.string()).min(1).required()
});

// Online Booking Schema
const onlineBookingSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    dateOfEvent: Joi.date().greater('now').required(),
    eventSlot: Joi.string().valid('Morning (9AM-12PM)', 'Afternoon (1PM-4PM)', 'Evening (6PM-9PM)', 'Night (10PM-2AM)').required(),
    eventType: Joi.string().valid('Wedding', 'Birthday', 'Corporate', 'Anniversary', 'Other').required(),
    numberOfGuests: Joi.number().min(1).required(),
    decorationType: Joi.array().items(Joi.string()),
    cateringType: Joi.array().items(Joi.string()),
    soundLighting: Joi.string().allow('')
});

module.exports = {
    eventDecorationSchema,
    cateringSchema,
    onlineBookingSchema
};