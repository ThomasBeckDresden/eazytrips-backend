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

  const tripDataNoAccomm = tripData.trip.map((day) => {
    const locationNoAccomm = day.locations.filter(
      (location) => location.place_id !== "accommodation"
    );
    return { ...day, locations: locationNoAccomm };
  });

  res.json({ ...tripData, trip: tripDataNoAccomm });
};

module.exports = { provideTripDataFinal, provideTripDataRaw };
