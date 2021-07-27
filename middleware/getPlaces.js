const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const tripDataMock = require("../mockData/gplacesNearbyBerlin.json");
const dayjs = require("dayjs");

const getPlaces = async (req, res, next) => {
  const { destination, tripStarts, tripEnds, accommodation, transportion } =
    req.body;
  const apiGoogle = process.env.API_KEY_GOOGLE;

  // Check user input: if adress provided, use address:
  // convert into correct url string before sending data: escape all special characters
  //   const convertUserAdress =
  // else use city center of destination: MVP, ONLY THIS

  try {
    // get geocoded adress
    // const { data: dataGeocode } = await axios(
    //   `https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=${apiGoogle}`
    // );
    // const coords = dataGeocode.results[0].geometry.location;
    // console.log(coords);

    // // get nearby places:
    // //  use geocoded adress to query googleplaces within X radius
    // // calculate radius according to preferred means of transport
    // const radius = transportion.public ? 10000 : 5000;
    // console.log(radius);
    // MVP = 5km

    // const { data: dataPlaces } = await axios(
    //   `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.lat}, ${coords.lng}&radius=${radius}&type=tourist_attraction&key=${apiGoogle}`
    // );

    // console.log(dataPlaces);

    // create final data structure
    const tripData = {
      tripId: uuidv4(),
      tripStarts: tripStarts,
      tripEnds: tripEnds,
      destination: destination,
      createdAt: dayjs(),
      accommodation: accommodation,
      // replace this with "coords" in final version
      accommodationCoords: { lat: 52.5039563, lng: 13.3981579 },
      transportation: transportion,

      rawDataPlaces: tripDataMock.results,
    };

    console.log(tripData);

    req.tripData = tripData;
    next();
  } catch (e) {
    console.log(e.message);
    res.status(404).send(e);
  }
};

module.exports = getPlaces;
