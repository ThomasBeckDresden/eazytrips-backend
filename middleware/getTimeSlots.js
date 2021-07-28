const dayjs = require("dayjs");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const getTripDays = require("../utils/getTripDays");
const getTimeSlotsByDay = require("../utils/getTimeSlotsByDay");

const getTimeSlots = (req, res, next) => {
  const { tripStarts, tripEnds } = req.body;

  //   define time slots
  const slotsTemplate = [
    {
      period: "morning",
      startsHour: 9,
      startsMin: 0,
      endsHour: 12,
      endsMin: 30,
    },
    {
      period: "afternoon",
      startsHour: 13,
      startsMin: 0,
      endsHour: 18,
      endsMin: 0,
    },
  ];

  // get datetime for each trip day
  const tripDays = getTripDays(tripStarts, tripEnds);

  // fit time slots to each trip day
  const timeSlotsByDay = getTimeSlotsByDay(tripDays, slotsTemplate);

  req.timeSlotsByDay = timeSlotsByDay.filter((day) => day !== undefined);
  next();
};

module.exports = getTimeSlots;
