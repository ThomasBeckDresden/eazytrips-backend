const mockDataRaw = require("./mockData/mockDataRawBarca.json");
const mockDataTrip = require("./mockData/mockDataTripBarca.json");

const loadMockData = (req, res, next) => {
  req.mockData = { tripDataRaw: mockDataRaw, tripData: mockDataTrip };
  next();
};

module.exports = loadPokemonData;
