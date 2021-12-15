const { getHourLength, getMeetingTimeDay } = require("./funcs");
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

const isAmoBookedSameTime = (rdvs, pos) => {
  for (let i = 0; i < rdvs.length; i++) {
    // Exclude cases where compare with itself and same amo
    if (i === pos || rdvs[i].getAmo().getId() !== rdvs[pos].getAmo().getId()) {
      continue;
    } else {
      // Starts by verifying same day
      if (
        getMeetingTimeDay(rdv[i].getMeetingTime()) ===
        getMeetingTimeDay(rdv[pos].getMeetingTime())
      ) {
        // Then verify whether hours are crossing
        if (
          areHoursCrossing(rdv[i].getMeetingTime(), rdv[pos].getMeetingTime())
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

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

let data = new Data();

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

let generationNb = 0;
console.log(`\n> Generation # ${generationNb}`);
let population = new Population(POPULATION_SIZE);

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

let dsp = new DisplayManager();
// dsp.printMeetingTimes();
dsp.printGeneration(population);

// Genetic algorithm
let geneticAlgorithm = new GeneticAlgorithm();
while (population.getSchedules()[0].getFitness() !== 1) {
  generationNb += 1;
  console.log(`\n> Generation # ${generationNb}`);
  population = geneticAlgorithm.evolve(population);
  dsp.printGeneration(population);
}
console.log(`\n\n`);
