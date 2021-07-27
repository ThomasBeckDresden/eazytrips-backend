const { check, validationResult } = require("express-validator");

const validators = [
  check("destination").notEmpty().isAlpha(),
  check("dateTimeTripStart").notEmpty().isISO8601(),
  check("dateTimeTripEnd").notEmpty().isISO8601(),
];

const validateTripRequest = (req, res, next) => {
  const errors = validationResult(req);

  // TO DO: Hand error handling over to express error handling fn
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = { validators, validateTripRequest };
