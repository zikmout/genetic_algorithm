const moment = require("moment");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

POPULATION_SIZE = 9;
NUMB_OF_ELITE_SCHEDULES = 1;
TOURNAMENT_SELECTION_SIZE = 3;
MUTATION_RATE = 0.1;

const AMOS = [
  ["A1", "Kliffa MELLAZ"],
  ["A2", "Jérémie YULZARI"],
  ["A3", "Antoine FREREJEAN"],
];

const MEETING_TIMES = [
  ["MT1", "M 09:00 - 10:00"],
  ["MT2", "M 09:30 - 10:30"],
  ["MT3", "M 10:00 - 11:00"],
  ["MT4", "M 10:30 - 11:30"],
  ["MT5", "M 11:00 - 12:00"],
  ["MT6", "M 09:00 - 10:30"],
  ["MT7", "M 09:30 - 11:00"],
  ["MT8", "M 10:00 - 11:30"],
  ["MT9", "M 10:30 - 12:00"],
  ["MT10", "T 09:00 - 10:00"],
  ["MT11", "T 09:30 - 10:30"],
  ["MT12", "T 10:00 - 11:00"],
  ["MT13", "T 10:30 - 11:30"],
  ["MT14", "T 11:00 - 12:00"],
  ["MT15", "T 09:00 - 10:30"],
  ["MT16", "T 09:30 - 11:00"],
  ["MT17", "T 10:00 - 11:30"],
  ["MT18", "T 10:30 - 12:00"],
  ["MT19", "W 09:00 - 10:00"],
  ["MT20", "W 09:30 - 10:30"],
  ["MT21", "W 10:00 - 11:00"],
  ["MT22", "W 10:30 - 11:30"],
  ["MT23", "W 11:00 - 12:00"],
  ["MT24", "W 09:00 - 10:30"],
  ["MT25", "W 09:30 - 11:00"],
  ["MT26", "W 10:00 - 11:30"],
  ["MT27", "W 10:30 - 12:00"],
  ["MT28", "TH 09:00 - 10:00"],
  ["MT29", "TH 09:30 - 10:30"],
  ["MT30", "TH 10:00 - 11:00"],
  ["MT31", "TH 10:30 - 11:30"],
  ["MT32", "TH 11:00 - 12:00"],
  ["MT33", "TH 09:00 - 10:30"],
  ["MT34", "TH 09:30 - 11:00"],
  ["MT35", "TH 10:00 - 11:30"],
  ["MT36", "TH 10:30 - 12:00"],
  ["MT37", "F 09:00 - 10:00"],
  ["MT38", "F 09:30 - 10:30"],
  ["MT39", "F 10:00 - 11:00"],
  ["MT40", "F 10:30 - 11:30"],
  ["MT41", "F 11:00 - 12:00"],
  ["MT42", "F 09:00 - 10:30"],
  ["MT43", "F 09:30 - 11:00"],
  ["MT44", "F 10:00 - 11:30"],
  ["MT45", "F 10:30 - 12:00"],
];

const RDV_TYPES = [
  ["L1", "3 1H"],
  ["L2", "2 2H"],
];

class Data {
  constructor() {
    this.amos = [];
    this.meetingTimes = [];
    this.rdvTypes = [];
    this.numberOfRdvs = 0;

    let _ = AMOS;
    for (let i = 0; i < _.length; i++) {
      this.amos.push(new Amo(_[i][0], _[i][1]));
    }

    _ = MEETING_TIMES;
    for (let i = 0; i < _.length; i++) {
      this.meetingTimes.push(new MeetingTime(_[i][0], _[i][1]));
    }

    _ = RDV_TYPES;
    for (let i = 0; i < _.length; i++) {
      let splitted = _[i][1].split(" ");
      this.numberOfRdvs += parseInt(splitted[0]);
      this.rdvTypes.push(new RdvType(_[i][0], splitted[0], splitted[1]));
    }
  }

  getAmos() {
    return this.amos;
  }

  getMeetingTimes() {
    return this.meetingTimes;
  }

  getRdvTypes() {
    return this.rdvTypes;
  }

  getNumberOfRdvs() {
    return this.numberOfRdvs;
  }
}

class Amo {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getDescription() {
    console.log(`Amo - id : ${this.id}, name : ${this.name}`);
  }
}

class MeetingTime {
  constructor(id, time) {
    this.id = id;
    this.time = time;
  }
  getId() {
    return this.id;
  }
  getTime() {
    return this.time;
  }
  getDescription() {
    console.log(`MeetingTime - id : ${this.id}, time : ${this.time}`);
  }
}

class Rdv {
  constructor(id, length) {
    this.id = id;
    this.length = length;
    this.meetingTime = undefined;
    this.amo = undefined;
  }
  getId() {
    return this.id;
  }
  getLength() {
    return this.length;
  }
  getMeetingTime() {
    return this.meetingTime;
  }
  getAmo() {
    return this.amo;
  }
  setMeetingTime(meetingTime) {
    this.meetingTime = meetingTime;
  }
  setAmo(amo) {
    this.amo = amo;
  }
  getDescription() {
    return `${this.id}, ${
      this.length
    }, ${this.meetingTime.getTime()}, ${this.amo.getId()}`;
  }
}

class RdvType {
  constructor(id, number, length) {
    this.id = id;
    this.number = number;
    this.length = length;
  }
  getNumber() {
    return this.number;
  }
  getLength() {
    return this.length;
  }
  getId() {
    return this.id;
  }
  getDescription() {
    console.log(`RdvType() - duree : ${this.length}, nombre : ${this.number}`);
  }
}

// let data = new Data();

class Schedule {
  constructor() {
    this.data = data;
    this.rdvs = [];
    this.numberOfConflicts = 0;
    this.fitness = -1;
    this.rdvNumb = 0;
    this.isFitnessChanged = true;
  }

  getRdvs() {
    this.isFitnessChanged = true;
    return this.rdvs;
  }

  getNumberOfConflicts() {
    return this.numberOfConflicts;
  }

  getFitness() {
    // console.log(`getFitness()`);
    if (this.isFitnessChanged) {
      this.fitness = this.calculateFitness();
      this.isFitnessChanged = false;
    }
    return this.fitness;
  }

  initialize() {
    let rdvTypes = this.data.getRdvTypes();
    let meetingTimes = this.data.getMeetingTimes();
    let amos = this.data.getAmos();

    for (let i = 0; i < rdvTypes.length; i++) {
      for (let j = 0; j < rdvTypes[i].getNumber(); j++) {
        let rdv = new Rdv(this.rdvNumb, rdvTypes[i].getLength());
        rdv.setMeetingTime(
          meetingTimes[getRandomInt(0, meetingTimes.length - 1)]
        );
        rdv.setAmo(amos[getRandomInt(0, amos.length - 1)]);
        this.rdvs.push(rdv);
        this.rdvNumb += 1;
      }
    }
    return this;
  }

  calculateFitness() {
    this.numberOfConflicts = 0;
    let rdvs = this.getRdvs();
    // console.log(`calculateFitness()`);
    for (let i = 0; i < rdvs.length; i++) {
      // Verify Meeting Time Length == Rdv Length
      if (
        rdvs[i].getLength() !==
        getHourLength(rdvs[i].getMeetingTime().getTime())
      ) {
        this.numberOfConflicts += 1;
      }

      // Verify Amo is not booked elsewhere at same time
      if (isAmoBookedSameTime(rdvs[i], rdvs)) {
        this.numberOfConflicts += 1;
      }
    }
    return 1 / (1.0 * this.numberOfConflicts + 1);
  }

  getDescription() {
    let retVal = "";
    for (let i = 0; i < this.rdvs.length - 1; i++) {
      retVal += `${this.rdvs[i].getDescription()} | `;
    }
    retVal += `${this.rdvs[this.rdvs.length - 1].getDescription()}`;
    return retVal;
  }
}

