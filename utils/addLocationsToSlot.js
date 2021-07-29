const dayjs = require("dayjs");

/////////////////////////////////////////////////////////
//Recursively add new locations to slot
///////////////////////////////////////////////////////////

function addLocationsToSlot(
  arrivalTime,
  departureTime,
  slotTime,
  durations,
  slotMetaInfo,
  locationsVisited,
  userLocations,
  durationToPrevious = 0,
  sightTime = 0,
  totalSightsTime = 0,
  currentSightId = "accommodation",
  locationsInSlot = []
) {
  // add sight to slot
  if (!locationsVisited.includes(currentSightId)) {
    locationsInSlot.push({
      period: slotMetaInfo.period,
      arrivalTime: arrivalTime,
      departureTime: departureTime,
      travelTo: durationToPrevious,
      place_id: currentSightId,
    });
    locationsVisited.push(currentSightId);
  }

  // Calculate durationsListRanked to all other sites ranked by durations;
  let durationsListRanked = durations.find(
    (durationList) => durationList.source === currentSightId
  ).durations;

  durationsListRanked.sort((a, b) => {
    if (a.duration < b.duration) return -1;
    if (a.duration > b.duration) return 1;
    return 0;
  });

  let durationsListRankedUser = durationsListRanked.filter((sight) =>
    userLocations.includes(sight.destination)
  );

  console.log(
    "###############################################################"
  );

  console.log(`starting point is location nr ${currentSightId}
      durations list ranked is ${durationsListRanked}
      totalSightTime is ${totalSightsTime}
      locations in Slot are ${locationsInSlot}
      locationsVisited are ${locationsVisited}`);
  console.log(`Arrival time this location is ${dayjs(arrivalTime).format()}`);
  console.log(
    `Departure  time next location is ${dayjs(departureTime).format()}`
  );

  // FOR EACH sight in durationsList that IS user defined:
  iterateOverLocations(
    departureTime,
    slotTime,
    durations,
    slotMetaInfo,
    locationsVisited,
    userLocations,
    durationToNext,
    totalSightsTime,
    locationsInSlot,
    durationsListRankedUser
  );

  // FOR EACH sight in durationsList that IS NOT user defined:
  iterateOverLocations(
    departureTime,
    slotTime,
    durations,
    slotMetaInfo,
    locationsVisited,
    userLocations,
    durationToNext,
    totalSightsTime,
    locationsInSlot,
    durationsListRanked
  );

  // HELPER FUNCTION: iterate over locations
  function iterateOverLocations(
    departureTime,
    slotTime,
    durations,
    slotMetaInfo,
    locationsVisited,
    userLocations,
    durationToNext,
    totalSightsTime,
    locationsInSlot,
    durationsListRanked
  ) {
    for (const nextSight of durationsListRanked) {
      const nextSightId = nextSight.destination;

      // only for logging
      if (durationsListRanked.length < 20) {
        console.log("inside user locations");
      } else {
        console.log(
          "Inside other locations",
          `durations list length is ${durationsListRanked.length}`
        );
      }

      console.log(`nextSight in for each is ${nextSightId}`);

      // Check if potential next sight has not been visited yet and is not equal to current sight
      if (
        !locationsVisited.includes(nextSightId) &&
        nextSightId !== currentSightId
      ) {
        // Calculate travel time to next site
        durationToNext = durationsListRanked.find(
          (entry) => entry.destination === nextSightId
        ).duration;

        // calculate total time for sights in slot -> MUST INCLUDE ALSO VISIT TIME
        // in final version
        let sightTime = 4500;
        totalSightsTime = totalSightsTime + sightTime + durationToNext;

        // Check if user location fits equally or better
        // const totalSightsTimeUserLocation

        // if still time left in slot:
        if (totalSightsTime < slotTime) {
          const arrivalTimeNext = departureTime.add(durationToNext, "seconds");
          const departureTimeNext = departureTime.add(
            durationToNext + sightTime,
            "seconds"
          );

          console.log(
            `Arrival time next location is ${dayjs(arrivalTimeNext).format()}`
          );
          console.log(
            `Departure  time next location is ${dayjs(
              departureTimeNext
            ).format()}`
          );

          return addLocationsToSlot(
            arrivalTimeNext,
            departureTimeNext,
            slotTime,
            durations,
            slotMetaInfo,
            locationsVisited,
            userLocations,
            durationToNext,
            sightTime,
            totalSightsTime,
            nextSightId,
            locationsInSlot
          );
        }

        // if visit time for next sight exceeds slot time, go to nth - closest sight and repeat all steps
      }
    }
  }

  return { locationsInSlot, locationsVisited };
}

module.exports = addLocationsToSlot;
