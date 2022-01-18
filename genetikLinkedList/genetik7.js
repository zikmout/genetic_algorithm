const moment = require("moment");
const { LinkedList, ListNode } = require("./LinkedList");
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getAvailables = (grid) => {
  let nbBooked = 0;
  let nbNotBooked = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      for (let k = 0; k < grid[i][j].length; k++) {
        if (grid[i][j][k].booked !== false) {
          nbBooked += 1;
        } else {
          nbNotBooked += 1;
        }
      }
    }
  }
  return [nbBooked, nbNotBooked];
};
const shuffle = (arr) =>
  arr.reduceRight(
    (r, _, __, s) => (
      r.push(s.splice(0 | (Math.random() * s.length), 1)[0]), r
    ),
    []
  );
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
// const getAvailables = (grid) => {
//   let nbBooked = 0;
//   let nbNotBooked = 0;
//   for (let i = 0; i < grid.length; i++) {
//     for (let j = 0; j < grid[i].length; j++) {
//       for (let k = 0; k < grid[i][j].length; k++) {
//         if (grid[i][j][k].booked !== false) {
//           nbBooked += 1;
//         } else {
//           nbNotBooked += 1;
//         }
//       }
//     }
//   }
//   return [nbBooked, nbNotBooked];
// };
const reducer = (accumulator, currentValue) => accumulator + currentValue;
// Parameters
POPULATION_SIZE = 100;
NUMB_OF_ELITE_SCHEDULES = 20;
TOURNAMENT_SELECTION_SIZE = 20;
MUTATION_RATE = 0.8; // Mutation should not happen ofter because creates noise

// Algorithm Classes

