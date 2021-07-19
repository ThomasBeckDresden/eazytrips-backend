const express = require("express");
const router = express.Router();
const mockData = require("../public/mock_data.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json(mockData);
});

module.exports = router;
