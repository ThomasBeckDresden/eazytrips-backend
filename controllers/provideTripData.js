const provideTripData = (req, res, next) => {
  const { durations, timeSlots } = req;
  const tripData = {
    durations: durations,
    timeSlots: timeSlots,
  };
  res.send(tripData);
};

module.exports = { provideTripData };
