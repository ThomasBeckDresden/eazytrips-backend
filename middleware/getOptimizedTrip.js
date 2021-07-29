const dayjs = require("dayjs");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);

const addLocationsToSlot = require("../utils/addLocationsToSlot");

//////////////////////////////////////////////////////////
// find optimal route between locations for one slot
//////////////////////////////////////////////////////////

const getOptimizedTrip = (req, res, next) => {
  const { durations, timeSlotsByDay } = req;
  const { rawDataPlaces, userLocations } = req.body;

  const trip = timeSlotsByDay.reduce(
    (acc, curr) => {
      // for each day, map over slots in day to get final list of locations to visit on that day
      console.log(curr.slots);
      const locationsByDay = curr.slots.reduce((accLocations, currSlot) => {
        const slotTime = currSlot.slotEnds.diff(currSlot.slotStarts, "second");
        // console.log("mapping over", slot.date);
        // console.log("acc.locationsVisited is", acc.locationsVisited);
        // console.log("slot Time is", slotTime);
        // console.log("ENTERING RECURSION FOR SLOT");

        // initialize function with accommodation address of user, arrival time=departure time
        const locations = addLocationsToSlot(
          currSlot.slotStarts,
          currSlot.slotStarts,
          slotTime,
          durations,
          currSlot,
          acc.locationsVisited,
          userLocations
        );

        // keep track locations already visited during trip
        acc.locationsVisited = [...locations.locationsVisited];

        return [...accLocations, ...locations.locationsInSlot];
      }, []);

      // build final object containing complete itinerary for SINGLE trip day
      // get highlights:
      // find the sight with the hightest user ranking in raw data places
      const highlightDay = locationsByDay.reduce(
        (acc, curr) => {
          const { rating } = rawDataPlaces.find(
            (place) => place.place_id === curr.place_id
          ) || { rating: 0 };

          return rating > acc.rating
            ? { rating: rating, place_id: curr.place_id }
            : { ...acc };
        },
        { rating: 0 }
      );

      const tripDay = {
        dayIndex: curr.dayIndex + 1,
        date: curr.date,
        locations: locationsByDay,
        highlight: highlightDay,
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
