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

  getSlotsForLength(amoNb) {
    let S = {};
    let ptr = this.getAmosList()[amoNb].head;
    let planningStart = this.getAmosList()[amoNb].planningStart;
    // { start: 1635751800000, amoNb: 0, length: 2, booked: false }
    let name = undefined;
    let start = undefined;
    let counter = 1;
    // start = ptr.data.start;

    while (ptr !== null) {
      // console.log(`ptr.data : ${JSON.stringify(ptr.data)}`);
      if (
        ptr.data.booked !== undefined &&
        ptr.data.booked !== false &&
        !ptr.data.booked.includes("@")
      ) {
        if (ptr.data.booked === ptr.next.data.booked) {
          if (start === undefined) {
            start = ptr.data.start;
          }
          // console.log(`1 ptr : ${ptr.data.booked}`);
          counter++;
        } else {
          // console.log(`2 ptr : ${ptr.data.booked}`);
          // console.log(`${ptr.data.booked} : ${counter}`);
          let sol = {
            start: planningStart + start,
            amoNb: 0,
            length: counter,
            booked: false,
          };
          if (S[counter]) {
            S[counter].push(sol);
          } else {
            S[counter] = [sol];
          }
          counter = 1;
          start = ptr.data.start;
        }
      }
      ptr = ptr.next;
    }

    return S;
  }

  getSolutions() {
    let S = {};
    // this.getSlotsForLength(this.getAmosList()[4].head);
    for (let amo = 0; amo < this.getAmosList().length; amo++) {
      console.log(`margin after : ${this.getAmosList()[amo].getMargin()}`);
      let amoSolutions = this.getSlotsForLength(amo);
      console.log(`\n\namoSolutions --> ${JSON.stringify(amoSolutions)}`);
      for (const [key, value] of Object.entries(amoSolutions)) {
        if (S[key] === undefined) S[key] = [];
        for (let v = 0; v < value.length; v++) {
          if (S[key].find((_) => _.start === value[v].start) === undefined) {
            S[key].push(value[v]);
          }
        }
      }
      // return;
    }

    Object.keys(S).forEach((obj) => {
      S[obj] = S[obj].sort(function (a, b) {
        return a.start - b.start;
      });
    });

    console.log(S);
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
