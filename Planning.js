const {
  ftGenetic,
  getAvailables,
  reducer,
  mapList,
  printGrid,
  copyGrid,
  shuffle,
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
}
module.exports = { Planning };
