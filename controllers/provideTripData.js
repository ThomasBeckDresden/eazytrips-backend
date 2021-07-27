const provideTripData = (req, res, next) => {
  const { tripData } = req;
  res.send(tripData);
};

module.exports = { provideTripData };
