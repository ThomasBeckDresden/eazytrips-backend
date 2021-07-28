const provideTripDataRaw = (req, res, next) => {
  const { tripDataRaw } = req;
  res.send(tripDataRaw);
};

const provideTripDataFinal = (req, res, next) => {
  const {
    tripId,
    tripName,
    tripStarts,
    tripEnds,
    destination,
    createdAt,
    accommodation,
    accommodationCoords,
    transportation,
    rawDataPlaces,
    userLocations,
  } = req.body;

  const { durations, timeSlots, trip } = req;

  const tripData = {
    tripId,
    tripName,
    tripStarts,
    tripEnds,
    destination,
    createdAt,
    accommodation,
    accommodationCoords,
    transportation,
    userLocations,
    trip,
    rawDataPlaces,
    durations,
    timeSlots,
  };
  res.send(tripData);
};

module.exports = { provideTripDataFinal, provideTripDataRaw };
