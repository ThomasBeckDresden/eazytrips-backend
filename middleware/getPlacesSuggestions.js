const { default: axios } = require("axios");
const Diacritics = require("diacritic");

const getPlacesSuggestions = async (req, res, next) => {
  const { sessionToken, prefix, type } = req.body;
  const apiGoogle = process.env.API_KEY_GOOGLE;

  //   create session token in FRONTEND
  // make google places request, send data back
  const regex = /\W+/g;
  const prefixCleaned = Diacritics.clean(prefix || "")
    .toLowerCase()
    .trim()
    .replace(regex, "%20");

  try {
    if (prefix) {
      console.log("type is", type);
      const { data } =
        await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${prefixCleaned}&types=${
          type === "cities" ? "(cities)" : type
        }&key=${apiGoogle}&sessiontoken=${sessionToken}
      `);
      console.log("fetched autocomplete");
      console.log(data);
      req.placesSuggestions = data;
    }
    next();
  } catch (err) {
    console.log(err);
  }

  // req.placesSuggestions = mockCitySuggestions;
  // next();

  // on final selection in front-end: trigger google places details call with session token and id
};

module.exports = getPlacesSuggestions;
