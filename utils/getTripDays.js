const dayjs = require("dayjs");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

// spread trip calendar days in array where one index = one trip day
const getTripDays = (tripStarts, tripEnds) => {
  const tripStartsYMD = dayjs(tripStarts).format("YYYY-MM-DD");
  const tripEndsYMD = dayjs(tripEnds).format("YYYY-MM-DD");

  let date = tripStartsYMD;
  let tripDays = [];

  while (dayjs(date).isSameOrBefore(tripEndsYMD)) {
    // if first day of trip
    if (dayjs(date).isSame(tripStartsYMD)) {
      let tripDay = {
        date: tripStarts,
        dayStarts: dayjs(tripStarts),
        dayEnds: dayjs(tripStarts).endOf("day"),
      };
      tripDays = [...tripDays, tripDay];
    } else if (dayjs(date).isSame(tripEndsYMD)) {
      // if last day of trip
      let tripDay = {
        date: tripEnds,
        dayStarts: dayjs(tripEnds).startOf("day"),
        dayEnds: dayjs(tripEnds),
      };
      tripDays = [...tripDays, tripDay];
    } else {
      // all other days
      let tripDay = {
        date: dayjs(date).format("YYYY-MM-DDTHH:mm:ss"),
        dayStarts: dayjs(date).startOf("day"),
        dayEnds: dayjs(date).endOf("day"),
      };
      tripDays = [...tripDays, tripDay];
    }

    date = dayjs(date).add(1, "day");
  }

  return tripDays;
};

module.exports = getTripDays;
