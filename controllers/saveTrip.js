const Trip = require("../models/SaveTripSchema");


const save_trip = async (req, res) => {
    console.log("save_trip called");
    const token = (req.headers.authorization)
    console.log(token)
    const secretKey = process.env.JWT_SECRET;
    const userInfo = jwt.verify(token, secretKey);
    const email = userInfo.email;
    console.log(userInfo);
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
    } = req.body;
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
        res.status(500).send(e.message);
    }
};

const get_all_trips = async (req, res) => {
    try {
        const trip = await Trip.find();
        res.json(trip);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

module.exports = { save_trip, get_all_trips };