class Population {
  constructor(size) {
    this.size = size;
    this.data = data;
    this.schedules = [];
    for (let i = 0; i < size; i++) {
      this.schedules.push(new Schedule().initialize());
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
    return crossoverPop; // returns only the one with the highest fitness
  }

  mutatePopulation(population) {
    for (let i = NUMB_OF_ELITE_SCHEDULES; i < POPULATION_SIZE; i++) {
      this.mutateSchedule(population.getSchedules()[i]);
    }
    return population;
  }

  crossoverSchedule(schedule1, schedule2) {
    let crossoverSchedule = new Schedule().initialize();
    for (let i = 0; i < crossoverSchedule.getRdvs().length; i++) {
      if (Math.random() > 0.5) {
        crossoverSchedule.getRdvs()[i] = schedule1.getRdvs()[i];
      } else {
        crossoverSchedule.getRdvs()[i] = schedule2.getRdvs()[i];
      }
    }
    return crossoverSchedule;
  }

  mutateSchedule(mutateSchedule) {
    let schedule = new Schedule().initialize();
    for (let i = 0; i < mutateSchedule.getRdvs().length; i++) {
      if (MUTATION_RATE > Math.random()) {
        mutateSchedule.getRdvs()[i] = schedule.getRdvs()[i];
      }
    }
    return mutateSchedule;
  }

  selectTournamentPopulation(pop) {
    let tournamentPop = new Population(0);
    for (let i = 0; i < TOURNAMENT_SELECTION_SIZE; i++) {
      tournamentPop
        .getSchedules()
        .push(pop.getSchedules()[getRandomInt(0, POPULATION_SIZE)]);
    }
    //   tournamentPop.getSchedules().sort() // sort on fitnes reverse true
    return tournamentPop;
  }
}

// let generationNb = 0;
// console.log(`\n> Generation # ${generationNb}`);
// let population = new Population(POPULATION_SIZE);

class DisplayManager {
  printAvailableData() {
    console.log(`All Available Data`);
    this.printMeetingTimes();
  }

  printGeneration(population) {
    let schedules = population.getSchedules();
    for (let i = 0; i < schedules.length; i++) {
      schedules[i].getFitness();
      console.log(
        `\nSchedule #${i + 1} (${schedules[
          i
        ].getNumberOfConflicts()} conflict(s), fitness : ${schedules[i]
          .getFitness()
          .toFixed(2)}): ${schedules[i].getDescription()}`
      );
    }
  }

