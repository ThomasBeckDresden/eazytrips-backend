const dayjs = require("dayjs");

/////////////////////////////////////////////////////////
//Helper function: Recursively add new locations to slot
///////////////////////////////////////////////////////////

function addLocationsToSlot(
  arrivalTime,
  departureTime,
  slotTime,
  durations,
  slotMetaInfo,
  locationsVisited,
  durationToPrevious = 0,
  sightTime = 0,
  totalSightsTime = 0,
  currentSightId = "accommodation",
  locationsInSlot = []
) {
  // add current sight to slot if travel time to destination + visit time
  // below slot time (NOT IMPLEMENTED)
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

  console.log(
    "###############################################################"
  );
  console.log(durationsListRanked);

  console.log(`starting point is location nr ${currentSightId} 
      durations list ranked is ${durationsListRanked}
      totalSightTime is ${totalSightsTime}
      locations in Slot are ${locationsInSlot}
      locationsVisited are ${locationsVisited}`);

  // FOR EACH sight in durationsList:
  for (const nextSight of durationsListRanked) {
    const nextSightId = nextSight.destination;
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

      // if still time left in slot:
      if (totalSightsTime < slotTime) {
        const arrivalTimeNext = departureTime.add(durationToNext, "seconds");
        const departureTimeNext = departureTime.add(
          durationToNext + sightTime,
          "seconds"
        );

        return addLocationsToSlot(
          arrivalTimeNext,
          departureTimeNext,
          slotTime,
          durations,
          slotMetaInfo,
          locationsVisited,
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
  return { locationsInSlot, locationsVisited };
}

module.exports = addLocationsToSlot;
