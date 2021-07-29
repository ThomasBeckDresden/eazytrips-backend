const provideTripDataRaw = (req, res, next) => {
  const { tripDataRaw } = req.mockData;
  res.json(tripDataRaw);
};

const provideTripDataFinal = (req, res, next) => {
  const { tripData } = req.mockData;
  // const {
  //   tripId,
  //   tripName,
  //   tripStarts,
  //   tripEnds,
  //   destination,
  //   createdAt,
  //   accommodation,
  //   accommodationCoords,
  //   transportation,
  //   rawDataPlaces,
  //   userLocations,
  // } = req.body;

  // const { durations, timeSlots, trip } = req;

  // const tripData = {
  //   tripId,
  //   tripName,
  //   tripStarts,
  //   tripEnds,
  //   destination,
  //   createdAt,
  //   accommodation,
  //   accommodationCoords,
  //   transportation,
  //   userLocations,
  //   trip,
  //   rawDataPlaces,
  //   durations,
  //   timeSlots,
  // };
  res.json(tripData);
};

module.exports = { provideTripDataFinal, provideTripDataRaw };
