const Trip = require("../models/SaveTripSchema");


const save_trip = async (req, res) => {
    console.log("save_trip called");
    const {
        tripId,
        tripName,
        tripStarts,
        tripEnds,
        destination,
        destinationCoords,
        createdAt,
        accommodation,
        accommodationCoords,
        transportation,
        userLocations,
        trip,
        rawDataPlaces,
        durations,
        timeSlotsByDay,
        tripDays,
        email, } = req.body;
    try {
        let newtrip
        newtrip = new Trip({
            tripId,
            tripName,
            tripStarts,
            tripEnds,
            destination,
            destinationCoords,
            createdAt,
            accommodation,
            accommodationCoords,
            transportation,
            userLocations,
            trip,
            rawDataPlaces,
            durations,
            timeSlotsByDay,
            tripDays,
            email,
        });
        await newtrip.save()
        res.json(newtrip);
    } catch (e) {
        res.status(500).send("s");
    }
};

const get_all_trips = async (req, res) => {
    try {
        const trip = await Trip.find();
        res.json(trip);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

module.exports = { save_trip, get_all_trips };