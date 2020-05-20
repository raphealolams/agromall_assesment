const locationFinder = (options) => {
  const { geolib } = options;

  const sortLocation = (locations, currentLocation) => {
    let mapped = mapLocation(locations, currentLocation);
    let sorted = mapped.sort((a, b) => a.dist - b.dist);
    return sorted[0].dist < 70000 ? sorted.slice(0, 5) : null;
  };

  /**
   * @param {*} location
   * @param {*} Current
   */
  const distanceFromCurrent = (locations, currentLocation) => {
    // let numbers = /[-+]?[0-9]*\.?[0-9]+/;
    let numbers = /^-?[0-9]\d*(\.\d+)?$/;
    if (
      !numbers.test(locations.latitude) ||
      !numbers.test(locations.longitude)
    ) {
      return {};
    }

    return {
      coord: locations,
      dist: geolib.getDistance(currentLocation, locations),
    };
  };

  /**
   * @param {*} location
   * @param {*} point
   */
  const mapLocation = (locations, currentLocation) => {
    return locations.map((x) => distanceFromCurrent(x, currentLocation));
  };

  return Object.create({
    sortLocation,
  });
};
module.exports = locationFinder;
