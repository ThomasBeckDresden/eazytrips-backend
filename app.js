require("dotenv").config();
require('./database/client');

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const mockDataRouter = require("./routes/mock");
const tripRouter = require("./routes/trip");
const autocompleteRouter = require("./routes/autocomplete");


const userRouter = require("./routes/user");
const saveTripRouter = require("./routes/saveTrip");

const loadMockData = require("./utils/loadMockData");
const authenticationRouter = require("./routes/authentication");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(loadMockData);
app.use(cors({ "exposedHeaders": "x-authorization-token" }));

app.use('/save_trip', saveTripRouter);
app.use("/", indexRouter);
app.use("/mock", mockDataRouter);
app.use("/gettrip", tripRouter);
app.use("/autocomplete", autocompleteRouter);

app.use('/user', userRouter);
app.use('/auth', authenticationRouter);


module.exports = app;
