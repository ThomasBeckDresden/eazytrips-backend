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

  // console.log(
  //   "###############################################################"
  // );

  // console.log(`starting point is location nr ${currentSightId}
  //     durations list ranked is ${durationsListRanked}
  //     totalSightTime is ${totalSightsTime}
  //     locations in Slot are ${locationsInSlot}
  //     locationsVisited are ${locationsVisited}`);
  // console.log(`Arrival time this location is ${dayjs(arrivalTime).format()}`);
  // console.log(
  //   `Departure  time next location is ${dayjs(departureTime).format()}`
  // );

  // ////////////////////////////////////////////////////////////////////////////////////////////
  // ITERATE OVER ALL SIGHTS, FIND ClOSEST SIGHT AND REPEAT WITH NEXT SIGHT AS STARTING POINT
  ///////////////////////////////////////////////////////////////////////////////////////////////
  for (const nextDestination of durationsListRanked) {
    // HELPER FUNCTION: bussiness logic to find next location
    function getNextSight(
      candidateSight,
      currentSightId,
      durationsListRanked,
      slotTime,
      departureTime,
      sightTime = 4500
    ) {
      const candidateSightId = candidateSight.destination;
      // check if already in list
      if (
        !locationsVisited.includes(candidateSightId) &&
        candidateSightId !== currentSightId
      ) {
        // Calculate travel time to next site
        durationToCandidateSight = durationsListRanked.find(
          (entry) => entry.destination === candidateSightId
        ).duration;

        const totalSightsTimeCandidate =
          totalSightsTime + sightTime + durationToCandidateSight;

        if (totalSightsTimeCandidate < slotTime) {
          const arrivalTimeNext = departureTime.add(
            durationToCandidateSight,
            "seconds"
          );
          const departureTimeNext = departureTime.add(
            durationToCandidateSight + sightTime,
            "seconds"
          );

          return {
            nextSightId: candidateSightId,
            arrivalTimeNext,
            departureTimeNext,
            durationToNext: durationToCandidateSight,
            totalSightsTimeCandidate,
          };
        }
      }
    }

    // implement logic here: check if user locations fits slot
    // if yes, set next sight id to user destination

    let nextSight;

    durationsListRankedUser.forEach((userLocation) => {
      nextSight = getNextSight(
        userLocation,
        currentSightId,
        durationsListRankedUser,
        slotTime,
        departureTime
      );
    });

    // if no next sight id from user locations, check current next sight of other;
    // call function dependent on wether nextSightId is defined or not
    if (!nextSight) {
      nextSight = getNextSight(
        nextDestination,
        currentSightId,
        durationsListRanked,
        slotTime,
        departureTime
      );
    }

    // if next sight found, repeat process with this sight as starting point
    if (nextSight) {
      return addLocationsToSlot(
        nextSight.arrivalTimeNext,
        nextSight.departureTimeNext,
        slotTime,
        durations,
        slotMetaInfo,
        locationsVisited,
        userLocations,
        nextSight.durationToNext,
        sightTime,
        nextSight.totalSightsTimeCandidate,
        nextSight.nextSightId,
        locationsInSlot
      );
    }

    // if visit time for next sight exceeds slot time, go to nth - closest sight and repeat all steps
  }

  return { locationsInSlot, locationsVisited };
}

module.exports = addLocationsToSlot;
