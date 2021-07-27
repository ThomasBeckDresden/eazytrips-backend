const axios = require("axios");
const fs = require("fs");
const path = require("path");
const duratinsNamed = require("../mockData/durationsNamed.json");

const getDurations = async (req, res, next) => {
  // provided by frontend
  const { rawDataPlaces, accommodationCoords } = req.body;
  const apiOpenRoutes = process.env.API_KEY_OPENROUTES;

  try {
    // get coords of places in list
    const body = rawDataPlaces.map((place) => {
      return [place.geometry.location.lng, place.geometry.location.lat];
    });

    // add accomodation as first item
    body.unshift([accommodationCoords.lng, accommodationCoords.lat]);

    // fetch durations matrix for places
    const headers = {
      Authorization: apiOpenRoutes,
    };
    const endpoint = "https://api.openrouteservice.org/v2/matrix/";
    const param = "foot-walking";

    const { data: durationsRaw } = await axios.post(
      `${endpoint}${param}`,
      { locations: body },
      { headers }
    );

    // restructure durations matrix to include names of places
    const durations = durationsRaw.durations.map((location, index) => {
      return {
        source:
          index === 0 ? "accommodation" : rawDataPlaces[index - 1].place_id,
        durations: location.map((duration, index) => {
          return {
            destination:
              index === 0 ? "accommodation" : rawDataPlaces[index - 1].place_id,
            duration,
          };
        }),
      };
    });

    req.durations = durations;
    next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = getDurations;
