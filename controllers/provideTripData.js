const provideTripDataRaw = (req, res, next) => {
  const { tripDataRaw } = req;
  res.json(tripDataRaw);
};

const provideTripDataFinal = (req, res, next) => {
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
    rawDataPlaces,
    userLocations,
  } = req.body;

  const { durations, timeSlots, trip, timeSlotsByDay, tripDays } = req;

  const tripData = {
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
  };

  const tripDataNoAccomm = tripData.trip.map((day) => {
    const locationNoAccomm = day.locations.filter(
      (location) => location.place_id !== "accommodation"
    );
    return { ...day, locations: locationNoAccomm };
  });

  res.json({ ...tripData, trip: tripDataNoAccomm });
};

module.exports = { provideTripDataFinal, provideTripDataRaw };
