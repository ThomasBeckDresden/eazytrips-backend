const express = require("express");
const router = express.Router();
const {
  validatorsInitialRequest,
  validatorsUpdatedRequest,
  validateTripRequest,
} = require("../middleware/validateTripRequest");
const {
  provideTripDataRaw,
  provideTripDataFinal,
} = require("../controllers/provideTripData");
const getPlaces = require("../middleware/getPlaces");
const getDurations = require("../middleware/getDurations");
const getTimeSlots = require("../middleware/getTimeSlots");
const getOptimizedTrip = require("../middleware/getOptimizedTrip");

// Initial request with destination, dates etc
router.post(
  "/",
  // validatorsInitialRequest,
  // validateTripRequest,
  // getPlaces,
  provideTripDataRaw
);

// Updated request containing updated trip data
router.put(
  "/",
  // validatorsUpdatedRequest,
  // validateTripRequest,
  // getDurations,
  // getTimeSlots,
  // getOptimizedTrip,
  provideTripDataFinal
);

module.exports = router;
