const express = require("express");
const router = express.Router();

const getPlacesSuggestions = require("../middleware/getPlacesSuggestions");
const {
  providePlacesSuggestions,
  providePlacesDetails,
} = require("../controllers/providePlacesAutocomplete");
const getPlacesDetails = require("../middleware/getPlacesDetails");

router.post("/", getPlacesSuggestions, providePlacesSuggestions);
router.get("/:place_id", getPlacesDetails, providePlacesDetails);

module.exports = router;
