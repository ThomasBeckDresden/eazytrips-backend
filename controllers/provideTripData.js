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
    trip,
    rawDataPlaces,
    durations,
    timeSlots,
  };
  res.send(tripData);
};

module.exports = { provideTripDataFinal, provideTripDataRaw };
