const { default: axios } = require("axios");
const mockCitySuggestions = require("../mockData/mockCitySuggestions.json");

const getPlacesSuggestions = async (req, res, next) => {
  const { sessionToken, prefix } = req.body;
  const apiGoogle = process.env.API_KEY_GOOGLE;

  //   create session token in FRONTEND
  // make google places request, send data back

  //   try {
  //     if (prefix) {
  //       const { data } =
  //         await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${prefix}&types=(cities)&key=${apiGoogle}&sessiontoken=${sessionToken}
  //     `);
  //       console.log("fetched autocomplete");
  //       console.log(data);
  //       req.placesSuggestions = data;
  //     }
  //     next();
  //   } catch (err) {
  //     console.log(err);
  //   }

  req.placesSuggestions = mockCitySuggestions;
  next();

  // on final selection in front-end: trigger google places details call with session token and id
};

module.exports = getPlacesSuggestions;
