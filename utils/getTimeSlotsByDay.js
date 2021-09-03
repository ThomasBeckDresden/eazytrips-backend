const dayjs = require("dayjs");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const utc = require("dayjs/plugin/utc");

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);

const getTimeSlotsByDay = (tripDays, slotsTemplate) => {
  return tripDays.reduce((acc, curr, index) => {
    const slots = slotsTemplate.map((slot) => {
      // convert each slot template time to actual datetime of current trip date in order to use date mnethods
      let slotStartsDate = dayjs
        .utc(curr.date)
        .hour(slot.startsHour)
        .minute(slot.startsMin);
      let slotEndsDate = dayjs
        .utc(curr.date)
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

    // remove undefined slots
    const slotsFiltered = slots.filter((slot) => slot !== undefined);

    const dayWithSlots = {
      dayIndex: index,
      date: curr.date,
      slots: slotsFiltered,
    };

    return [...acc, dayWithSlots];
  }, []);
};

module.exports = getTimeSlotsByDay;
