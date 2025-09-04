const EventDecoration = require("../models/eventDecoration");
const Catering = require("../models/catering");
const OnlineBooking = require("../models/onlineBooking");

// Check for date conflicts across all services
exports.checkDateConflict = async (req, res, next) => {
    try {
        const { dateOfEvent, eventSlot, serviceType } = req.body;
        
        // Check if the date is in the past
        if (new Date(dateOfEvent) < new Date()) {
            return res.status(400).json({ 
                message: 'Cannot book events in the past' 
            });
        }
        
        let conflict = false;
        let conflictingService = '';
        
        if (serviceType === 'decoration' || !serviceType) {
            const existingDecoration = await EventDecoration.findOne({ 
                dateOfEvent: new Date(dateOfEvent) 
            });
            
            if (existingDecoration) {
                conflict = true;
                conflictingService = 'Event Decoration';
            }
        }
        
        if (serviceType === 'catering' || !serviceType) {
            const existingCatering = await Catering.findOne({ 
                dateOfEvent: new Date(dateOfEvent) 
            });
            
            if (existingCatering) {
                conflict = true;
                conflictingService = 'Catering';
            }
        }
        
        if (serviceType === 'onlineBooking' || !serviceType) {
            const existingOnlineBooking = await OnlineBooking.findOne({ 
                dateOfEvent: new Date(dateOfEvent),
                eventSlot: eventSlot 
            });
            
            if (existingOnlineBooking) {
                conflict = true;
                conflictingService = 'Online Booking';
            }
        }
        
        if (conflict) {
            return res.status(409).json({ 
                message: `Time slot already booked for ${conflictingService}` 
            });
        }
        
        next();
    } catch (error) {
        console.error('Error checking date conflict:', error);
        res.status(500).json({ message: 'Server error while checking availability' });
    }
};