const ftGenetic = (amosList, people) => {
  class Data {
    getAmosListCopy(amosList) {
      let alc = [];
      for (let amo = 0; amo < amosList.length; amo++) {
        let planningStart = amosList[amo].planningStart;
        let planningEnd = amosList[amo].planningEnd;
        let newLinkedList = new LinkedList(
          amo,
          planningStart,
          planningEnd,
          this.pas
        );
        let ptr = amosList[amo].head;
        while (ptr !== null) {
          newLinkedList.add({
            start: ptr.data.start,
            end: ptr.data.end,
            booked: ptr.data.booked,
          });
          ptr = ptr.next;
        }
        alc.push(newLinkedList);
      }
      return alc;
    }

    printAmos() {
      for (let i = 0; i < this.amosList.length; i++) {
        this.amosList[i].printList();
      }
    }

    constructor(amosList, people) {
      this.amosList = this.getAmosListCopy(amosList);
      this.people = shuffle([...people]);
      this.originPeople = [...people];
    }

    getAmosList() {
      return this.amosList;
    }

    getPeople() {
      return this.people;
    }
  }

  class Schedule {
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
      let score = 0;
      let ppl = [...people];
      originPeople.forEach((op) => {
        let pplIdx = ppl.indexOf(op);
        if (pplIdx !== -1) {
          ppl.splice(pplIdx, 1);
          score += 1;
        }
      });
      return originPeople.length - score;
    }

    getFitness() {
      if (this.isFitnessChanged) {
        this.fitness = this.calculateFitness();
        this.isFitnessChanged = false;
      }
      return this.fitness;
    }

    fillRdv(rdvLength, pt) {
      let ran = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 5);
      while (42) {
        if (pt === null) {
          throw new Error(`Should never be null when filling Rdv`);
        }
        if (pt.data.booked !== false) {
          throw new Error(`Is writing but should not`);
        }
        pt.data.booked = `${ran}`;
        rdvLength -= 1;
        if (rdvLength === 0) {
          break;
        }
        pt = pt.next;
      }
      return pt;
    }

    getPlacedPeople() {
      let people = [];

      for (let amo = 0; amo < this.data.amosList.length; amo++) {
        let ptr = this.data.amosList[amo].head;
        let start = undefined;
        let counter = 1;
        while (ptr !== null) {
          if (
            ptr.data.booked !== undefined &&
            ptr.data.booked !== false &&
            !ptr.data.booked.includes("@")
          ) {
            if (ptr.data.booked === ptr.next.data.booked) {
              if (start === undefined) {
                start = ptr.data.start;
              }
              counter++;
            } else {
              people.push(counter);
              counter = 1;
              start = ptr.data.start;
            }
          }
          ptr = ptr.next;
        }
      }

      return people;
    }

    dummyFill(pt, amoNb) {
      if (people.length === 0) {
        console.log(`/!\\ END PLACING, PEOPLE = 0 /!\\`);
        // console.log(this.data.people);
        // this.data.printAmos();

        // let orderedPeople = this.data.originPeople.sort(function (a, b) {
        //   return b - a;
        // });
        // let placedPeople = this.getPlacedPeople(this.data.amosList).sort(
        //   function (a, b) {
        //     return b - a;
        //   }
        // );

        // console.log(`people 1 : ${JSON.stringify(orderedPeople)}`);
        // console.log(`people 2 : ${JSON.stringify(placedPeople)}`);
        // console.log(`this.data.people : ${JSON.stringify(this.data.people)}`);
        // throw new Error();
        return;
      }

      if (pt === null || pt.next === null) {
        if (amoNb === this.data.amosList.length - 1) {
          // throw new Error(
          //   `PAS DE SOLUTIION (impossible de placer ${people.length} personne(s))`
          // );
          // console.log(`END`);
          // console.log("PAS DE SOLUTION");
          return;
        } else {
          amoNb++;
          pt = this.data.amosList[amoNb].head;
        }
      }

      let available = 0;
      let pto = pt;
      while (pto.next !== null) {
        if (pto.next.data.start !== pto.data.end) {
        } else {
          if (pto.data.booked === false) {
            available += 1;
          } else {
            break;
          }
        }
        pto = pto.next;
      }

      // console.log(`available -> ${available}`);
      if (available === 0) {
        return this.dummyFill(pto.next, amoNb);
      }

      let peopleSet = Array.from(new Set(this.data.people));
      for (let i = 0; i < peopleSet.length; i++) {
        if (peopleSet[i] > available) {
          continue;
        } else {
          let pc = [...this.data.people];
          let pplIdx = pc.indexOf(peopleSet[i]);
          pc.splice(pplIdx, 1);

          let newPtr = this.fillRdv(peopleSet[i], pt);
          // console.log(`pc : ${pc.length}`);
          this.data.people = pc;

          return this.dummyFill(newPtr, amoNb);
        }
      }
      return this.dummyFill(pto.next, amoNb);
    }

    initialize() {
      // this.data.printAmos();

      // let shuffledPeople = shuffle([...this.data.people]);
      // let placedPeople = [];

      // console.log(`shuffledPeople --> ${JSON.stringify(shuffledPeople)}`);

      this.dummyFill(this.data.amosList[0].head, 0);

      // this.data.printAmos();
      // console.log(`this.data.people ---> ${JSON.stringify(this.data.people)}`);
      return this;
    }

    calculateFitness() {
      let ranName = undefined;
      let counter = 0;
      let people = [];
      let ppl = [];

      this.numbOfConflicts = this.calculateConflicts(
        this.data.originPeople,
        this.getPlacedPeople(this.data.amosList)
      );
      // console.log(`number of Conflicts ---> ${this.numbOfConflicts}`);
      return parseFloat((1 / (1.0 * this.numbOfConflicts + 1)).toFixed(10));
    }
  }

  class Population {
    constructor(size, amosList, people) {
      this.size = size;
      this.schedules = [];
      for (let i = 0; i < size; i++) {
        this.schedules.push(
          new Schedule(new Data(amosList, people)).initialize()
        );
      }
    }

    getSchedules() {
      return this.schedules;
    }
  }

  class GeneticAlgorithm {
    constructor(amosList, people) {
      this.amosList = this.getAmosListCopy(amosList);
      this.people = shuffle([...people]);
    }

    getAmosListCopy(amosList) {
      let alc = [];
      for (let amo = 0; amo < amosList.length; amo++) {
        let planningStart = amosList[amo].planningStart;
        let planningEnd = amosList[amo].planningEnd;
        let newLinkedList = new LinkedList(
          amo,
          planningStart,
          planningEnd,
          this.pas
        );
        let ptr = amosList[amo].head;
        while (ptr !== null) {
          newLinkedList.add({
            start: ptr.data.start,
            end: ptr.data.end,
            booked: ptr.data.booked,
          });
          ptr = ptr.next;
        }
        alc.push(newLinkedList);
      }
      return alc;
    }

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
        // let schedule1 = pop.getSchedules()[0];
        // let schedule2 = pop.getSchedules()[0];
        let schedule1 = this.selectTournamentPopulation(pop).getSchedules()[0];
        let schedule2 = this.selectTournamentPopulation(pop).getSchedules()[0];
        crossoverPop
          .getSchedules()
          .push(this.crossoverSchedule(schedule1, schedule2));
      }
      printSchedulesFitness(crossoverPop.getSchedules());
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
        new Data(this.amosList, this.people)
      ).initialize();

      for (let i = 0; i < crossoverSchedule.data.amosList.length; i++) {
        if (Math.random() > 0.5) {
          crossoverSchedule.data.amosList[i].head =
            schedule1.data.amosList[i].head;
        } else {
          crossoverSchedule.data.amosList[i].head =
            schedule2.data.amosList[i].head;
        }
        // crossoverSchedule.data.amosList[i].printList();
      }

      // throw new Error(`STOPI`);

      // for (let s = 0; s < crossoverSchedule.data.getGrid().length; s++) {
      //   for (let a = 0; a < crossoverSchedule.data.getGrid()[s].length; a++) {
      //     if (Math.random() > 0.5) {
      //       crossoverSchedule.data.getGrid()[s][a] =
      //         schedule1.data.getGrid()[s][a];
      //     } else {
      //       crossoverSchedule.data.getGrid()[s][a] =
      //         schedule2.data.getGrid()[s][a];
      //     }
      //   }
      // }

      crossoverSchedule.isFitnessChanged = true;
      crossoverSchedule.getFitness();
      return crossoverSchedule;
    }

    mutateSchedule(mutateSchedule) {
      let schedule = new Schedule(
        new Data(this.amosList, this.people)
      ).initialize();

      for (let i = 0; i < mutateSchedule.data.amosList.length; i++) {
        if (MUTATION_RATE > Math.random()) {
          mutateSchedule.data.amosList[i].head = schedule.data.amosList[i].head;
        }
      }

      // throw new Error(`Mutate Schedule ()`);

      // for (let s = 0; s < mutateSchedule.data.getGrid().length; s++) {
      //   for (let a = 0; a < mutateSchedule.data.getGrid()[s].length; a++) {
      //     if (MUTATION_RATE > Math.random()) {
      //       mutateSchedule.data.getGrid()[s][a] = schedule.data.getGrid()[s][a];
      //     }
      //   }
      // }

      mutateSchedule.isFitnessChanged = true;
      // No need to getFitness() for mutateSchedule here
      // Need to understand why fitness can go up whereas mutation is
      // expected to only make it worse !
      // --> Pb fitness basee sur l'intersection ???
      mutateSchedule.getFitness();
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

  var population = new Population(POPULATION_SIZE, amosList, people);
  // console.log(`pop --> ${JSON.stringify(population)}`);

  let generationNumber = 0;

  sortSchedulesByFitness(population.getSchedules());

  let geneticAlgorithm = new GeneticAlgorithm(amosList, people);

  while (population.getSchedules()[0].getFitness() !== 1.0) {
    generationNumber += 1;
    population = geneticAlgorithm.evolve(population);
    // throw new Error(`FIN CODE`);
    sortSchedulesByFitness(population.getSchedules());
    console.log(population.getSchedules()[0].fitness);
  }

  // console.log("placed");

  let amoMargin = 0;
  let totalMargin = 0;
  // population.getSchedules()[0].data.printAmos();
  for (
    let i = 0;
    i < population.getSchedules()[0].data.getAmosList().length;
    i++
  ) {
    amoMargin = population.getSchedules()[0].data.getAmosList()[i].getMargin();
    totalMargin += amoMargin;
    console.log(
      `Margin : ${amoMargin}, placedPeople.length : ${JSON.stringify(
        population.getSchedules()[0].getPlacedPeople()
      )}`
    );
  }

  console.log(`end, total margin : ${totalMargin}`);
  // return population.getSchedules()[0].data.getGrid();
};

module.exports = { ftGenetic, getAvailables, reducer };
