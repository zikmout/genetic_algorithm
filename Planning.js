const {
  ftGenetic,
  getAvailables,
  reducer,
  mapList,
  printGrid,
  copyGrid,
  shuffle,
  getAmoNb,
} = require("./linkAlgoUtils");

class Planning {
  constructor(
    grid,
    people,
    pas,
    startDay,
    endDay,
    startShift,
    endShift,
    startLunch,
    endLunch
  ) {
    this.amosList = mapList(
      grid,
      pas,
      startDay,
      endDay,
      startLunch,
      endLunch,
      startShift,
      endShift
    );
    this.grid = copyGrid(grid);
    this.people = [...people];
    this.pas = pas;
    this.startDay = startDay;
    this.endDay = endDay;
    this.startShift = startShift;
    this.endShift = endShift;
    this.startLunch = startLunch;
    this.endLunch = endLunch;
    this.amoNb = getAmoNb(this.grid);
  }

  getTotalPeople() {
    if (this.people.length === 0) {
      return undefined;
    }
    return this.people.reduce(reducer);
  }

  getPeople() {
    return this.people;
  }

  getAmoNb() {
    return this.amoNb;
  }

  getAmosList() {
    return this.amosList;
  }

  getMargin() {
    return this.getAmosList().map((amo) => amo.getMargin());
  }
}
module.exports = { Planning };
