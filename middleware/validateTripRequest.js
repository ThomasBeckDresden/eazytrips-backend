const { check, validationResult } = require("express-validator");

const validatorsInitialRequest = [
  check("destination").notEmpty(),
  check("tripStarts").notEmpty().isISO8601(),
  check("tripEnds").notEmpty().isISO8601(),
];

const validatorsUpdatedRequest = [
  check("tripId").notEmpty(),
  check("createdAt").notEmpty().isISO8601(),
  check("destination").notEmpty(),
  check("tripStarts").notEmpty().isISO8601(),
  check("tripEnds").notEmpty().isISO8601(),
  check("accommodationCoords").notEmpty().isObject(),
  check("rawDataPlaces").notEmpty().isArray({ min: 1 }),
];

const validateTripRequest = (req, res, next) => {
  const errors = validationResult(req);

  // TO DO: Hand error handling over to express error handling fn
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = {
  validatorsInitialRequest,
  validatorsUpdatedRequest,
  validateTripRequest,
};
