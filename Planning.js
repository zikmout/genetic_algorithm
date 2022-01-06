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
    this.people = people;
    this.pas = pas;
    this.startDay = startDay;
    this.endDay = endDay;
    this.startShift = startShift;
    this.endShift = endShift;
    this.startLunch = startLunch;
    this.endLunch = endLunch;
    this.amoNb = getAmoNb(grid);
  }

  getSlotsForLength(ptr) {
    let amoSolutions = {};
    while (ptr !== null) {
      console.log(`ptr.data : ${JSON.stringify(ptr.data)}`);
      ptr = ptr.next;
    }
    return amoSolutions;
  }

  getSolutions() {
    let S = {};
    // this.getSlotsForLength(this.getAmosList()[4].head);
    for (let amo = 0; amo < this.getAmosList().length; amo++) {
      console.log(`margin after : ${this.getAmosList()[amo].getMargin()}`);
      let amoSolutions = this.getSlotsForLength(this.getAmosList()[amo].head);
      console.log(`amoSolutions --> ${JSON.stringify(amoSolutions)}`);
      return;
    }
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
