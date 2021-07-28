const dayjs = require("dayjs");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const getTimeSlots = (req, res, next) => {
  const { tripStarts, tripEnds } = req.body;

  //   define time slots
  // check if starting time fits in slot, then assign slot (EDGE case: if tripStarts>slotStartingTime, set tripStarts as slotStart)
  // keep adding slots with Dates until slotEnd DateTime > tripEnds

  const tripStartsYMD = dayjs(tripStarts).format("YYYY-MM-DD");
  const tripEndsYMD = dayjs(tripEnds).format("YYYY-MM-DD");

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

  // spread trip calendar days in array where one index = one trip day
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

  const timeSlotsByDay = tripDays.reduce((acc, curr, index) => {
    const slots = slotsTemplate.map((slot) => {
      // convert each slot template time to actual datetime of current trip date in order to use date mnethods
      let slotStartsDate = dayjs(curr.date)
        .hour(slot.startsHour)
        .minute(slot.startsMin);
      let slotEndsDate = dayjs(curr.date)
        .hour(slot.endsHour)
        .minute(slot.endsMin);

      // for full days
      if (
        slotStartsDate.isSameOrAfter(curr.dayStarts) &&
        slotEndsDate.isSameOrBefore(curr.dayEnds)
      ) {
        const slotFinal = {
          period: slot.period,
          date: curr.date,
          slotStarts: slotStartsDate,
          slotEnds: slotEndsDate,
        };
        return slotFinal;
      }

      // for days when trip start is after slot start, e.g. arrival days
      if (
        slotStartsDate.isSameOrBefore(curr.dayStarts) &&
        slotEndsDate.isSameOrAfter(curr.dayStarts)
      ) {
        const slotFinal = {
          period: slot.period,
          date: curr.date,
          slotStarts: curr.dayStarts,
          slotEnds: slotEndsDate,
        };
        return slotFinal;
      }

      // for days when trip ends is before slot ends, e.g. departute days
      if (
        slotStartsDate.isSameOrBefore(curr.dayEnds) &&
        slotEndsDate.isSameOrAfter(curr.dayEnds)
      ) {
        const slotFinal = {
          period: slot.period,
          date: curr.date,
          slotStarts: slotStartsDate,
          slotEnds: curr.dayEnds,
        };
        return slotFinal;
      }
    });

    const dayWithSlots = {
      dayIndex: index,
      date: curr.date,
      slots: slots,
    };

    return [...acc, dayWithSlots];
  }, []);

  req.timeSlotsByDay = timeSlotsByDay.filter((day) => day !== undefined);
  next();
};

module.exports = getTimeSlots;
