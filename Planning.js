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
}
module.exports = { Planning };
