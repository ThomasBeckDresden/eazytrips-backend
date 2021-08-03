const express = require('express');
const router = express.Router();
const Trip = require("../models/SaveTripSchema");
const { save_trip, get_all_trips } = require("../controllers/saveTrip");



router.post('/', save_trip);
router.get('/', get_all_trips);

module.exports = router;