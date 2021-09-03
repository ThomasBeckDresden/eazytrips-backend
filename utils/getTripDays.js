const dayjs = require("dayjs");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const utc = require("dayjs/plugin/utc");

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);

// spread trip calendar days in array where one index = one trip day
const getTripDays = (tripStarts, tripEnds) => {
  tripStarts = dayjs.utc(tripStarts);
  tripEnds = dayjs.utc(tripEnds);

  const tripStartsYMD = tripStarts.startOf("day");
  const tripEndsYMD = tripEnds.endOf("day");

  let date = tripStartsYMD;
  let tripDays = [];

  while (date.isSameOrBefore(tripEndsYMD, "day")) {
    // if first day of trip
    if (date.isSame(tripStartsYMD)) {
      let tripDay = {
        date: date,
        dayStarts: tripStarts,
        dayEnds: tripStarts.endOf("day"),
      };
      tripDays = [...tripDays, tripDay];
    } else if (date.isSame(tripEndsYMD, "day")) {
      // if last day of trip
      let tripDay = {
        date: date,
        dayStarts: tripEnds.startOf("day"),
        dayEnds: tripEnds,
      };
      tripDays = [...tripDays, tripDay];
    } else {
      // all other days
      let tripDay = {
        date: date,
        dayStarts: date.startOf("day"),
        dayEnds: date.endOf("day"),
      };
      tripDays = [...tripDays, tripDay];
    }

    date = dayjs.utc(date).add(1, "day");
  }

  return tripDays;
};

module.exports = getTripDays;
