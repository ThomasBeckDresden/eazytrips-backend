const axios = require("axios");

const getPlacesDetails = async (req, res, next) => {
  const { place_id } = req.params;
  console.log("place_id in getplacesdetails is", place_id);
  const apiGoogle = process.env.API_KEY_GOOGLE;

  try {
    const { data: place_details } =
      await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=formatted_address,geometry&key=${apiGoogle}
      `);
    console.log(place_details);
    const placeAddress = place_details.result.formatted_address;
    const placeCoords = place_details.result.geometry.location;
    req.tripDataRaw = { placeAddress, placeCoords };
    next();
  } catch (err) {
    console.log(err);
  }

  req.place_details = place_id;
  next();
};

module.exports = getPlacesDetails;
