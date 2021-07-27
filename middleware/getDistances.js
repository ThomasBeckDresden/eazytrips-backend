const getDistances = (req, res, next) => {
  const { dataPlaces } = req;

  const axios = require("axios");

  // Get distance matrix from openroute service
  // try {
  //   const body = rankedList.map((place) => {
  //     return [place.geometry.location.lng, place.geometry.location.lat];
  //   });
  //   console.log(body);

  //   const headers = {
  //     Authorization: "5b3ce3597851110001cf6248f32199440de3471ba4fae231c14f9042",
  //   };
  //   console.log(headers);
  //   const endpoint = "https://api.openrouteservice.org/v2/matrix/";
  //   const param = "foot-walking";

  //   const { data } = await axios.post(
  //     `${endpoint}${param}`,
  //     { locations: body },
  //     { headers }
  //   );
  //   console.log(data);
  //   fs.writeFile("openRouteMatrix_gplacesNearbyBerlin.json", JSON.stringify(data), (err) => {
  //     if (err) throw err;
  //     console.log("The file has been saved!");
  //   });
  //   // remodel distance data:
  //   // const durations =
  //   // /   const distanceMatrix = awai
  // } catch (e) {
  //   console.log(e);
  // }
};
