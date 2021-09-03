const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    tripId: { type: String, min: 2, max: 100, required: true, unique: true },
    tripName: { type: String, min: 2, max: 50 },
    tripStarts: { type: String, min: 2, max: 50 },
    tripEnds: { type: String, min: 2, max: 50 },
    destination: { type: String, min: 2, max: 50 },
    destinationCoords: { type: Object },
    trip: [{ type: Object }],
    createdAt: { type: String, min: 2, max: 50 },
    accommodation: { type: String, min: 2, max: 50 },
    accommodationCoords: { type: Object },
    transportation: { type: Object },
    userLocations: [{ type: Object }],
    trip: [{ type: Object }],
    rawDataPlaces: [{ type: Object }],
    durations: [{ type: Object }],
    timeSlotsByDay: [{ type: Object }],
    tripDays: [{ type: Object }],
    isStored: { type: String },
    email: { type: String, required: true }


    // 0: "tripId"
    // 1: "tripName"
    // 2: "tripStarts"
    // 3: "tripEnds"
    // 4: "destination"
    // 5: "destinationCoords"
    // 6: "createdAt"
    // 7: "accommodation"
    // 8: "accommodationCoords"
    // 9: "transportation"
    // 10: "userLocations"
    // 11: "trip"
    // 12: "rawDataPlaces"
    // 13: "durations"
    // 14: "timeSlotsByDay"
    // 15: "tripDays"
});


const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
