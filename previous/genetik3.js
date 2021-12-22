const moment = require("moment");
const deepcopy = require("deepcopy");

// Utils
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const shuffle = (array) => {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
};
const printSchedulesFitness = (schedules) => {
  schedules.forEach((schedule) => {
    console.log(`${schedule.getFitness()}`);
  });
};
const sortSchedulesByFitness = (schedules) => {
  schedules.forEach((schedule) => {
    schedule.isFitnessChanged = true;
    schedule.getFitness();
  });

  schedules.sort(function (a, b) {
    return b.getFitness() - a.getFitness();
  });
};

// Parameters
POPULATION_SIZE = 90;
NUMB_OF_ELITE_SCHEDULES = 15;
TOURNAMENT_SELECTION_SIZE = 30;
MUTATION_RATE = 0.1; // Mutation should not happen ofter because creates noise

// Algorithm Classes

const ftGenetic = (grid, people) => {
  const amos = ["JB", "PD", "KM", "JY", "AF", "SS"];
  class Data {
    copyGrid = (inputGrid) => {
      let outputGrid = [];

      for (let i = 0; i < inputGrid.length; i++) {
        let firstDim = [];
        for (let j = 0; j < inputGrid[i].length; j++) {
          let secondDim = [];
          for (let k = 0; k < inputGrid[i][j].length; k++) {
            let n = Object.assign({}, inputGrid[i][j][k]);
            secondDim.push(n);
          }
          firstDim.push(secondDim);
        }
        outputGrid.push(firstDim);
      }
      return outputGrid;
    };

    getAmoNb = () => {
      let max = 0;
      this.grid.map((shift) => {
        if (shift.length >= max) {
          max = shift.length;
        }
      });
      return max;
    };

    printGrid = () => {
      console.log(
        `\n\n################################################### G.R.I.D ###################################################`
      );
      for (let shift = 0; shift < this.grid.length; shift++) {
        console.log(
          `\n----------\nShift ${shift} (Amo(s): ${this.grid[shift].length})\n`
        );
        for (let amo = 0; amo < this.grid[shift].length; amo++) {
          console.log(`\nAMO no ${amo}\n`);
          for (let slot = 0; slot < this.grid[shift][amo].length; slot++) {
            console.log(
              `[${shift}][${amo}][${slot}]  ***********  ${moment
                .utc(this.grid[shift][amo][slot].start)
                .format("DD/MM HH:mm")}  -  ${moment
                .utc(this.grid[shift][amo][slot].end)
                .format("DD/MM HH:mm")}    :    ${
                this.grid[shift][amo][slot].booked
              }     ${this.grid[shift][amo][slot].amo}`
            );
          }
        }
      }
      console.log(
        `\n\n###############################################################################################################\n\n`
      );
    };

    constructor(grid, amos, people) {
      this.amos = amos;
      // Transforme la grille pour assigner des AMOs
      for (let shift = 0; shift < grid.length; shift++) {
        for (let amo = 0; amo < grid[shift].length; amo++) {
          for (let slot = 0; slot < grid[shift][amo].length; slot++) {
            grid[shift][amo][slot].amo = amos[amo];
          }
        }
      }
      this.grid = this.copyGrid(grid);
      this.people = people;
    }

    getAmos() {
      return this.amos;
    }

    getGrid() {
      return this.grid;
    }

    getPeople() {
      return this.people;
    }
  }

  class Schedule {
    fit = (grid, shift, amo, slot, rdvLength) => {
      let l = 0;

      for (l; l < rdvLength; l++) {
        if (!grid[shift][amo][slot + l]) {
          return false;
        }
      }

      if (
        grid[shift][amo][slot].booked === false &&
        grid[shift][amo][slot + 1].booked === false
      ) {
        return true;
      }
      return false;
    };

    // fit2(grid, shift, amo, slot, rdvLength) {

    //   // printGrid(grid)
    //   let s = shift;
    //   let a = amo;
    //   let sl = slot;
    //   for (s; s < grid.length; s++) {
    //     for (a; a < grid[s].length; a++) {
    //       for (sl; sl < grid[s][a].length; sl++) {
    //         // console.log(`rdvLength === ${rdvLength}`);
    //         if (grid[s][a][sl].booked !== false) {
    //           // console.log(
    //           //   `[${initRdvLength}] K.O. end : ${moment(
    //           //     grid[s][a][sl].end
    //           //   )} (${JSON.stringify(grid[s][a][sl])})`
    //           // );
    //           return false;
    //         } else {
    //           rdvLength -= 1;
    //         }
    //         if (rdvLength === 0) {
    //           // console.log(`init = ${initRdvLength}`);
    //           // console.log(`\n\ngrid : ${JSON.stringify(grid[s][a][sl])}`);
    //           // console.log(
    //           //   `[${initRdvLength}] OK end : ${moment(grid[s][a][sl].end)}`
    //           // );
    //           return true;
    //         }
    //       }
    //     }
    //   }

    //   return false;
    // }

    fillGridBooked = (name, length, grid, shift, amo, slot) => {
      for (let l = 0; l < length; l++) {
        grid[shift][amo][slot + l].booked = name;
      }
    };

    constructor(data) {
      this.data = data;
      this.numbOfConflicts = 0;
      this.fitness = -1;
      this.isFitnessChanged = true;
    }

    getNumberOfConflicts() {
      return this.numbOfConflicts;
    }

    calculateConflicts(originPeople, people) {
      let cp = [...originPeople];
      // console.log(JSON.stringify(cp));
      people.forEach((p) => {
        if (cp.includes(p)) {
          let pplIdx = cp.indexOf(p);
          cp.splice(pplIdx, 1);
        }
      });
      return cp.length;
    }

    getFitness() {
      if (this.isFitnessChanged) {
        this.fitness = this.calculateFitness();
        this.isFitnessChanged = false;
      }
      return this.fitness;
    }

    advanceTrous(grid, shift, amo, slot, minUniquePeople) {
      const isBooked = (x) => {
        return x.booked !== false;
      };
      const isNotBooked = (x) => {
        return x.booked === false;
      };

      var i = slot;
      var tmpSlice = undefined;
      var firstFalse = undefined;
      var values = undefined;

      while (grid[shift][amo][i]) {
        if (i !== 0) {
          tmpSlice = grid[shift][amo].slice(i);
        } else {
          tmpSlice = grid[shift][amo];
        }
        if (grid[shift][amo][i].booked !== false) {
          firstFalse = tmpSlice.findIndex(isNotBooked);

          if (firstFalse === -1) {
            return ["S", "S"];
          }
          let available = grid[shift][amo]
            .slice(firstFalse + i)
            .findIndex(isBooked);
          values = [i + firstFalse, available];

          if (available === -1) {
            values = [
              i + firstFalse,
              grid[shift][amo].length - (i + firstFalse),
            ];
            if (values[1] >= minUniquePeople) {
              return values;
            } else {
              return ["S", "S"];
            }
          } else if (available >= minUniquePeople) {
            return values;
          } else {
            i += firstFalse + available;
            continue;
          }
        }

        if (grid[shift][amo][i].booked === false) {
          let available = tmpSlice.findIndex(isBooked);
          values = [];
          if (available === -1) {
            available = grid[shift][amo].length - i;
            if (available >= minUniquePeople) {
              return [i, grid[shift][amo].length - i];
            } else {
              return ["S", "S"];
            }
          } else if (available >= minUniquePeople) {
            return [i, available];
          } else {
            i += available;
            continue;
          }
        }
      }

      // Si ne parvient pas a fit dans les slots de l amo, on avance avec ftRec()
      return ["S", "S"];
    }

    initialize() {
      let shuffledPeople = shuffle(this.data.people);
      for (let i = 0; i < shuffledPeople.length; i++) {
        while (42) {
          let ranName = Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 5);
          let ranShift = getRandomInt(0, this.data.grid.length - 1);
          let ranAmo = getRandomInt(0, this.data.grid[ranShift].length - 1);
          let ranSlot = getRandomInt(
            0,
            this.data.grid[ranShift][ranAmo].length - 1
          );

          let values = this.advanceTrous(
            this.data.grid,
            ranShift,
            ranAmo,
            ranSlot,
            shuffledPeople[i]
          );

          if (values[0] !== "S" && values[1] !== "S") {
            this.fillGridBooked(
              ranName,
              shuffledPeople[i],
              this.data.grid,
              ranShift,
              ranAmo,
              values[0]
            );
            break;
          }

          if (getRandomInt(0, 5) === 0) {
            if (
              this.fit(
                this.data.grid,
                ranShift,
                ranAmo,
                ranSlot,
                shuffledPeople[i]
              ) === true
            ) {
              this.fillGridBooked(
                ranName,
                shuffledPeople[i],
                this.data.grid,
                ranShift,
                ranAmo,
                ranSlot
              );
              break;
            }
          }
        }
      }
      return this;
    }

    calculateFitness() {
      let ranName = undefined;
      let counter = 0;
      let people = [];
      let ppl = [];
      for (let s = 0; s < this.data.grid.length; s++) {
        for (let a = 0; a < this.data.grid[s].length; a++) {
          for (let sl = 0; sl < this.data.grid[s][a].length; sl++) {
            if (this.data.grid[s][a][sl].booked !== false) {
              ppl.push(this.data.grid[s][a][sl].booked);
              ranName = this.data.grid[s][a][sl].booked;
              counter += 1;
              if (
                !this.data.grid[s][a][sl + 1] ||
                ranName !== this.data.grid[s][a][sl + 1].booked
              ) {
                people.push(counter);
                counter = 0;
              }
            }
          }
        }
      }
      // console.log(`ppl : ${JSON.stringify(ppl)}`);
      // console.log(
      //   `people           : ${JSON.stringify(
      //     people.sort(function (a, b) {
      //       return b - a;
      //     })
      //   )}`
      // );
      // console.log(
      //   `this.data.people : ${JSON.stringify(
      //     this.data.people.sort(function (a, b) {
      //       return b - a;
      //     })
      //   )}`
      // );
      // let intersection = people.filter((_) => this.data.people.includes(_));

      // this.numbOfConflicts = this.data.people.length - intersection.length;
      this.numbOfConflicts = this.calculateConflicts(this.data.people, people);
      // console.log(`intersection : ${JSON.stringify(intersection)}`);
      // console.log(`numberOfConflicts : ${this.numbOfConflicts}`);
      // console.log(
      //   `this.data.people.length : ${this.data.people.length}, intersection.length : ${intersection.length}`
      // );
      // this.data.printGrid();
      return parseFloat((1 / (1.0 * this.numbOfConflicts + 1)).toFixed(10));
    }
  }

  class Population {
    constructor(size) {
      this.size = size;
      this.schedules = [];
      for (let i = 0; i < size; i++) {
        this.schedules.push(
          new Schedule(new Data(grid, amos, people)).initialize()
        );
      }
    }

    getSchedules() {
      return this.schedules;
    }
  }

  class GeneticAlgorithm {
    evolve(population) {
      return this.mutatePopulation(this.crossoverPopulation(population));
    }

    crossoverPopulation(pop) {
      let crossoverPop = new Population(0);
      // Verify crossoverPop
      for (let i = 0; i < NUMB_OF_ELITE_SCHEDULES; i++) {
        crossoverPop.getSchedules().push(pop.getSchedules()[i]);
      }

      for (let i = NUMB_OF_ELITE_SCHEDULES; i < POPULATION_SIZE; i++) {
        let schedule1 = this.selectTournamentPopulation(pop).getSchedules()[0];
        let schedule2 = this.selectTournamentPopulation(pop).getSchedules()[0];
        crossoverPop
          .getSchedules()
          .push(this.crossoverSchedule(schedule1, schedule2));
      }
      // printSchedulesFitness(crossoverPop.getSchedules());
      return crossoverPop; // returns only the one with the highest fitness
    }

    mutatePopulation(population) {
      for (let i = NUMB_OF_ELITE_SCHEDULES; i < POPULATION_SIZE; i++) {
        this.mutateSchedule(population.getSchedules()[i]);
      }
      return population;
    }

    crossoverSchedule(schedule1, schedule2) {
      let crossoverSchedule = new Schedule(
        new Data(grid, amos, people)
      ).initialize();

      // console.log(`schedule1 => ${schedule1.getFitness()}`);
      // console.log(`schedule2 => ${schedule2.getFitness()}`);

      // crossoverSchedule.isFitnessChanged = true;
      // console.log(
      //   `crossoverSchedule fitness before => ${crossoverSchedule.getFitness()}`
      // );

      for (let s = 0; s < crossoverSchedule.data.getGrid().length; s++) {
        for (let a = 0; a < crossoverSchedule.data.getGrid()[s].length; a++) {
          if (Math.random() > 0.5) {
            crossoverSchedule.data.getGrid()[s][a] =
              schedule1.data.getGrid()[s][a];
          } else {
            crossoverSchedule.data.getGrid()[s][a] =
              schedule2.data.getGrid()[s][a];
          }
        }
      }

      crossoverSchedule.isFitnessChanged = true;
      crossoverSchedule.getFitness();
      // console.log(
      //   `crossoverSchedule fitness after  => ${crossoverSchedule.getFitness()}`
      // );
      return crossoverSchedule;
    }

    mutateSchedule(mutateSchedule) {
      let schedule = new Schedule(new Data(grid, amos, people)).initialize();

      // mutateSchedule.isFitnessChanged = true;
      // console.log(`mutateSchedule BEFORE : ${mutateSchedule.getFitness()}`);

      for (let s = 0; s < mutateSchedule.data.getGrid().length; s++) {
        for (let a = 0; a < mutateSchedule.data.getGrid()[s].length; a++) {
          if (MUTATION_RATE > Math.random()) {
            mutateSchedule.data.getGrid()[s][a] = schedule.data.getGrid()[s][a];
            // mutateSchedule.getRdvs()[i] = schedule.getRdvs()[i];
          }
        }
      }

      mutateSchedule.isFitnessChanged = true;
      // No need to getFitness() for mutateSchedule here
      // Need to understand why fitness can go up whereas mutation is
      // expected to only make it worse !
      // --> Pb fitness basee sur l'intersection ???
      mutateSchedule.getFitness();
      // console.log(`mutateSchedule AFTER  : ${mutateSchedule.getFitness()}`);
      return mutateSchedule;
    }

    selectTournamentPopulation(pop) {
      let tournamentPop = new Population(0);

      for (let i = 0; i < TOURNAMENT_SELECTION_SIZE; i++) {
        tournamentPop
          .getSchedules()
          .push(pop.getSchedules()[getRandomInt(0, POPULATION_SIZE - 1)]);
      }

      // Verify sorted ?
      sortSchedulesByFitness(tournamentPop.getSchedules());
      return tournamentPop;
    }
  }

  var population = new Population(POPULATION_SIZE);

  let generationNumber = 0;
  console.log(`\n> Generation # ${generationNumber}`);
  sortSchedulesByFitness(population.getSchedules());
  printSchedulesFitness(population.getSchedules());
  let geneticAlgorithm = new GeneticAlgorithm();

  while (population.getSchedules()[0].getFitness() !== 1.0) {
    generationNumber += 1;
    console.log(`\n> Generation # ${generationNumber}`);
    population = geneticAlgorithm.evolve(population);
    sortSchedulesByFitness(population.getSchedules());
    console.log(population.getSchedules()[0].fitness);
    // printSchedulesFitness(population.getSchedules());
  }

  console.log(JSON.stringify(population.getSchedules()[0].data.printGrid()));
  return population.getSchedules()[0].data.getGrid();
};

module.exports = { ftGenetic };
