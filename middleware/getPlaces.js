const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const dayjs = require("dayjs");
const Diacritics = require("diacritic");

const getPlaces = async (req, res, next) => {
  const {
    tripName,
    destination,
    tripStarts,
    tripEnds,
    accommodation,
    transportation,
  } = req.body;
  const apiGoogle = process.env.API_KEY_GOOGLE;

  // Check user input: if adress provided, use address:
  // convert into correct url string before sending data: escape all special characters
  //   const convertUserAdress =
  // else use city center of destination: MVP, ONLY THIS

  try {
    let dataPlaces;
    let destinationCoords;
    let destinationAddress;
    let accommodationAddress;
    let accommodationCoords;
    const radius = transportation.public ? 10000 : 5000;

    if (!accommodation) {
      // set accommodation adress to destination
      const regex = /\W+/g;
      accommodationAddress = Diacritics.clean(destination)
        .toLowerCase()
        .trim()
        .replace(regex, "%20");

      // get coords of accommodation = destination coords, accommodation adress = destination address
      const { data: dataGeocode } = await axios(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${accommodationAddress}&key=${apiGoogle}`
      );
      accommodationCoords = dataGeocode.results[0].geometry.location;
      accommodationAddress = dataGeocode.results[0].formatted_address;
      destinationCoords = dataGeocode.results[0].geometry.location;
      destinationAddress = dataGeocode.results[0].formatted_address;

      // get places for destination with coords = accommodation coords
      const { data } = await axios(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${destinationCoords.lat}, ${destinationCoords.lng}&radius=${radius}&type=tourist_attraction&key=${apiGoogle}`
      );
      dataPlaces = data;
    } else {
      // if accommodation is provided: get coords for accommodation and destination
      const regex = /\W+/g;
      accommodationAddress = Diacritics.clean(accommodation)
        .toLowerCase()
        .trim()
        .replace(regex, "%20");

      // get coords of accommodation + address
      const { data: dataGeocodeAccommodation } = await axios(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${accommodationAddress}&key=${apiGoogle}`
      );
      accommodationCoords =
        dataGeocodeAccommodation.results[0].geometry.location;
      accommodationAddress =
        dataGeocodeAccommodation.results[0].formatted_address;

      // get destination coords + adress
      accommodationAddress = Diacritics.clean(destination)
        .toLowerCase()
        .trim()
        .replace(regex, "%20");

      const { data: dataGeocodeDestination } = await axios(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=${apiGoogle}`
      );
      destinationCoords = dataGeocodeDestination.results[0].geometry.location;
      destinationAddress = dataGeocodeDestination.results[0].formatted_address;

      // get nearby places
      const { data } = await axios(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${destinationCoords.lat}, ${destinationCoords.lng}&radius=${radius}&type=tourist_attraction&key=${apiGoogle}`
      );
      dataPlaces = data;
    }

    console.log(dataPlaces);
    // create final data structure
    const tripDataRaw = {
      tripId: uuidv4(),
      tripName: tripName,
      tripStarts: tripStarts,
      tripEnds: tripEnds,
      destination: destinationAddress,
      destinationCoords: destinationCoords,
      createdAt: dayjs(),
      accommodation: accommodationAddress,
      accommodationCoords: accommodationCoords,
      transportation: transportation,
      rawDataPlaces: dataPlaces.results,
    };

    req.tripDataRaw = tripDataRaw;
    next();
  } catch (e) {
    console.log(e.message);
    res.status(404).send(e);
  }
};

module.exports = getPlaces;
