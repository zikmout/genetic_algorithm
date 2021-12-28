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

class Backtracking {
  constructor(planning) {
    this.planning = planning;
    this.setAllLengths = Array.from(new Set(this.planning.people));
    this.S1 = {};
  }

  getPlanning() {
    return this.planning;
  }

  giveAnswers(rdvLength) {
    let start = new Date().getTime();
    console.log(`\nmargin : ${this.planning.getMargin()}`);

    const isAlreadyFoundSolution = (starts, start) => {
      return starts.find((x) => x.start === start);
    };

    for (let amo = 0; amo < this.planning.amosList; amo++) {
      console.log(`toti`);
    }

    console.log(
      `\ngiveAnswer() : ${Math.round((new Date().getTime() - start) / 1000)}s`
    );
  }

  solveRdv() {
    var S = [];
    for (let x = 0; x < this.setAllLengths.length; x++) {
      S = this.giveAnswers(setAllLengths[x]);
      S1[setAllLengths[x]] = S;
    }
  }
}

module.exports = { Backtracking };
