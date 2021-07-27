const express = require("express");
const router = express.Router();
const {
  validators,
  validateTripRequest,
} = require("../middleware/validateTripRequest");
const { provideTripData } = require("../controllers/provideTripData");
const getPlaces = require("../middleware/getPlaces");

router.post(
  "/",
  validators,
  validateTripRequest,
  getPlaces,
  //   getDistances,
  //   getOptimizedTrip,
  provideTripData
);

module.exports = router;
