const providePlacesSuggestions = (req, res) => {
  const { placesSuggestions } = req;
  res.json(placesSuggestions);
};

const providePlacesDetails = (req, res) => {
  const { tripDataRaw } = req;
  res.json(tripDataRaw);
};

module.exports = { providePlacesDetails, providePlacesSuggestions };
