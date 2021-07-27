const dayjs = require("dayjs");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);

const addLocationsToSlot = require("../utils/addLocationsToSlot");

//////////////////////////////////////////////////////////
// find optimal route between locations for one slot
//////////////////////////////////////////////////////////

const getOptimizedTrip = (req, res, next) => {
  const { durations, timeSlotsByDay } = req;
  const { rawDataPlaces } = req.body;

  const trip = timeSlotsByDay.reduce(
    (acc, curr) => {
      // for each day, map over slots in day to get final list of locations to visit on that day

      const locations = curr.slots.map((slot) => {
        const slotTime = slot.slotEnds.diff(slot.slotStarts, "second");
        // console.log("mapping over", slot.date);
        // console.log("acc.locationsVisited is", acc.locationsVisited);
        // console.log("slot Time is", slotTime);
        // console.log("ENTERING RECURSION FOR SLOT");

        // initialize function with accommodation address of user, arrival time=departure time
        const locations = addLocationsToSlot(
          slot.slotStarts,
          slot.slotStarts,
          slotTime,
          durations,
          slot,
          acc.locationsVisited
        );

        // keep track locations already visited during trip
        acc.locationsVisited = [...locations.locationsVisited];

        return locations.locationsInSlot;
      });

      // build final object containing complete itinerary for SINGLE trip day
      const tripDay = {
        dayIndex: curr.dayIndex,
        date: curr.date,
        locations: locations,
      };

      // filter out from visited locations accommodation since it should be used again on next day as starting point
      acc.locationsVisited = [...acc.locationsVisited].filter(
        (location) => location !== "accommodation"
      );

      // build final array containing complete itinerary for ALL trip day
      acc.tripData = [...acc.tripData, tripDay];
      return acc;
    },
    { locationsVisited: [], tripData: [] }
  );

  req.trip = trip.tripData;
  next();
};

module.exports = getOptimizedTrip;
