const dayjs = require("dayjs");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);

//////////////////////////////////////////////////////////
// find optimal route between locations for one slot
//////////////////////////////////////////////////////////

const getOptimizedTrip = (req, res, next) => {
  const { durations, timeSlots } = req;
  const { rawDataPlaces } = req.body;

  const tripLocations = timeSlots.reduce(
    (slot) => {
      let locationsInSlot = [];

      const slotTime = slot.slotEnds.diff(slot.slotStarts, "second");

      addLocationsToSlot(
        "ChIJjRbDOf1RqEcRNoyAtT2-8P0",
        0,
        durations,
        0,
        locationsInSlot,
        slotTime
      );
    },
    { locationsVisited: [], locationsBySlot: [] }
  );

  console.log(findRoute(rankedList));

  /////////////////////////////////////////////////////////
  //Helper function: Recursively add new locations to slot
  ///////////////////////////////////////////////////////////

  function addLocationsToSlot(
    currentSightId,
    totalSightsTime,
    durations,
    durationToNext,
    locationsInSlot,
    locationsVisited,
    slotTime
  ) {
    // add current sight to slot if travel time to destination + visit time
    // below slot time (NOT IMPLEMENTED)
    locationsInSlot.push({
      sightId: currentSightId,
      durationTo: durationToNext,
    });

    locationsVisited.push({
      sightId: currentSightId,
      durationTo: durationToNext,
    });

    // Calculate durationsListRanked to all other sites ranked by durations;
    let durationsListRanked = durations.find(
      (durationList) => durationList.source === currentSightId
    ).durations;

    durationsListRanked.sort((a, b) => {
      if (a.duration < b.duration) return -1;
      if (a.duration > b.duration) return 1;
      return 0;
    });

    console.log(
      "###############################################################"
    );
    console.log(durationsListRanked);

    console.log(`starting point is location nr ${currentSightId} 
      durations list ranked is ${durationsListRanked}
      totalSightTime is ${totalSightsTime}
      locations in Slot are ${locationsInSlot}`);

    // FOR EACH sight in durationsList:
    for (const nextSight of durationsListRanked) {
      const nextSightId = nextSight.destination;
      console.log(`nextSight in for each is ${nextSightId}`);

      // Check if potential next sight has not been visited yet and is not equal to current sight
      if (
        !locationsInSlot.filter((location) => location.sightId === nextSightId)
          .length &&
        nextSightId !== currentSightId
      ) {
        // Calculate travel time to next site
        durationToNext = durationsListRanked.find(
          (entry) => entry.destination === nextSightId
        ).duration;

        // calculate total time for sights in slot -> MUST INCLUDE ALSO VISIT TIME
        // in final version
        totalSightsTime += durationToNext;

        // if still time left in slot:
        if (totalSightsTime < slotTime) {
          return addLocationsToSlot(
            nextSightId,
            totalSightsTime,
            durations,
            durationToNext,
            locationsInSlot,
            slotTime
          );
        }

        // if visit time for next sight exceeds slot time, go to nth - closest sight and repeat all steps
      }
    }
    return;
  }
};
