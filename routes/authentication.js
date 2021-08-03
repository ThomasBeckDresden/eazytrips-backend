const express = require("express");
const authenticationRouter = express.Router();

const { login } = require("../controllers/authenticationController");

authenticationRouter.post("/login", login);

module.exports = authenticationRouter;