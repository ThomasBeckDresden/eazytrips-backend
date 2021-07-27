const provideTripData = (req, res, next) => {
  const { durations, timeSlots, trip } = req;
  const tripData = {
    trip: trip,
    durations: durations,
    timeSlots: timeSlots,
  };
  res.send(tripData);
};

module.exports = { provideTripData };