  printMeetingTimes(population) {
    let mtimes = population.data.getMeetingTimes();
    for (let i = 0; i < mtimes.length; i++) {
      console.log(mtimes[i]);
    }
  }
}

// let dsp = new DisplayManager();
// dsp.printMeetingTimes();
// dsp.printGeneration(population);

// Genetic algorithm
// let geneticAlgorithm = new GeneticAlgorithm();
// while (population.getSchedules()[0].getFitness() !== 1) {
//   generationNb += 1;
//   console.log(`\n> Generation # ${generationNb}`);
//   population = geneticAlgorithm.evolve(population);
//   dsp.printGeneration(population);
// }
// console.log(`\n\n`);

let grid = [
  [
    [
      { start: 1635751800000, end: 1635753600000, booked: false },
      { start: 1635753600000, end: 1635755400000, booked: false },
      { start: 1635755400000, end: 1635757200000, booked: false },
      { start: 1635757200000, end: 1635759000000, booked: false },
      { start: 1635759000000, end: 1635760800000, booked: false },
      { start: 1635760800000, end: 1635762600000, booked: false },
      { start: 1635762600000, end: 1635764400000, booked: false },
      { start: 1635764400000, end: 1635766200000, booked: false },
    ],
    [
      { start: 1635751800000, end: 1635753600000, booked: false },
      { start: 1635753600000, end: 1635755400000, booked: false },
      { start: 1635755400000, end: 1635757200000, booked: false },
      { start: 1635757200000, end: 1635759000000, booked: false },
      { start: 1635759000000, end: 1635760800000, booked: false },
      { start: 1635760800000, end: 1635762600000, booked: false },
      { start: 1635762600000, end: 1635764400000, booked: false },
      { start: 1635764400000, end: 1635766200000, booked: false },
    ],
    [
      { start: 1635751800000, end: 1635753600000, booked: false },
      { start: 1635753600000, end: 1635755400000, booked: false },
      { start: 1635755400000, end: 1635757200000, booked: false },
      { start: 1635757200000, end: 1635759000000, booked: false },
      { start: 1635759000000, end: 1635760800000, booked: false },
      { start: 1635760800000, end: 1635762600000, booked: false },
      { start: 1635762600000, end: 1635764400000, booked: false },
      { start: 1635764400000, end: 1635766200000, booked: false },
    ],
  ],
  [
    [
      { start: 1635769800000, end: 1635771600000, booked: false },
      { start: 1635771600000, end: 1635773400000, booked: false },
      { start: 1635773400000, end: 1635775200000, booked: false },
      { start: 1635775200000, end: 1635777000000, booked: false },
      { start: 1635777000000, end: 1635778800000, booked: false },
      { start: 1635778800000, end: 1635780600000, booked: false },
      { start: 1635780600000, end: 1635782400000, booked: false },
      { start: 1635782400000, end: 1635784200000, booked: false },
      { start: 1635784200000, end: 1635786000000, booked: false },
      { start: 1635786000000, end: 1635787800000, booked: false },
    ],
    [
      { start: 1635769800000, end: 1635771600000, booked: false },
      { start: 1635771600000, end: 1635773400000, booked: false },
      { start: 1635773400000, end: 1635775200000, booked: false },
      { start: 1635775200000, end: 1635777000000, booked: false },
      { start: 1635777000000, end: 1635778800000, booked: false },
      { start: 1635778800000, end: 1635780600000, booked: false },
      { start: 1635780600000, end: 1635782400000, booked: false },
      { start: 1635782400000, end: 1635784200000, booked: false },
      { start: 1635784200000, end: 1635786000000, booked: false },
      { start: 1635786000000, end: 1635787800000, booked: false },
    ],
    [
      { start: 1635769800000, end: 1635771600000, booked: false },
      { start: 1635771600000, end: 1635773400000, booked: false },
      { start: 1635773400000, end: 1635775200000, booked: false },
      { start: 1635775200000, end: 1635777000000, booked: false },
      { start: 1635777000000, end: 1635778800000, booked: false },
      { start: 1635778800000, end: 1635780600000, booked: false },
      { start: 1635780600000, end: 1635782400000, booked: false },
      { start: 1635782400000, end: 1635784200000, booked: false },
      { start: 1635784200000, end: 1635786000000, booked: false },
      { start: 1635786000000, end: 1635787800000, booked: false },
    ],
  ],
  [
    [
      { start: 1635838200000, end: 1635840000000, booked: false },
      { start: 1635840000000, end: 1635841800000, booked: false },
      { start: 1635841800000, end: 1635843600000, booked: false },
      { start: 1635843600000, end: 1635845400000, booked: false },
      { start: 1635845400000, end: 1635847200000, booked: false },
      { start: 1635847200000, end: 1635849000000, booked: false },
      { start: 1635849000000, end: 1635850800000, booked: false },
      { start: 1635850800000, end: 1635852600000, booked: false },
    ],
    [
      { start: 1635838200000, end: 1635840000000, booked: false },
      { start: 1635840000000, end: 1635841800000, booked: false },
      { start: 1635841800000, end: 1635843600000, booked: false },
      { start: 1635843600000, end: 1635845400000, booked: false },
      { start: 1635845400000, end: 1635847200000, booked: false },
      { start: 1635847200000, end: 1635849000000, booked: false },
      { start: 1635849000000, end: 1635850800000, booked: false },
      { start: 1635850800000, end: 1635852600000, booked: false },
    ],
    [
      { start: 1635838200000, end: 1635840000000, booked: false },
      { start: 1635840000000, end: 1635841800000, booked: false },
      { start: 1635841800000, end: 1635843600000, booked: false },
      { start: 1635843600000, end: 1635845400000, booked: false },
      { start: 1635845400000, end: 1635847200000, booked: false },
      { start: 1635847200000, end: 1635849000000, booked: false },
      { start: 1635849000000, end: 1635850800000, booked: false },
      { start: 1635850800000, end: 1635852600000, booked: false },
    ],
  ],
  [
    [
      { start: 1635856200000, end: 1635858000000, booked: false },
      { start: 1635858000000, end: 1635859800000, booked: false },
      { start: 1635859800000, end: 1635861600000, booked: false },
      { start: 1635861600000, end: 1635863400000, booked: false },
      { start: 1635863400000, end: 1635865200000, booked: false },
      { start: 1635865200000, end: 1635867000000, booked: false },
      { start: 1635867000000, end: 1635868800000, booked: false },
      { start: 1635868800000, end: 1635870600000, booked: false },
      { start: 1635870600000, end: 1635872400000, booked: false },
      { start: 1635872400000, end: 1635874200000, booked: false },
    ],
    [
      { start: 1635856200000, end: 1635858000000, booked: false },
      { start: 1635858000000, end: 1635859800000, booked: false },
      { start: 1635859800000, end: 1635861600000, booked: false },
      { start: 1635861600000, end: 1635863400000, booked: false },
      { start: 1635863400000, end: 1635865200000, booked: false },
      { start: 1635865200000, end: 1635867000000, booked: false },
      { start: 1635867000000, end: 1635868800000, booked: false },
      { start: 1635868800000, end: 1635870600000, booked: false },
      { start: 1635870600000, end: 1635872400000, booked: false },
      { start: 1635872400000, end: 1635874200000, booked: false },
    ],
    [
      { start: 1635856200000, end: 1635858000000, booked: false },
      { start: 1635858000000, end: 1635859800000, booked: false },
      { start: 1635859800000, end: 1635861600000, booked: false },
      { start: 1635861600000, end: 1635863400000, booked: false },
      { start: 1635863400000, end: 1635865200000, booked: false },
      { start: 1635865200000, end: 1635867000000, booked: false },
      { start: 1635867000000, end: 1635868800000, booked: false },
      { start: 1635868800000, end: 1635870600000, booked: false },
      { start: 1635870600000, end: 1635872400000, booked: false },
      { start: 1635872400000, end: 1635874200000, booked: false },
    ],
  ],
  [
    [
      { start: 1635924600000, end: 1635926400000, booked: false },
      { start: 1635926400000, end: 1635928200000, booked: false },
      { start: 1635928200000, end: 1635930000000, booked: false },
      { start: 1635930000000, end: 1635931800000, booked: false },
      { start: 1635931800000, end: 1635933600000, booked: false },
      { start: 1635933600000, end: 1635935400000, booked: false },
      { start: 1635935400000, end: 1635937200000, booked: false },
      { start: 1635937200000, end: 1635939000000, booked: false },
    ],
  ],
  [
    [
      { start: 1635942600000, end: 1635944400000, booked: false },
      { start: 1635944400000, end: 1635946200000, booked: false },
      { start: 1635946200000, end: 1635948000000, booked: false },
      { start: 1635948000000, end: 1635949800000, booked: false },
      { start: 1635949800000, end: 1635951600000, booked: false },
      { start: 1635951600000, end: 1635953400000, booked: false },
      { start: 1635953400000, end: 1635955200000, booked: false },
      { start: 1635955200000, end: 1635957000000, booked: false },
      { start: 1635957000000, end: 1635958800000, booked: false },
      { start: 1635958800000, end: 1635960600000, booked: false },
    ],
  ],
  [
    [
      { start: 1636011000000, end: 1636012800000, booked: false },
      { start: 1636012800000, end: 1636014600000, booked: false },
      { start: 1636014600000, end: 1636016400000, booked: false },
      { start: 1636016400000, end: 1636018200000, booked: false },
      { start: 1636018200000, end: 1636020000000, booked: false },
      { start: 1636020000000, end: 1636021800000, booked: false },
      { start: 1636021800000, end: 1636023600000, booked: false },
      { start: 1636023600000, end: 1636025400000, booked: false },
    ],
    [
      { start: 1636011000000, end: 1636012800000, booked: false },
      { start: 1636012800000, end: 1636014600000, booked: false },
      { start: 1636014600000, end: 1636016400000, booked: false },
      { start: 1636016400000, end: 1636018200000, booked: false },
      { start: 1636018200000, end: 1636020000000, booked: false },
      { start: 1636020000000, end: 1636021800000, booked: false },
      { start: 1636021800000, end: 1636023600000, booked: false },
      { start: 1636023600000, end: 1636025400000, booked: false },
    ],
  ],
  [
    [
      { start: 1636029000000, end: 1636030800000, booked: false },
      { start: 1636030800000, end: 1636032600000, booked: false },
      { start: 1636032600000, end: 1636034400000, booked: false },
      { start: 1636034400000, end: 1636036200000, booked: false },
      { start: 1636036200000, end: 1636038000000, booked: false },
      { start: 1636038000000, end: 1636039800000, booked: false },
      { start: 1636039800000, end: 1636041600000, booked: false },
      { start: 1636041600000, end: 1636043400000, booked: false },
      { start: 1636043400000, end: 1636045200000, booked: false },
      { start: 1636045200000, end: 1636047000000, booked: false },
    ],
    [
      { start: 1636029000000, end: 1636030800000, booked: false },
      { start: 1636030800000, end: 1636032600000, booked: false },
      { start: 1636032600000, end: 1636034400000, booked: false },
      { start: 1636034400000, end: 1636036200000, booked: false },
      { start: 1636036200000, end: 1636038000000, booked: false },
      { start: 1636038000000, end: 1636039800000, booked: false },
      { start: 1636039800000, end: 1636041600000, booked: false },
      { start: 1636041600000, end: 1636043400000, booked: false },
      { start: 1636043400000, end: 1636045200000, booked: false },
      { start: 1636045200000, end: 1636047000000, booked: false },
    ],
  ],
  [
    [
      { start: 1636097400000, end: 1636099200000, booked: false },
      { start: 1636099200000, end: 1636101000000, booked: false },
      { start: 1636101000000, end: 1636102800000, booked: false },
      { start: 1636102800000, end: 1636104600000, booked: false },
      { start: 1636104600000, end: 1636106400000, booked: false },
      { start: 1636106400000, end: 1636108200000, booked: false },
      { start: 1636108200000, end: 1636110000000, booked: false },
      { start: 1636110000000, end: 1636111800000, booked: false },
    ],
    [
      { start: 1636097400000, end: 1636099200000, booked: false },
      { start: 1636099200000, end: 1636101000000, booked: false },
      { start: 1636101000000, end: 1636102800000, booked: false },
      { start: 1636102800000, end: 1636104600000, booked: false },
      { start: 1636104600000, end: 1636106400000, booked: false },
      { start: 1636106400000, end: 1636108200000, booked: false },
      { start: 1636108200000, end: 1636110000000, booked: false },
      { start: 1636110000000, end: 1636111800000, booked: false },
    ],
  ],
  [
    [
      { start: 1636115400000, end: 1636117200000, booked: false },
      { start: 1636117200000, end: 1636119000000, booked: false },
      { start: 1636119000000, end: 1636120800000, booked: false },
      { start: 1636120800000, end: 1636122600000, booked: false },
      { start: 1636122600000, end: 1636124400000, booked: false },
      { start: 1636124400000, end: 1636126200000, booked: false },
      { start: 1636126200000, end: 1636128000000, booked: false },
      { start: 1636128000000, end: 1636129800000, booked: false },
      { start: 1636129800000, end: 1636131600000, booked: false },
      { start: 1636131600000, end: 1636133400000, booked: false },
    ],
    [
      { start: 1636115400000, end: 1636117200000, booked: false },
      { start: 1636117200000, end: 1636119000000, booked: false },
      { start: 1636119000000, end: 1636120800000, booked: false },
      { start: 1636120800000, end: 1636122600000, booked: false },
      { start: 1636122600000, end: 1636124400000, booked: false },
      { start: 1636124400000, end: 1636126200000, booked: false },
      { start: 1636126200000, end: 1636128000000, booked: false },
      { start: 1636128000000, end: 1636129800000, booked: false },
      { start: 1636129800000, end: 1636131600000, booked: false },
      { start: 1636131600000, end: 1636133400000, booked: false },
    ],
  ],
  [
    [
      { start: 1636356600000, end: 1636358400000, booked: false },
      { start: 1636358400000, end: 1636360200000, booked: false },
      { start: 1636360200000, end: 1636362000000, booked: false },
      { start: 1636362000000, end: 1636363800000, booked: false },
      { start: 1636363800000, end: 1636365600000, booked: false },
      { start: 1636365600000, end: 1636367400000, booked: false },
      { start: 1636367400000, end: 1636369200000, booked: false },
      { start: 1636369200000, end: 1636371000000, booked: false },
    ],
    [
      { start: 1636356600000, end: 1636358400000, booked: false },
      { start: 1636358400000, end: 1636360200000, booked: false },
      { start: 1636360200000, end: 1636362000000, booked: false },
      { start: 1636362000000, end: 1636363800000, booked: false },
      { start: 1636363800000, end: 1636365600000, booked: false },
      { start: 1636365600000, end: 1636367400000, booked: false },
      { start: 1636367400000, end: 1636369200000, booked: false },
      { start: 1636369200000, end: 1636371000000, booked: false },
    ],
    [
      { start: 1636356600000, end: 1636358400000, booked: false },
      { start: 1636358400000, end: 1636360200000, booked: false },
      { start: 1636360200000, end: 1636362000000, booked: false },
      { start: 1636362000000, end: 1636363800000, booked: false },
      { start: 1636363800000, end: 1636365600000, booked: false },
      { start: 1636365600000, end: 1636367400000, booked: false },
      { start: 1636367400000, end: 1636369200000, booked: false },
      { start: 1636369200000, end: 1636371000000, booked: false },
    ],
    [
      { start: 1636356600000, end: 1636358400000, booked: false },
      { start: 1636358400000, end: 1636360200000, booked: false },
      { start: 1636360200000, end: 1636362000000, booked: false },
      { start: 1636362000000, end: 1636363800000, booked: false },
      { start: 1636363800000, end: 1636365600000, booked: false },
      { start: 1636365600000, end: 1636367400000, booked: false },
      { start: 1636367400000, end: 1636369200000, booked: false },
      { start: 1636369200000, end: 1636371000000, booked: false },
    ],
  ],
  [
    [
      { start: 1636374600000, end: 1636376400000, booked: false },
      { start: 1636376400000, end: 1636378200000, booked: false },
      { start: 1636378200000, end: 1636380000000, booked: false },
      { start: 1636380000000, end: 1636381800000, booked: false },
      { start: 1636381800000, end: 1636383600000, booked: false },
      { start: 1636383600000, end: 1636385400000, booked: false },
      { start: 1636385400000, end: 1636387200000, booked: false },
      { start: 1636387200000, end: 1636389000000, booked: false },
      { start: 1636389000000, end: 1636390800000, booked: false },
      { start: 1636390800000, end: 1636392600000, booked: false },
    ],
    [
      { start: 1636374600000, end: 1636376400000, booked: false },
      { start: 1636376400000, end: 1636378200000, booked: false },
      { start: 1636378200000, end: 1636380000000, booked: false },
      { start: 1636380000000, end: 1636381800000, booked: false },
      { start: 1636381800000, end: 1636383600000, booked: false },
      { start: 1636383600000, end: 1636385400000, booked: false },
      { start: 1636385400000, end: 1636387200000, booked: false },
      { start: 1636387200000, end: 1636389000000, booked: false },
      { start: 1636389000000, end: 1636390800000, booked: false },
      { start: 1636390800000, end: 1636392600000, booked: false },
    ],
    [
      { start: 1636374600000, end: 1636376400000, booked: false },
      { start: 1636376400000, end: 1636378200000, booked: false },
      { start: 1636378200000, end: 1636380000000, booked: false },
      { start: 1636380000000, end: 1636381800000, booked: false },
      { start: 1636381800000, end: 1636383600000, booked: false },
      { start: 1636383600000, end: 1636385400000, booked: false },
      { start: 1636385400000, end: 1636387200000, booked: false },
      { start: 1636387200000, end: 1636389000000, booked: false },
      { start: 1636389000000, end: 1636390800000, booked: false },
      { start: 1636390800000, end: 1636392600000, booked: false },
    ],
    [
      { start: 1636374600000, end: 1636376400000, booked: false },
      { start: 1636376400000, end: 1636378200000, booked: false },
      { start: 1636378200000, end: 1636380000000, booked: false },
      { start: 1636380000000, end: 1636381800000, booked: false },
      { start: 1636381800000, end: 1636383600000, booked: false },
      { start: 1636383600000, end: 1636385400000, booked: false },
      { start: 1636385400000, end: 1636387200000, booked: false },
      { start: 1636387200000, end: 1636389000000, booked: false },
      { start: 1636389000000, end: 1636390800000, booked: false },
      { start: 1636390800000, end: 1636392600000, booked: false },
    ],
  ],
  [
    [
      { start: 1636443000000, end: 1636444800000, booked: false },
      { start: 1636444800000, end: 1636446600000, booked: false },
      { start: 1636446600000, end: 1636448400000, booked: false },
      { start: 1636448400000, end: 1636450200000, booked: false },
      { start: 1636450200000, end: 1636452000000, booked: false },
      { start: 1636452000000, end: 1636453800000, booked: false },
      { start: 1636453800000, end: 1636455600000, booked: false },
      { start: 1636455600000, end: 1636457400000, booked: false },
    ],
  ],
  [
    [
      { start: 1636461000000, end: 1636462800000, booked: false },
      { start: 1636462800000, end: 1636464600000, booked: false },
      { start: 1636464600000, end: 1636466400000, booked: false },
      { start: 1636466400000, end: 1636468200000, booked: false },
      { start: 1636468200000, end: 1636470000000, booked: false },
      { start: 1636470000000, end: 1636471800000, booked: false },
      { start: 1636471800000, end: 1636473600000, booked: false },
      { start: 1636473600000, end: 1636475400000, booked: false },
      { start: 1636475400000, end: 1636477200000, booked: false },
      { start: 1636477200000, end: 1636479000000, booked: false },
    ],
  ],
  [
    [
      { start: 1636529400000, end: 1636531200000, booked: false },
      { start: 1636531200000, end: 1636533000000, booked: false },
      { start: 1636533000000, end: 1636534800000, booked: false },
      { start: 1636534800000, end: 1636536600000, booked: false },
      { start: 1636536600000, end: 1636538400000, booked: false },
      { start: 1636538400000, end: 1636540200000, booked: false },
      { start: 1636540200000, end: 1636542000000, booked: false },
      { start: 1636542000000, end: 1636543800000, booked: false },
    ],
  ],
  [
    [
      { start: 1636547400000, end: 1636549200000, booked: false },
      { start: 1636549200000, end: 1636551000000, booked: false },
      { start: 1636551000000, end: 1636552800000, booked: false },
      { start: 1636552800000, end: 1636554600000, booked: false },
      { start: 1636554600000, end: 1636556400000, booked: false },
      { start: 1636556400000, end: 1636558200000, booked: false },
      { start: 1636558200000, end: 1636560000000, booked: false },
      { start: 1636560000000, end: 1636561800000, booked: false },
      { start: 1636561800000, end: 1636563600000, booked: false },
      { start: 1636563600000, end: 1636565400000, booked: false },
    ],
  ],
  [
    [
      { start: 1636615800000, end: 1636617600000, booked: false },
      { start: 1636617600000, end: 1636619400000, booked: false },
      { start: 1636619400000, end: 1636621200000, booked: false },
      { start: 1636621200000, end: 1636623000000, booked: false },
      { start: 1636623000000, end: 1636624800000, booked: false },
      { start: 1636624800000, end: 1636626600000, booked: false },
      { start: 1636626600000, end: 1636628400000, booked: false },
      { start: 1636628400000, end: 1636630200000, booked: false },
    ],
    [
      { start: 1636615800000, end: 1636617600000, booked: false },
      { start: 1636617600000, end: 1636619400000, booked: false },
      { start: 1636619400000, end: 1636621200000, booked: false },
      { start: 1636621200000, end: 1636623000000, booked: false },
      { start: 1636623000000, end: 1636624800000, booked: false },
      { start: 1636624800000, end: 1636626600000, booked: false },
      { start: 1636626600000, end: 1636628400000, booked: false },
      { start: 1636628400000, end: 1636630200000, booked: false },
    ],
    [
      { start: 1636615800000, end: 1636617600000, booked: false },
      { start: 1636617600000, end: 1636619400000, booked: false },
      { start: 1636619400000, end: 1636621200000, booked: false },
      { start: 1636621200000, end: 1636623000000, booked: false },
      { start: 1636623000000, end: 1636624800000, booked: false },
      { start: 1636624800000, end: 1636626600000, booked: false },
      { start: 1636626600000, end: 1636628400000, booked: false },
      { start: 1636628400000, end: 1636630200000, booked: false },
    ],
  ],
  [
    [
      { start: 1636633800000, end: 1636635600000, booked: false },
      { start: 1636635600000, end: 1636637400000, booked: false },
      { start: 1636637400000, end: 1636639200000, booked: false },
      { start: 1636639200000, end: 1636641000000, booked: false },
      { start: 1636641000000, end: 1636642800000, booked: false },
      { start: 1636642800000, end: 1636644600000, booked: false },
      { start: 1636644600000, end: 1636646400000, booked: false },
      { start: 1636646400000, end: 1636648200000, booked: false },
      { start: 1636648200000, end: 1636650000000, booked: false },
      { start: 1636650000000, end: 1636651800000, booked: false },
    ],
    [
      { start: 1636633800000, end: 1636635600000, booked: false },
      { start: 1636635600000, end: 1636637400000, booked: false },
      { start: 1636637400000, end: 1636639200000, booked: false },
      { start: 1636639200000, end: 1636641000000, booked: false },
      { start: 1636641000000, end: 1636642800000, booked: false },
      { start: 1636642800000, end: 1636644600000, booked: false },
      { start: 1636644600000, end: 1636646400000, booked: false },
      { start: 1636646400000, end: 1636648200000, booked: false },
      { start: 1636648200000, end: 1636650000000, booked: false },
      { start: 1636650000000, end: 1636651800000, booked: false },
    ],
    [
      { start: 1636633800000, end: 1636635600000, booked: false },
      { start: 1636635600000, end: 1636637400000, booked: false },
      { start: 1636637400000, end: 1636639200000, booked: false },
      { start: 1636639200000, end: 1636641000000, booked: false },
      { start: 1636641000000, end: 1636642800000, booked: false },
      { start: 1636642800000, end: 1636644600000, booked: false },
      { start: 1636644600000, end: 1636646400000, booked: false },
      { start: 1636646400000, end: 1636648200000, booked: false },
      { start: 1636648200000, end: 1636650000000, booked: false },
      { start: 1636650000000, end: 1636651800000, booked: false },
    ],
  ],
  [
    [
      { start: 1636702200000, end: 1636704000000, booked: false },
      { start: 1636704000000, end: 1636705800000, booked: false },
      { start: 1636705800000, end: 1636707600000, booked: false },
      { start: 1636707600000, end: 1636709400000, booked: false },
      { start: 1636709400000, end: 1636711200000, booked: false },
      { start: 1636711200000, end: 1636713000000, booked: false },
      { start: 1636713000000, end: 1636714800000, booked: false },
      { start: 1636714800000, end: 1636716600000, booked: false },
    ],
    [
      { start: 1636702200000, end: 1636704000000, booked: false },
      { start: 1636704000000, end: 1636705800000, booked: false },
      { start: 1636705800000, end: 1636707600000, booked: false },
      { start: 1636707600000, end: 1636709400000, booked: false },
      { start: 1636709400000, end: 1636711200000, booked: false },
      { start: 1636711200000, end: 1636713000000, booked: false },
      { start: 1636713000000, end: 1636714800000, booked: false },
      { start: 1636714800000, end: 1636716600000, booked: false },
    ],
    [
      { start: 1636702200000, end: 1636704000000, booked: false },
      { start: 1636704000000, end: 1636705800000, booked: false },
      { start: 1636705800000, end: 1636707600000, booked: false },
      { start: 1636707600000, end: 1636709400000, booked: false },
      { start: 1636709400000, end: 1636711200000, booked: false },
      { start: 1636711200000, end: 1636713000000, booked: false },
      { start: 1636713000000, end: 1636714800000, booked: false },
      { start: 1636714800000, end: 1636716600000, booked: false },
    ],
    [
      { start: 1636702200000, end: 1636704000000, booked: false },
      { start: 1636704000000, end: 1636705800000, booked: false },
      { start: 1636705800000, end: 1636707600000, booked: false },
      { start: 1636707600000, end: 1636709400000, booked: false },
      { start: 1636709400000, end: 1636711200000, booked: false },
      { start: 1636711200000, end: 1636713000000, booked: false },
      { start: 1636713000000, end: 1636714800000, booked: false },
      { start: 1636714800000, end: 1636716600000, booked: false },
    ],
  ],
  [
    [
      { start: 1636720200000, end: 1636722000000, booked: false },
      { start: 1636722000000, end: 1636723800000, booked: false },
      { start: 1636723800000, end: 1636725600000, booked: false },
      { start: 1636725600000, end: 1636727400000, booked: false },
      { start: 1636727400000, end: 1636729200000, booked: false },
      { start: 1636729200000, end: 1636731000000, booked: false },
      { start: 1636731000000, end: 1636732800000, booked: false },
      { start: 1636732800000, end: 1636734600000, booked: false },
      { start: 1636734600000, end: 1636736400000, booked: false },
      { start: 1636736400000, end: 1636738200000, booked: false },
    ],
    [
      { start: 1636720200000, end: 1636722000000, booked: false },
      { start: 1636722000000, end: 1636723800000, booked: false },
      { start: 1636723800000, end: 1636725600000, booked: false },
      { start: 1636725600000, end: 1636727400000, booked: false },
      { start: 1636727400000, end: 1636729200000, booked: false },
      { start: 1636729200000, end: 1636731000000, booked: false },
      { start: 1636731000000, end: 1636732800000, booked: false },
      { start: 1636732800000, end: 1636734600000, booked: false },
      { start: 1636734600000, end: 1636736400000, booked: false },
      { start: 1636736400000, end: 1636738200000, booked: false },
    ],
    [
      { start: 1636720200000, end: 1636722000000, booked: false },
      { start: 1636722000000, end: 1636723800000, booked: false },
      { start: 1636723800000, end: 1636725600000, booked: false },
      { start: 1636725600000, end: 1636727400000, booked: false },
      { start: 1636727400000, end: 1636729200000, booked: false },
      { start: 1636729200000, end: 1636731000000, booked: false },
      { start: 1636731000000, end: 1636732800000, booked: false },
      { start: 1636732800000, end: 1636734600000, booked: false },
      { start: 1636734600000, end: 1636736400000, booked: false },
      { start: 1636736400000, end: 1636738200000, booked: false },
    ],
    [
      { start: 1636720200000, end: 1636722000000, booked: false },
      { start: 1636722000000, end: 1636723800000, booked: false },
      { start: 1636723800000, end: 1636725600000, booked: false },
      { start: 1636725600000, end: 1636727400000, booked: false },
      { start: 1636727400000, end: 1636729200000, booked: false },
      { start: 1636729200000, end: 1636731000000, booked: false },
      { start: 1636731000000, end: 1636732800000, booked: false },
      { start: 1636732800000, end: 1636734600000, booked: false },
      { start: 1636734600000, end: 1636736400000, booked: false },
      { start: 1636736400000, end: 1636738200000, booked: false },
    ],
  ],
  [
    [
      { start: 1636961400000, end: 1636963200000, booked: false },
      { start: 1636963200000, end: 1636965000000, booked: false },
      { start: 1636965000000, end: 1636966800000, booked: false },
      { start: 1636966800000, end: 1636968600000, booked: false },
      { start: 1636968600000, end: 1636970400000, booked: false },
      { start: 1636970400000, end: 1636972200000, booked: false },
      { start: 1636972200000, end: 1636974000000, booked: false },
      { start: 1636974000000, end: 1636975800000, booked: false },
    ],
    [
      { start: 1636961400000, end: 1636963200000, booked: false },
      { start: 1636963200000, end: 1636965000000, booked: false },
      { start: 1636965000000, end: 1636966800000, booked: false },
      { start: 1636966800000, end: 1636968600000, booked: false },
      { start: 1636968600000, end: 1636970400000, booked: false },
      { start: 1636970400000, end: 1636972200000, booked: false },
      { start: 1636972200000, end: 1636974000000, booked: false },
      { start: 1636974000000, end: 1636975800000, booked: false },
    ],
    [
      { start: 1636961400000, end: 1636963200000, booked: false },
      { start: 1636963200000, end: 1636965000000, booked: false },
      { start: 1636965000000, end: 1636966800000, booked: false },
      { start: 1636966800000, end: 1636968600000, booked: false },
      { start: 1636968600000, end: 1636970400000, booked: false },
      { start: 1636970400000, end: 1636972200000, booked: false },
      { start: 1636972200000, end: 1636974000000, booked: false },
      { start: 1636974000000, end: 1636975800000, booked: false },
    ],
    [
      { start: 1636961400000, end: 1636963200000, booked: false },
      { start: 1636963200000, end: 1636965000000, booked: false },
      { start: 1636965000000, end: 1636966800000, booked: false },
      { start: 1636966800000, end: 1636968600000, booked: false },
      { start: 1636968600000, end: 1636970400000, booked: false },
      { start: 1636970400000, end: 1636972200000, booked: false },
      { start: 1636972200000, end: 1636974000000, booked: false },
      { start: 1636974000000, end: 1636975800000, booked: false },
    ],
  ],
  [
    [
      { start: 1636979400000, end: 1636981200000, booked: false },
      { start: 1636981200000, end: 1636983000000, booked: false },
      { start: 1636983000000, end: 1636984800000, booked: false },
      { start: 1636984800000, end: 1636986600000, booked: false },
      { start: 1636986600000, end: 1636988400000, booked: false },
      { start: 1636988400000, end: 1636990200000, booked: false },
      { start: 1636990200000, end: 1636992000000, booked: false },
      { start: 1636992000000, end: 1636993800000, booked: false },
      { start: 1636993800000, end: 1636995600000, booked: false },
      { start: 1636995600000, end: 1636997400000, booked: false },
    ],
    [
      { start: 1636979400000, end: 1636981200000, booked: false },
      { start: 1636981200000, end: 1636983000000, booked: false },
      { start: 1636983000000, end: 1636984800000, booked: false },
      { start: 1636984800000, end: 1636986600000, booked: false },
      { start: 1636986600000, end: 1636988400000, booked: false },
      { start: 1636988400000, end: 1636990200000, booked: false },
      { start: 1636990200000, end: 1636992000000, booked: false },
      { start: 1636992000000, end: 1636993800000, booked: false },
      { start: 1636993800000, end: 1636995600000, booked: false },
      { start: 1636995600000, end: 1636997400000, booked: false },
    ],
    [
      { start: 1636979400000, end: 1636981200000, booked: false },
      { start: 1636981200000, end: 1636983000000, booked: false },
      { start: 1636983000000, end: 1636984800000, booked: false },
      { start: 1636984800000, end: 1636986600000, booked: false },
      { start: 1636986600000, end: 1636988400000, booked: false },
      { start: 1636988400000, end: 1636990200000, booked: false },
      { start: 1636990200000, end: 1636992000000, booked: false },
      { start: 1636992000000, end: 1636993800000, booked: false },
      { start: 1636993800000, end: 1636995600000, booked: false },
      { start: 1636995600000, end: 1636997400000, booked: false },
    ],
    [
      { start: 1636979400000, end: 1636981200000, booked: false },
      { start: 1636981200000, end: 1636983000000, booked: false },
      { start: 1636983000000, end: 1636984800000, booked: false },
      { start: 1636984800000, end: 1636986600000, booked: false },
      { start: 1636986600000, end: 1636988400000, booked: false },
      { start: 1636988400000, end: 1636990200000, booked: false },
      { start: 1636990200000, end: 1636992000000, booked: false },
      { start: 1636992000000, end: 1636993800000, booked: false },
      { start: 1636993800000, end: 1636995600000, booked: false },
      { start: 1636995600000, end: 1636997400000, booked: false },
    ],
  ],
  [
    [
      { start: 1637047800000, end: 1637049600000, booked: false },
      { start: 1637049600000, end: 1637051400000, booked: false },
      { start: 1637051400000, end: 1637053200000, booked: false },
      { start: 1637053200000, end: 1637055000000, booked: false },
      { start: 1637055000000, end: 1637056800000, booked: false },
      { start: 1637056800000, end: 1637058600000, booked: false },
      { start: 1637058600000, end: 1637060400000, booked: false },
      { start: 1637060400000, end: 1637062200000, booked: false },
    ],
  ],
  [
    [
      { start: 1637065800000, end: 1637067600000, booked: false },
      { start: 1637067600000, end: 1637069400000, booked: false },
      { start: 1637069400000, end: 1637071200000, booked: false },
      { start: 1637071200000, end: 1637073000000, booked: false },
      { start: 1637073000000, end: 1637074800000, booked: false },
      { start: 1637074800000, end: 1637076600000, booked: false },
      { start: 1637076600000, end: 1637078400000, booked: false },
      { start: 1637078400000, end: 1637080200000, booked: false },
      { start: 1637080200000, end: 1637082000000, booked: false },
      { start: 1637082000000, end: 1637083800000, booked: false },
    ],
  ],
  [
    [
      { start: 1637134200000, end: 1637136000000, booked: false },
      { start: 1637136000000, end: 1637137800000, booked: false },
      { start: 1637137800000, end: 1637139600000, booked: false },
      { start: 1637139600000, end: 1637141400000, booked: false },
      { start: 1637141400000, end: 1637143200000, booked: false },
      { start: 1637143200000, end: 1637145000000, booked: false },
      { start: 1637145000000, end: 1637146800000, booked: false },
      { start: 1637146800000, end: 1637148600000, booked: false },
    ],
    [
      { start: 1637134200000, end: 1637136000000, booked: false },
      { start: 1637136000000, end: 1637137800000, booked: false },
      { start: 1637137800000, end: 1637139600000, booked: false },
      { start: 1637139600000, end: 1637141400000, booked: false },
      { start: 1637141400000, end: 1637143200000, booked: false },
      { start: 1637143200000, end: 1637145000000, booked: false },
      { start: 1637145000000, end: 1637146800000, booked: false },
      { start: 1637146800000, end: 1637148600000, booked: false },
    ],
    [
      { start: 1637134200000, end: 1637136000000, booked: false },
      { start: 1637136000000, end: 1637137800000, booked: false },
      { start: 1637137800000, end: 1637139600000, booked: false },
      { start: 1637139600000, end: 1637141400000, booked: false },
      { start: 1637141400000, end: 1637143200000, booked: false },
      { start: 1637143200000, end: 1637145000000, booked: false },
      { start: 1637145000000, end: 1637146800000, booked: false },
      { start: 1637146800000, end: 1637148600000, booked: false },
    ],
    [
      { start: 1637134200000, end: 1637136000000, booked: false },
      { start: 1637136000000, end: 1637137800000, booked: false },
      { start: 1637137800000, end: 1637139600000, booked: false },
      { start: 1637139600000, end: 1637141400000, booked: false },
      { start: 1637141400000, end: 1637143200000, booked: false },
      { start: 1637143200000, end: 1637145000000, booked: false },
      { start: 1637145000000, end: 1637146800000, booked: false },
      { start: 1637146800000, end: 1637148600000, booked: false },
    ],
  ],
  [
    [
      { start: 1637152200000, end: 1637154000000, booked: false },
      { start: 1637154000000, end: 1637155800000, booked: false },
      { start: 1637155800000, end: 1637157600000, booked: false },
      { start: 1637157600000, end: 1637159400000, booked: false },
      { start: 1637159400000, end: 1637161200000, booked: false },
      { start: 1637161200000, end: 1637163000000, booked: false },
      { start: 1637163000000, end: 1637164800000, booked: false },
      { start: 1637164800000, end: 1637166600000, booked: false },
      { start: 1637166600000, end: 1637168400000, booked: false },
      { start: 1637168400000, end: 1637170200000, booked: false },
    ],
    [
      { start: 1637152200000, end: 1637154000000, booked: false },
      { start: 1637154000000, end: 1637155800000, booked: false },
      { start: 1637155800000, end: 1637157600000, booked: false },
      { start: 1637157600000, end: 1637159400000, booked: false },
      { start: 1637159400000, end: 1637161200000, booked: false },
      { start: 1637161200000, end: 1637163000000, booked: false },
      { start: 1637163000000, end: 1637164800000, booked: false },
      { start: 1637164800000, end: 1637166600000, booked: false },
      { start: 1637166600000, end: 1637168400000, booked: false },
      { start: 1637168400000, end: 1637170200000, booked: false },
    ],
    [
      { start: 1637152200000, end: 1637154000000, booked: false },
      { start: 1637154000000, end: 1637155800000, booked: false },
      { start: 1637155800000, end: 1637157600000, booked: false },
      { start: 1637157600000, end: 1637159400000, booked: false },
      { start: 1637159400000, end: 1637161200000, booked: false },
      { start: 1637161200000, end: 1637163000000, booked: false },
      { start: 1637163000000, end: 1637164800000, booked: false },
      { start: 1637164800000, end: 1637166600000, booked: false },
      { start: 1637166600000, end: 1637168400000, booked: false },
      { start: 1637168400000, end: 1637170200000, booked: false },
    ],
    [
      { start: 1637152200000, end: 1637154000000, booked: false },
      { start: 1637154000000, end: 1637155800000, booked: false },
      { start: 1637155800000, end: 1637157600000, booked: false },
      { start: 1637157600000, end: 1637159400000, booked: false },
      { start: 1637159400000, end: 1637161200000, booked: false },
      { start: 1637161200000, end: 1637163000000, booked: false },
      { start: 1637163000000, end: 1637164800000, booked: false },
      { start: 1637164800000, end: 1637166600000, booked: false },
      { start: 1637166600000, end: 1637168400000, booked: false },
      { start: 1637168400000, end: 1637170200000, booked: false },
    ],
  ],
  [
    [
      { start: 1637220600000, end: 1637222400000, booked: false },
      { start: 1637222400000, end: 1637224200000, booked: false },
      { start: 1637224200000, end: 1637226000000, booked: false },
      { start: 1637226000000, end: 1637227800000, booked: false },
      { start: 1637227800000, end: 1637229600000, booked: false },
      { start: 1637229600000, end: 1637231400000, booked: false },
      { start: 1637231400000, end: 1637233200000, booked: false },
      { start: 1637233200000, end: 1637235000000, booked: false },
    ],
    [
      { start: 1637220600000, end: 1637222400000, booked: false },
      { start: 1637222400000, end: 1637224200000, booked: false },
      { start: 1637224200000, end: 1637226000000, booked: false },
      { start: 1637226000000, end: 1637227800000, booked: false },
      { start: 1637227800000, end: 1637229600000, booked: false },
      { start: 1637229600000, end: 1637231400000, booked: false },
      { start: 1637231400000, end: 1637233200000, booked: false },
      { start: 1637233200000, end: 1637235000000, booked: false },
    ],
    [
      { start: 1637220600000, end: 1637222400000, booked: false },
      { start: 1637222400000, end: 1637224200000, booked: false },
      { start: 1637224200000, end: 1637226000000, booked: false },
      { start: 1637226000000, end: 1637227800000, booked: false },
      { start: 1637227800000, end: 1637229600000, booked: false },
      { start: 1637229600000, end: 1637231400000, booked: false },
      { start: 1637231400000, end: 1637233200000, booked: false },
      { start: 1637233200000, end: 1637235000000, booked: false },
    ],
    [
      { start: 1637220600000, end: 1637222400000, booked: false },
      { start: 1637222400000, end: 1637224200000, booked: false },
      { start: 1637224200000, end: 1637226000000, booked: false },
      { start: 1637226000000, end: 1637227800000, booked: false },
      { start: 1637227800000, end: 1637229600000, booked: false },
      { start: 1637229600000, end: 1637231400000, booked: false },
      { start: 1637231400000, end: 1637233200000, booked: false },
      { start: 1637233200000, end: 1637235000000, booked: false },
    ],
  ],
  [
    [
      { start: 1637238600000, end: 1637240400000, booked: false },
      { start: 1637240400000, end: 1637242200000, booked: false },
      { start: 1637242200000, end: 1637244000000, booked: false },
      { start: 1637244000000, end: 1637245800000, booked: false },
      { start: 1637245800000, end: 1637247600000, booked: false },
      { start: 1637247600000, end: 1637249400000, booked: false },
      { start: 1637249400000, end: 1637251200000, booked: false },
      { start: 1637251200000, end: 1637253000000, booked: false },
      { start: 1637253000000, end: 1637254800000, booked: false },
      { start: 1637254800000, end: 1637256600000, booked: false },
    ],
    [
      { start: 1637238600000, end: 1637240400000, booked: false },
      { start: 1637240400000, end: 1637242200000, booked: false },
      { start: 1637242200000, end: 1637244000000, booked: false },
      { start: 1637244000000, end: 1637245800000, booked: false },
      { start: 1637245800000, end: 1637247600000, booked: false },
      { start: 1637247600000, end: 1637249400000, booked: false },
      { start: 1637249400000, end: 1637251200000, booked: false },
      { start: 1637251200000, end: 1637253000000, booked: false },
      { start: 1637253000000, end: 1637254800000, booked: false },
      { start: 1637254800000, end: 1637256600000, booked: false },
    ],
    [
      { start: 1637238600000, end: 1637240400000, booked: false },
      { start: 1637240400000, end: 1637242200000, booked: false },
      { start: 1637242200000, end: 1637244000000, booked: false },
      { start: 1637244000000, end: 1637245800000, booked: false },
      { start: 1637245800000, end: 1637247600000, booked: false },
      { start: 1637247600000, end: 1637249400000, booked: false },
      { start: 1637249400000, end: 1637251200000, booked: false },
      { start: 1637251200000, end: 1637253000000, booked: false },
      { start: 1637253000000, end: 1637254800000, booked: false },
      { start: 1637254800000, end: 1637256600000, booked: false },
    ],
    [
      { start: 1637238600000, end: 1637240400000, booked: false },
      { start: 1637240400000, end: 1637242200000, booked: false },
      { start: 1637242200000, end: 1637244000000, booked: false },
      { start: 1637244000000, end: 1637245800000, booked: false },
      { start: 1637245800000, end: 1637247600000, booked: false },
      { start: 1637247600000, end: 1637249400000, booked: false },
      { start: 1637249400000, end: 1637251200000, booked: false },
      { start: 1637251200000, end: 1637253000000, booked: false },
      { start: 1637253000000, end: 1637254800000, booked: false },
      { start: 1637254800000, end: 1637256600000, booked: false },
    ],
  ],
  [
    [
      { start: 1637307000000, end: 1637308800000, booked: false },
      { start: 1637308800000, end: 1637310600000, booked: false },
      { start: 1637310600000, end: 1637312400000, booked: false },
      { start: 1637312400000, end: 1637314200000, booked: false },
      { start: 1637314200000, end: 1637316000000, booked: false },
      { start: 1637316000000, end: 1637317800000, booked: false },
      { start: 1637317800000, end: 1637319600000, booked: false },
      { start: 1637319600000, end: 1637321400000, booked: false },
    ],
    [
      { start: 1637307000000, end: 1637308800000, booked: false },
      { start: 1637308800000, end: 1637310600000, booked: false },
      { start: 1637310600000, end: 1637312400000, booked: false },
      { start: 1637312400000, end: 1637314200000, booked: false },
      { start: 1637314200000, end: 1637316000000, booked: false },
      { start: 1637316000000, end: 1637317800000, booked: false },
      { start: 1637317800000, end: 1637319600000, booked: false },
      { start: 1637319600000, end: 1637321400000, booked: false },
    ],
    [
      { start: 1637307000000, end: 1637308800000, booked: false },
      { start: 1637308800000, end: 1637310600000, booked: false },
      { start: 1637310600000, end: 1637312400000, booked: false },
      { start: 1637312400000, end: 1637314200000, booked: false },
      { start: 1637314200000, end: 1637316000000, booked: false },
      { start: 1637316000000, end: 1637317800000, booked: false },
      { start: 1637317800000, end: 1637319600000, booked: false },
      { start: 1637319600000, end: 1637321400000, booked: false },
    ],
    [
      { start: 1637307000000, end: 1637308800000, booked: false },
      { start: 1637308800000, end: 1637310600000, booked: false },
      { start: 1637310600000, end: 1637312400000, booked: false },
      { start: 1637312400000, end: 1637314200000, booked: false },
      { start: 1637314200000, end: 1637316000000, booked: false },
      { start: 1637316000000, end: 1637317800000, booked: false },
      { start: 1637317800000, end: 1637319600000, booked: false },
      { start: 1637319600000, end: 1637321400000, booked: false },
    ],
    [
      { start: 1637307000000, end: 1637308800000, booked: false },
      { start: 1637308800000, end: 1637310600000, booked: false },
      { start: 1637310600000, end: 1637312400000, booked: false },
      { start: 1637312400000, end: 1637314200000, booked: false },
      { start: 1637314200000, end: 1637316000000, booked: false },
      { start: 1637316000000, end: 1637317800000, booked: false },
      { start: 1637317800000, end: 1637319600000, booked: false },
      { start: 1637319600000, end: 1637321400000, booked: false },
    ],
  ],
  [
    [
      { start: 1637325000000, end: 1637326800000, booked: false },
      { start: 1637326800000, end: 1637328600000, booked: false },
      { start: 1637328600000, end: 1637330400000, booked: false },
      { start: 1637330400000, end: 1637332200000, booked: false },
      { start: 1637332200000, end: 1637334000000, booked: false },
      { start: 1637334000000, end: 1637335800000, booked: false },
      { start: 1637335800000, end: 1637337600000, booked: false },
      { start: 1637337600000, end: 1637339400000, booked: false },
      { start: 1637339400000, end: 1637341200000, booked: false },
      { start: 1637341200000, end: 1637343000000, booked: false },
    ],
    [
      { start: 1637325000000, end: 1637326800000, booked: false },
      { start: 1637326800000, end: 1637328600000, booked: false },
      { start: 1637328600000, end: 1637330400000, booked: false },
      { start: 1637330400000, end: 1637332200000, booked: false },
      { start: 1637332200000, end: 1637334000000, booked: false },
      { start: 1637334000000, end: 1637335800000, booked: false },
      { start: 1637335800000, end: 1637337600000, booked: false },
      { start: 1637337600000, end: 1637339400000, booked: false },
      { start: 1637339400000, end: 1637341200000, booked: false },
      { start: 1637341200000, end: 1637343000000, booked: false },
    ],
    [
      { start: 1637325000000, end: 1637326800000, booked: false },
      { start: 1637326800000, end: 1637328600000, booked: false },
      { start: 1637328600000, end: 1637330400000, booked: false },
      { start: 1637330400000, end: 1637332200000, booked: false },
      { start: 1637332200000, end: 1637334000000, booked: false },
      { start: 1637334000000, end: 1637335800000, booked: false },
      { start: 1637335800000, end: 1637337600000, booked: false },
      { start: 1637337600000, end: 1637339400000, booked: false },
      { start: 1637339400000, end: 1637341200000, booked: false },
      { start: 1637341200000, end: 1637343000000, booked: false },
    ],
    [
      { start: 1637325000000, end: 1637326800000, booked: false },
      { start: 1637326800000, end: 1637328600000, booked: false },
      { start: 1637328600000, end: 1637330400000, booked: false },
      { start: 1637330400000, end: 1637332200000, booked: false },
      { start: 1637332200000, end: 1637334000000, booked: false },
      { start: 1637334000000, end: 1637335800000, booked: false },
      { start: 1637335800000, end: 1637337600000, booked: false },
      { start: 1637337600000, end: 1637339400000, booked: false },
      { start: 1637339400000, end: 1637341200000, booked: false },
      { start: 1637341200000, end: 1637343000000, booked: false },
    ],
    [
      { start: 1637325000000, end: 1637326800000, booked: false },
      { start: 1637326800000, end: 1637328600000, booked: false },
      { start: 1637328600000, end: 1637330400000, booked: false },
      { start: 1637330400000, end: 1637332200000, booked: false },
      { start: 1637332200000, end: 1637334000000, booked: false },
      { start: 1637334000000, end: 1637335800000, booked: false },
      { start: 1637335800000, end: 1637337600000, booked: false },
      { start: 1637337600000, end: 1637339400000, booked: false },
      { start: 1637339400000, end: 1637341200000, booked: false },
      { start: 1637341200000, end: 1637343000000, booked: false },
    ],
  ],
];

const getAmoNb = (s) => {
  let max = 0;
  s.map((shift) => {
    if (shift.length >= max) {
      // console.log("tes");
      max = shift.length;
    }
  });
  return max;
};

const printGrid = (_shifts) => {
  console.log(
    `\n\n################################################### G.R.I.D ###################################################`
  );
  for (let shift = 0; shift < _shifts.length; shift++) {
    console.log(
      `\n----------\nShift ${shift} (Amo(s): ${_shifts[shift].length})\n`
    );
    for (let amo = 0; amo < _shifts[shift].length; amo++) {
      console.log(`\nAMO no ${amo}\n`);
      for (let slot = 0; slot < _shifts[shift][amo].length; slot++) {
        console.log(
          `[${shift}][${amo}][${slot}]  ***********  ${moment
            .utc(_shifts[shift][amo][slot].start)
            .format("DD/MM HH:mm")}  -  ${moment
            .utc(_shifts[shift][amo][slot].end)
            .format("DD/MM HH:mm")}    :    ${
            _shifts[shift][amo][slot].booked
          }     ${_shifts[shift][amo][slot].amo}`
        );
      }
    }
  }
  console.log(
    `\n\n###############################################################################################################\n\n`
  );
};

let nbOfAmos = getAmoNb(grid);
console.log(`nbOfAmos in the grid : ${nbOfAmos}`);

const amoNames = ["JB", "PD", "KM", "JY", "AF", "SS"];

// Transforme la grille pour assigner des AMOs et flatten
for (let shift = 0; shift < grid.length; shift++) {
  for (let amo = 0; amo < grid[shift].length; amo++) {
    for (let slot = 0; slot < grid[shift][amo].length; slot++) {
      grid[shift][amo][slot].amo = amoNames[amo];
    }
  }
}

printGrid(grid);
