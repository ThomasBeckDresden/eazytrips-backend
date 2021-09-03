const axios = require("axios");
const fs = require("fs");
const path = require("path");
const duratinsNamed = require("../mockData/durationsNamed.json");

const getDurations = async (req, res, next) => {
  // provided by frontend
  const { rawDataPlaces, accommodationCoords, transportation } = req.body;
  const apiOpenRoutes = process.env.API_KEY_OPENROUTES;

  // build final list for duration matrix containing id and coords of candidate locations
  const rawDataPlacesFormat = rawDataPlaces.map((place) => {
    return {
      place_id: place.place_id,
      coords: [place.geometry.location.lng, place.geometry.location.lat],
    };
  });

  const accommodationFormat = {
    place_id: "accommodation",
    coords: [accommodationCoords.lng, accommodationCoords.lat],
  };

  const locationsFinal = [accommodationFormat, ...rawDataPlacesFormat];

  try {
    // fetch durations matrix for places
    // extract coords
    const locationsCoords = locationsFinal.map((location) => {
      return location.coords;
    });

    const headers = {
      Authorization: apiOpenRoutes,
    };
    const endpoint = "https://api.openrouteservice.org/v2/matrix/";

    // set profile: driving, cycling, walking
    let param;
    if (transportation.walking) {
      param = "foot-walking";
    } else if (transportation.public) {
      param = "driving-car";
    } else if (transportation.cycling) {
      param = "cycling-regular";
    } else {
      param = "foot-walking";
      req.body.transportation = { walking: true };
    }

    const { data: durationsRaw } = await axios.post(
      `${endpoint}${param}`,
      { locations: locationsCoords },
      { headers }
    );

    // restructure fetched durations matrix to include names of places
    const durations = durationsRaw.durations.map((place, index) => {
      return {
        source: locationsFinal[index].place_id,
        durations: place.map((duration, index) => {
          return {
            destination: locationsFinal[index].place_id,
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
