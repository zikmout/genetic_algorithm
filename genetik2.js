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
POPULATION_SIZE = 9;
NUMB_OF_ELITE_SCHEDULES = 1;
TOURNAMENT_SELECTION_SIZE = 3;
MUTATION_RATE = 0.1; // Mutation should not happen ofter because creates noise

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
const amos = ["JB", "PD", "KM", "JY", "AF", "SS"];
const people = [
  5, 3, 5, 3, 5, 2, 2, 3, 5, 5, 4, 2, 2, 4, 4, 2, 3, 5, 3, 4, 2, 5, 4, 8, 5, 4,
  5, 4, 5, 4, 4, 5, 3, 2, 5, 8, 4, 5, 4, 3, 5, 2, 5, 5, 4, 5, 5, 5, 4, 8, 4, 5,
  4, 5, 4, 5, 2, 3, 2, 5, 5, 5, 3, 5, 4, 4, 5, 4, 5, 4, 2, 8, 4, 5, 2, 8, 4, 8,
  5, 5, 5, 3, 5, 2, 2, 5, 8, 5, 3, 5, 5, 8, 8, 4, 5, 5, 3, 2, 2, 2, 4, 5, 5, 4,
  5, 4, 2, 3, 4, 5, 4, 4, 8, 5, 4, 8, 5, 2, 4, 4, 4, 2, 8, 2, 5, 3, 4, 4, 5,
];

// Algorithm Classes

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
    let s = shift;
    let a = amo;
    let sl = slot;
    let l = 0;

    for (l; l < rdvLength; l++) {
      // console.log(`sl = ${sl}`);
      if (!grid[s][a][sl + l]) {
        return false;
      }
    }

    return true;
  };

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
    let nbOfConflicts = 0;
    let cp = [...originPeople];
    // console.log(JSON.stringify(cp));
    people.forEach((p) => {
      if (cp.includes(p)) {
        let pplIdx = cp.indexOf(p);
        cp.splice(pplIdx, 1);
      } else {
        nbOfConflicts += 1;
      }
    });
    return nbOfConflicts;
  }

  getFitness() {
    if (this.isFitnessChanged) {
      this.fitness = this.calculateFitness();
      this.isFitnessChanged = false;
    }
    return this.fitness;
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
        for (
          let sl = 0;
          sl < mutateSchedule.data.getGrid()[s][a].length;
          sl++
        ) {
          if (MUTATION_RATE > Math.random()) {
            // mutateSchedule.data.getGrid()[s][a][sl] =
            //   schedule.data.getGrid()[s][a][sl];
            // mutateSchedule.getRdvs()[i] = schedule.getRdvs()[i];
          }
        }
      }
    }

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
  printSchedulesFitness(population.getSchedules());
}

// console.log(JSON.stringify(population.getSchedules()[0].data.getGrid()));
// let gridTest = [
//   [
//     [
//       { start: 1635751800000, end: 1635753600000, booked: "axxra", amo: "JB" },
//       { start: 1635753600000, end: 1635755400000, booked: "axxra", amo: "JB" },
//       { start: 1635755400000, end: 1635757200000, booked: "axxra", amo: "JB" },
//       { start: 1635757200000, end: 1635759000000, booked: "axxra", amo: "JB" },
//       { start: 1635759000000, end: 1635760800000, booked: "axxra", amo: "JB" },
//       { start: 1635760800000, end: 1635762600000, booked: "axxra", amo: "JB" },
//       { start: 1635762600000, end: 1635764400000, booked: "axxra", amo: "JB" },
//       { start: 1635764400000, end: 1635766200000, booked: "axxra", amo: "JB" },
//     ],
//     [
//       { start: 1635751800000, end: 1635753600000, booked: false, amo: "PD" },
//       { start: 1635753600000, end: 1635755400000, booked: false, amo: "PD" },
//       { start: 1635755400000, end: 1635757200000, booked: false, amo: "PD" },
//       { start: 1635757200000, end: 1635759000000, booked: "egdzy", amo: "PD" },
//       { start: 1635759000000, end: 1635760800000, booked: "egdzy", amo: "PD" },
//       { start: 1635760800000, end: 1635762600000, booked: "egdzy", amo: "PD" },
//       { start: 1635762600000, end: 1635764400000, booked: "egdzy", amo: "PD" },
//       { start: 1635764400000, end: 1635766200000, booked: "egdzy", amo: "PD" },
//     ],
//     [
//       { start: 1635751800000, end: 1635753600000, booked: false, amo: "KM" },
//       { start: 1635753600000, end: 1635755400000, booked: false, amo: "KM" },
//       { start: 1635755400000, end: 1635757200000, booked: false, amo: "KM" },
//       { start: 1635757200000, end: 1635759000000, booked: false, amo: "KM" },
//       { start: 1635759000000, end: 1635760800000, booked: false, amo: "KM" },
//       { start: 1635760800000, end: 1635762600000, booked: false, amo: "KM" },
//       { start: 1635762600000, end: 1635764400000, booked: false, amo: "KM" },
//       { start: 1635764400000, end: 1635766200000, booked: false, amo: "KM" },
//     ],
//   ],
//   [
//     [
//       { start: 1635769800000, end: 1635771600000, booked: "mnbt", amo: "JB" },
//       { start: 1635771600000, end: 1635773400000, booked: "mnbt", amo: "JB" },
//       { start: 1635773400000, end: 1635775200000, booked: "cmccs", amo: "JB" },
//       { start: 1635775200000, end: 1635777000000, booked: "cmccs", amo: "JB" },
//       { start: 1635777000000, end: 1635778800000, booked: "dvjm", amo: "JB" },
//       { start: 1635778800000, end: 1635780600000, booked: "dvjm", amo: "JB" },
//       { start: 1635780600000, end: 1635782400000, booked: "dvjm", amo: "JB" },
//       { start: 1635782400000, end: 1635784200000, booked: "dvjm", amo: "JB" },
//       { start: 1635784200000, end: 1635786000000, booked: "dvjm", amo: "JB" },
//       { start: 1635786000000, end: 1635787800000, booked: false, amo: "JB" },
//     ],
//     [
//       { start: 1635769800000, end: 1635771600000, booked: "wfuoo", amo: "PD" },
//       { start: 1635771600000, end: 1635773400000, booked: "wfuoo", amo: "PD" },
//       { start: 1635773400000, end: 1635775200000, booked: "wfuoo", amo: "PD" },
//       { start: 1635775200000, end: 1635777000000, booked: "woiem", amo: "PD" },
//       { start: 1635777000000, end: 1635778800000, booked: "lgldg", amo: "PD" },
//       { start: 1635778800000, end: 1635780600000, booked: "lgldg", amo: "PD" },
//       { start: 1635780600000, end: 1635782400000, booked: "woiem", amo: "PD" },
//       { start: 1635782400000, end: 1635784200000, booked: "woiem", amo: "PD" },
//       { start: 1635784200000, end: 1635786000000, booked: false, amo: "PD" },
//       { start: 1635786000000, end: 1635787800000, booked: false, amo: "PD" },
//     ],
//     [
//       { start: 1635769800000, end: 1635771600000, booked: false, amo: "KM" },
//       { start: 1635771600000, end: 1635773400000, booked: "ykbbv", amo: "KM" },
//       { start: 1635773400000, end: 1635775200000, booked: "ykbbv", amo: "KM" },
//       { start: 1635775200000, end: 1635777000000, booked: "ykbbv", amo: "KM" },
//       { start: 1635777000000, end: 1635778800000, booked: "ykbbv", amo: "KM" },
//       { start: 1635778800000, end: 1635780600000, booked: "cwsrs", amo: "KM" },
//       { start: 1635780600000, end: 1635782400000, booked: "cwsrs", amo: "KM" },
//       { start: 1635782400000, end: 1635784200000, booked: "cwsrs", amo: "KM" },
//       { start: 1635784200000, end: 1635786000000, booked: "cwsrs", amo: "KM" },
//       { start: 1635786000000, end: 1635787800000, booked: false, amo: "KM" },
//     ],
//   ],
//   [
//     [
//       { start: 1635838200000, end: 1635840000000, booked: false, amo: "JB" },
//       { start: 1635840000000, end: 1635841800000, booked: "yrvxp", amo: "JB" },
//       { start: 1635841800000, end: 1635843600000, booked: "yrvxp", amo: "JB" },
//       { start: 1635843600000, end: 1635845400000, booked: "yrvxp", amo: "JB" },
//       { start: 1635845400000, end: 1635847200000, booked: "yrvxp", amo: "JB" },
//       { start: 1635847200000, end: 1635849000000, booked: "yrvxp", amo: "JB" },
//       { start: 1635849000000, end: 1635850800000, booked: false, amo: "JB" },
//       { start: 1635850800000, end: 1635852600000, booked: false, amo: "JB" },
//     ],
//     [
//       { start: 1635838200000, end: 1635840000000, booked: "gfvfu", amo: "PD" },
//       { start: 1635840000000, end: 1635841800000, booked: "gfvfu", amo: "PD" },
//       { start: 1635841800000, end: 1635843600000, booked: "gfvfu", amo: "PD" },
//       { start: 1635843600000, end: 1635845400000, booked: "gfvfu", amo: "PD" },
//       { start: 1635845400000, end: 1635847200000, booked: "lmesw", amo: "PD" },
//       { start: 1635847200000, end: 1635849000000, booked: "lmesw", amo: "PD" },
//       { start: 1635849000000, end: 1635850800000, booked: "lmesw", amo: "PD" },
//       { start: 1635850800000, end: 1635852600000, booked: "lmesw", amo: "PD" },
//     ],
//     [
//       { start: 1635838200000, end: 1635840000000, booked: "evyxz", amo: "KM" },
//       { start: 1635840000000, end: 1635841800000, booked: "evyxz", amo: "KM" },
//       { start: 1635841800000, end: 1635843600000, booked: "evyxz", amo: "KM" },
//       { start: 1635843600000, end: 1635845400000, booked: "evyxz", amo: "KM" },
//       { start: 1635845400000, end: 1635847200000, booked: "evyxz", amo: "KM" },
//       { start: 1635847200000, end: 1635849000000, booked: "evyxz", amo: "KM" },
//       { start: 1635849000000, end: 1635850800000, booked: "evyxz", amo: "KM" },
//       { start: 1635850800000, end: 1635852600000, booked: "evyxz", amo: "KM" },
//     ],
//   ],
//   [
//     [
//       { start: 1635856200000, end: 1635858000000, booked: false, amo: "JB" },
//       { start: 1635858000000, end: 1635859800000, booked: "hpudy", amo: "JB" },
//       { start: 1635859800000, end: 1635861600000, booked: "hpudy", amo: "JB" },
//       { start: 1635861600000, end: 1635863400000, booked: "hpudy", amo: "JB" },
//       { start: 1635863400000, end: 1635865200000, booked: "hpudy", amo: "JB" },
//       { start: 1635865200000, end: 1635867000000, booked: "hpudy", amo: "JB" },
//       { start: 1635867000000, end: 1635868800000, booked: false, amo: "JB" },
//       { start: 1635868800000, end: 1635870600000, booked: false, amo: "JB" },
//       { start: 1635870600000, end: 1635872400000, booked: false, amo: "JB" },
//       { start: 1635872400000, end: 1635874200000, booked: false, amo: "JB" },
//     ],
//     [
//       { start: 1635856200000, end: 1635858000000, booked: false, amo: "PD" },
//       { start: 1635858000000, end: 1635859800000, booked: "iksit", amo: "PD" },
//       { start: 1635859800000, end: 1635861600000, booked: "iksit", amo: "PD" },
//       { start: 1635861600000, end: 1635863400000, booked: false, amo: "PD" },
//       { start: 1635863400000, end: 1635865200000, booked: false, amo: "PD" },
//       { start: 1635865200000, end: 1635867000000, booked: false, amo: "PD" },
//       { start: 1635867000000, end: 1635868800000, booked: false, amo: "PD" },
//       { start: 1635868800000, end: 1635870600000, booked: false, amo: "PD" },
//       { start: 1635870600000, end: 1635872400000, booked: false, amo: "PD" },
//       { start: 1635872400000, end: 1635874200000, booked: false, amo: "PD" },
//     ],
//     [
//       { start: 1635856200000, end: 1635858000000, booked: "uetzy", amo: "KM" },
//       { start: 1635858000000, end: 1635859800000, booked: "ruzhu", amo: "KM" },
//       { start: 1635859800000, end: 1635861600000, booked: "ruzhu", amo: "KM" },
//       { start: 1635861600000, end: 1635863400000, booked: "uetzy", amo: "KM" },
//       { start: 1635863400000, end: 1635865200000, booked: "uetzy", amo: "KM" },
//       { start: 1635865200000, end: 1635867000000, booked: "rptbj", amo: "KM" },
//       { start: 1635867000000, end: 1635868800000, booked: "rptbj", amo: "KM" },
//       { start: 1635868800000, end: 1635870600000, booked: "rptbj", amo: "KM" },
//       { start: 1635870600000, end: 1635872400000, booked: "rptbj", amo: "KM" },
//       { start: 1635872400000, end: 1635874200000, booked: false, amo: "KM" },
//     ],
//   ],
//   [
//     [
//       { start: 1635924600000, end: 1635926400000, booked: "kwdyk", amo: "JB" },
//       { start: 1635926400000, end: 1635928200000, booked: "wygkk", amo: "JB" },
//       { start: 1635928200000, end: 1635930000000, booked: "wygkk", amo: "JB" },
//       { start: 1635930000000, end: 1635931800000, booked: "wygkk", amo: "JB" },
//       { start: 1635931800000, end: 1635933600000, booked: "wygkk", amo: "JB" },
//       { start: 1635933600000, end: 1635935400000, booked: "wygkk", amo: "JB" },
//       { start: 1635935400000, end: 1635937200000, booked: false, amo: "JB" },
//       { start: 1635937200000, end: 1635939000000, booked: false, amo: "JB" },
//     ],
//   ],
//   [
//     [
//       { start: 1635942600000, end: 1635944400000, booked: "nidct", amo: "JB" },
//       { start: 1635944400000, end: 1635946200000, booked: "nidct", amo: "JB" },
//       { start: 1635946200000, end: 1635948000000, booked: "uvnjb", amo: "JB" },
//       { start: 1635948000000, end: 1635949800000, booked: "uvnjb", amo: "JB" },
//       { start: 1635949800000, end: 1635951600000, booked: "uvnjb", amo: "JB" },
//       { start: 1635951600000, end: 1635953400000, booked: "rcvgi", amo: "JB" },
//       { start: 1635953400000, end: 1635955200000, booked: "rcvgi", amo: "JB" },
//       { start: 1635955200000, end: 1635957000000, booked: "rcvgi", amo: "JB" },
//       { start: 1635957000000, end: 1635958800000, booked: "rcvgi", amo: "JB" },
//       { start: 1635958800000, end: 1635960600000, booked: "rcvgi", amo: "JB" },
//     ],
//   ],
//   [
//     [
//       { start: 1636011000000, end: 1636012800000, booked: false, amo: "JB" },
//       { start: 1636012800000, end: 1636014600000, booked: false, amo: "JB" },
//       { start: 1636014600000, end: 1636016400000, booked: "ogwkq", amo: "JB" },
//       { start: 1636016400000, end: 1636018200000, booked: "ogwkq", amo: "JB" },
//       { start: 1636018200000, end: 1636020000000, booked: "ogwkq", amo: "JB" },
//       { start: 1636020000000, end: 1636021800000, booked: "ogwkq", amo: "JB" },
//       { start: 1636021800000, end: 1636023600000, booked: false, amo: "JB" },
//       { start: 1636023600000, end: 1636025400000, booked: false, amo: "JB" },
//     ],
//     [
//       { start: 1636011000000, end: 1636012800000, booked: false, amo: "PD" },
//       { start: 1636012800000, end: 1636014600000, booked: "uggmo", amo: "PD" },
//       { start: 1636014600000, end: 1636016400000, booked: "uggmo", amo: "PD" },
//       { start: 1636016400000, end: 1636018200000, booked: "uggmo", amo: "PD" },
//       { start: 1636018200000, end: 1636020000000, booked: "uggmo", amo: "PD" },
//       { start: 1636020000000, end: 1636021800000, booked: "uggmo", amo: "PD" },
//       { start: 1636021800000, end: 1636023600000, booked: "vavwl", amo: "PD" },
//       { start: 1636023600000, end: 1636025400000, booked: false, amo: "PD" },
//     ],
//   ],
//   [
//     [
//       { start: 1636029000000, end: 1636030800000, booked: false, amo: "JB" },
//       { start: 1636030800000, end: 1636032600000, booked: "tfveb", amo: "JB" },
//       { start: 1636032600000, end: 1636034400000, booked: "tfveb", amo: "JB" },
//       { start: 1636034400000, end: 1636036200000, booked: "jkesn", amo: "JB" },
//       { start: 1636036200000, end: 1636038000000, booked: "jkesn", amo: "JB" },
//       { start: 1636038000000, end: 1636039800000, booked: "jkesn", amo: "JB" },
//       { start: 1636039800000, end: 1636041600000, booked: "jkesn", amo: "JB" },
//       { start: 1636041600000, end: 1636043400000, booked: "jkesn", amo: "JB" },
//       { start: 1636043400000, end: 1636045200000, booked: "tfveb", amo: "JB" },
//       { start: 1636045200000, end: 1636047000000, booked: false, amo: "JB" },
//     ],
//     [
//       { start: 1636029000000, end: 1636030800000, booked: false, amo: "PD" },
//       { start: 1636030800000, end: 1636032600000, booked: "ksejc", amo: "PD" },
//       { start: 1636032600000, end: 1636034400000, booked: "ksejc", amo: "PD" },
//       { start: 1636034400000, end: 1636036200000, booked: "ksejc", amo: "PD" },
//       { start: 1636036200000, end: 1636038000000, booked: "ksejc", amo: "PD" },
//       { start: 1636038000000, end: 1636039800000, booked: "oerue", amo: "PD" },
//       { start: 1636039800000, end: 1636041600000, booked: "oerue", amo: "PD" },
//       { start: 1636041600000, end: 1636043400000, booked: "ksejc", amo: "PD" },
//       { start: 1636043400000, end: 1636045200000, booked: "ksejc", amo: "PD" },
//       { start: 1636045200000, end: 1636047000000, booked: false, amo: "PD" },
//     ],
//   ],
//   [
//     [
//       { start: 1636097400000, end: 1636099200000, booked: false, amo: "JB" },
//       { start: 1636099200000, end: 1636101000000, booked: false, amo: "JB" },
//       { start: 1636101000000, end: 1636102800000, booked: false, amo: "JB" },
//       { start: 1636102800000, end: 1636104600000, booked: false, amo: "JB" },
//       { start: 1636104600000, end: 1636106400000, booked: false, amo: "JB" },
//       { start: 1636106400000, end: 1636108200000, booked: false, amo: "JB" },
//       { start: 1636108200000, end: 1636110000000, booked: false, amo: "JB" },
//       { start: 1636110000000, end: 1636111800000, booked: false, amo: "JB" },
//     ],
//     [
//       { start: 1636097400000, end: 1636099200000, booked: "iyjjp", amo: "PD" },
//       { start: 1636099200000, end: 1636101000000, booked: "iyjjp", amo: "PD" },
//       { start: 1636101000000, end: 1636102800000, booked: false, amo: "PD" },
//       { start: 1636102800000, end: 1636104600000, booked: "qmotn", amo: "PD" },
//       { start: 1636104600000, end: 1636106400000, booked: "qmotn", amo: "PD" },
//       { start: 1636106400000, end: 1636108200000, booked: "qmotn", amo: "PD" },
//       { start: 1636108200000, end: 1636110000000, booked: "qmotn", amo: "PD" },
//       { start: 1636110000000, end: 1636111800000, booked: "qmotn", amo: "PD" },
//     ],
//   ],
//   [
//     [
//       { start: 1636115400000, end: 1636117200000, booked: false, amo: "JB" },
//       { start: 1636117200000, end: 1636119000000, booked: "ymoau", amo: "JB" },
//       { start: 1636119000000, end: 1636120800000, booked: "zxnds", amo: "JB" },
//       { start: 1636120800000, end: 1636122600000, booked: "zxnds", amo: "JB" },
//       { start: 1636122600000, end: 1636124400000, booked: "zxnds", amo: "JB" },
//       { start: 1636124400000, end: 1636126200000, booked: "iylvl", amo: "JB" },
//       { start: 1636126200000, end: 1636128000000, booked: "iylvl", amo: "JB" },
//       { start: 1636128000000, end: 1636129800000, booked: "zxnds", amo: "JB" },
//       { start: 1636129800000, end: 1636131600000, booked: "zxnds", amo: "JB" },
//       { start: 1636131600000, end: 1636133400000, booked: "zxnds", amo: "JB" },
//     ],
//     [
//       { start: 1636115400000, end: 1636117200000, booked: false, amo: "PD" },
//       { start: 1636117200000, end: 1636119000000, booked: false, amo: "PD" },
//       { start: 1636119000000, end: 1636120800000, booked: false, amo: "PD" },
//       { start: 1636120800000, end: 1636122600000, booked: false, amo: "PD" },
//       { start: 1636122600000, end: 1636124400000, booked: false, amo: "PD" },
//       { start: 1636124400000, end: 1636126200000, booked: "hzqhy", amo: "PD" },
//       { start: 1636126200000, end: 1636128000000, booked: "hzqhy", amo: "PD" },
//       { start: 1636128000000, end: 1636129800000, booked: "hzqhy", amo: "PD" },
//       { start: 1636129800000, end: 1636131600000, booked: "hzqhy", amo: "PD" },
//       { start: 1636131600000, end: 1636133400000, booked: "hzqhy", amo: "PD" },
//     ],
//   ],
//   [
//     [
//       { start: 1636356600000, end: 1636358400000, booked: "lloah", amo: "JB" },
//       { start: 1636358400000, end: 1636360200000, booked: "lloah", amo: "JB" },
//       { start: 1636360200000, end: 1636362000000, booked: "lloah", amo: "JB" },
//       { start: 1636362000000, end: 1636363800000, booked: "lloah", amo: "JB" },
//       { start: 1636363800000, end: 1636365600000, booked: "lloah", amo: "JB" },
//       { start: 1636365600000, end: 1636367400000, booked: false, amo: "JB" },
//       { start: 1636367400000, end: 1636369200000, booked: false, amo: "JB" },
//       { start: 1636369200000, end: 1636371000000, booked: false, amo: "JB" },
//     ],
//     [
//       { start: 1636356600000, end: 1636358400000, booked: "foakj", amo: "PD" },
//       { start: 1636358400000, end: 1636360200000, booked: "foakj", amo: "PD" },
//       { start: 1636360200000, end: 1636362000000, booked: "foakj", amo: "PD" },
//       { start: 1636362000000, end: 1636363800000, booked: "foakj", amo: "PD" },
//       { start: 1636363800000, end: 1636365600000, booked: false, amo: "PD" },
//       { start: 1636365600000, end: 1636367400000, booked: false, amo: "PD" },
//       { start: 1636367400000, end: 1636369200000, booked: false, amo: "PD" },
//       { start: 1636369200000, end: 1636371000000, booked: false, amo: "PD" },
//     ],
//     [
//       { start: 1636356600000, end: 1636358400000, booked: false, amo: "KM" },
//       { start: 1636358400000, end: 1636360200000, booked: false, amo: "KM" },
//       { start: 1636360200000, end: 1636362000000, booked: "sofwn", amo: "KM" },
//       { start: 1636362000000, end: 1636363800000, booked: "sofwn", amo: "KM" },
//       { start: 1636363800000, end: 1636365600000, booked: "sofwn", amo: "KM" },
//       { start: 1636365600000, end: 1636367400000, booked: "sofwn", amo: "KM" },
//       { start: 1636367400000, end: 1636369200000, booked: "sofwn", amo: "KM" },
//       { start: 1636369200000, end: 1636371000000, booked: false, amo: "KM" },
//     ],
//     [
//       { start: 1636356600000, end: 1636358400000, booked: false, amo: "JY" },
//       { start: 1636358400000, end: 1636360200000, booked: "jxvgf", amo: "JY" },
//       { start: 1636360200000, end: 1636362000000, booked: "jxvgf", amo: "JY" },
//       { start: 1636362000000, end: 1636363800000, booked: "jxvgf", amo: "JY" },
//       { start: 1636363800000, end: 1636365600000, booked: false, amo: "JY" },
//       { start: 1636365600000, end: 1636367400000, booked: false, amo: "JY" },
//       { start: 1636367400000, end: 1636369200000, booked: false, amo: "JY" },
//       { start: 1636369200000, end: 1636371000000, booked: false, amo: "JY" },
//     ],
//   ],
//   [
//     [
//       { start: 1636374600000, end: 1636376400000, booked: false, amo: "JB" },
//       { start: 1636376400000, end: 1636378200000, booked: false, amo: "JB" },
//       { start: 1636378200000, end: 1636380000000, booked: false, amo: "JB" },
//       { start: 1636380000000, end: 1636381800000, booked: false, amo: "JB" },
//       { start: 1636381800000, end: 1636383600000, booked: false, amo: "JB" },
//       { start: 1636383600000, end: 1636385400000, booked: "wasbp", amo: "JB" },
//       { start: 1636385400000, end: 1636387200000, booked: "wasbp", amo: "JB" },
//       { start: 1636387200000, end: 1636389000000, booked: "wasbp", amo: "JB" },
//       { start: 1636389000000, end: 1636390800000, booked: "wasbp", amo: "JB" },
//       { start: 1636390800000, end: 1636392600000, booked: "wasbp", amo: "JB" },
//     ],
//     [
//       { start: 1636374600000, end: 1636376400000, booked: "natve", amo: "PD" },
//       { start: 1636376400000, end: 1636378200000, booked: "natve", amo: "PD" },
//       { start: 1636378200000, end: 1636380000000, booked: "natve", amo: "PD" },
//       { start: 1636380000000, end: 1636381800000, booked: "natve", amo: "PD" },
//       { start: 1636381800000, end: 1636383600000, booked: "natve", amo: "PD" },
//       { start: 1636383600000, end: 1636385400000, booked: "natve", amo: "PD" },
//       { start: 1636385400000, end: 1636387200000, booked: "natve", amo: "PD" },
//       { start: 1636387200000, end: 1636389000000, booked: "natve", amo: "PD" },
//       { start: 1636389000000, end: 1636390800000, booked: false, amo: "PD" },
//       { start: 1636390800000, end: 1636392600000, booked: false, amo: "PD" },
//     ],
//     [
//       { start: 1636374600000, end: 1636376400000, booked: false, amo: "KM" },
//       { start: 1636376400000, end: 1636378200000, booked: "mcosl", amo: "KM" },
//       { start: 1636378200000, end: 1636380000000, booked: "mcosl", amo: "KM" },
//       { start: 1636380000000, end: 1636381800000, booked: "mcosl", amo: "KM" },
//       { start: 1636381800000, end: 1636383600000, booked: "zceoq", amo: "KM" },
//       { start: 1636383600000, end: 1636385400000, booked: "zceoq", amo: "KM" },
//       { start: 1636385400000, end: 1636387200000, booked: false, amo: "KM" },
//       { start: 1636387200000, end: 1636389000000, booked: "kdqae", amo: "KM" },
//       { start: 1636389000000, end: 1636390800000, booked: "kdqae", amo: "KM" },
//       { start: 1636390800000, end: 1636392600000, booked: false, amo: "KM" },
//     ],
//     [
//       { start: 1636374600000, end: 1636376400000, booked: "wigyb", amo: "JY" },
//       { start: 1636376400000, end: 1636378200000, booked: "wigyb", amo: "JY" },
//       { start: 1636378200000, end: 1636380000000, booked: "wigyb", amo: "JY" },
//       { start: 1636380000000, end: 1636381800000, booked: "wigyb", amo: "JY" },
//       { start: 1636381800000, end: 1636383600000, booked: "dkjuj", amo: "JY" },
//       { start: 1636383600000, end: 1636385400000, booked: "dkjuj", amo: "JY" },
//       { start: 1636385400000, end: 1636387200000, booked: false, amo: "JY" },
//       { start: 1636387200000, end: 1636389000000, booked: false, amo: "JY" },
//       { start: 1636389000000, end: 1636390800000, booked: false, amo: "JY" },
//       { start: 1636390800000, end: 1636392600000, booked: false, amo: "JY" },
//     ],
//   ],
//   [
//     [
//       { start: 1636443000000, end: 1636444800000, booked: "eofkj", amo: "JB" },
//       { start: 1636444800000, end: 1636446600000, booked: "eofkj", amo: "JB" },
//       { start: 1636446600000, end: 1636448400000, booked: "rtfoz", amo: "JB" },
//       { start: 1636448400000, end: 1636450200000, booked: "rtfoz", amo: "JB" },
//       { start: 1636450200000, end: 1636452000000, booked: "rtfoz", amo: "JB" },
//       { start: 1636452000000, end: 1636453800000, booked: "rtfoz", amo: "JB" },
//       { start: 1636453800000, end: 1636455600000, booked: "hdxzj", amo: "JB" },
//       { start: 1636455600000, end: 1636457400000, booked: "hdxzj", amo: "JB" },
//     ],
//   ],
//   [
//     [
//       { start: 1636461000000, end: 1636462800000, booked: "uhloq", amo: "JB" },
//       { start: 1636462800000, end: 1636464600000, booked: "uhloq", amo: "JB" },
//       { start: 1636464600000, end: 1636466400000, booked: "uhloq", amo: "JB" },
//       { start: 1636466400000, end: 1636468200000, booked: "nqghs", amo: "JB" },
//       { start: 1636468200000, end: 1636470000000, booked: "nqghs", amo: "JB" },
//       { start: 1636470000000, end: 1636471800000, booked: "nqghs", amo: "JB" },
//       { start: 1636471800000, end: 1636473600000, booked: "nqghs", amo: "JB" },
//       { start: 1636473600000, end: 1636475400000, booked: "nqghs", amo: "JB" },
//       { start: 1636475400000, end: 1636477200000, booked: "iyymg", amo: "JB" },
//       { start: 1636477200000, end: 1636479000000, booked: "iyymg", amo: "JB" },
//     ],
//   ],
//   [
//     [
//       { start: 1636529400000, end: 1636531200000, booked: false, amo: "JB" },
//       { start: 1636531200000, end: 1636533000000, booked: "wsvzz", amo: "JB" },
//       { start: 1636533000000, end: 1636534800000, booked: "wsvzz", amo: "JB" },
//       { start: 1636534800000, end: 1636536600000, booked: "veynz", amo: "JB" },
//       { start: 1636536600000, end: 1636538400000, booked: "veynz", amo: "JB" },
//       { start: 1636538400000, end: 1636540200000, booked: "veynz", amo: "JB" },
//       { start: 1636540200000, end: 1636542000000, booked: "veynz", amo: "JB" },
//       { start: 1636542000000, end: 1636543800000, booked: "fgexm", amo: "JB" },
//     ],
//   ],
//   [
//     [
//       { start: 1636547400000, end: 1636549200000, booked: "ovtkv", amo: "JB" },
//       { start: 1636549200000, end: 1636551000000, booked: "ovtkv", amo: "JB" },
//       { start: 1636551000000, end: 1636552800000, booked: "ovtkv", amo: "JB" },
//       { start: 1636552800000, end: 1636554600000, booked: "ovtkv", amo: "JB" },
//       { start: 1636554600000, end: 1636556400000, booked: "ovtkv", amo: "JB" },
//       { start: 1636556400000, end: 1636558200000, booked: "tirsq", amo: "JB" },
//       { start: 1636558200000, end: 1636560000000, booked: "tirsq", amo: "JB" },
//       { start: 1636560000000, end: 1636561800000, booked: "tirsq", amo: "JB" },
//       { start: 1636561800000, end: 1636563600000, booked: "tirsq", amo: "JB" },
//       { start: 1636563600000, end: 1636565400000, booked: "tirsq", amo: "JB" },
//     ],
//   ],
//   [
//     [
//       { start: 1636615800000, end: 1636617600000, booked: false, amo: "JB" },
//       { start: 1636617600000, end: 1636619400000, booked: false, amo: "JB" },
//       { start: 1636619400000, end: 1636621200000, booked: false, amo: "JB" },
//       { start: 1636621200000, end: 1636623000000, booked: "junnw", amo: "JB" },
//       { start: 1636623000000, end: 1636624800000, booked: "junnw", amo: "JB" },
//       { start: 1636624800000, end: 1636626600000, booked: "junnw", amo: "JB" },
//       { start: 1636626600000, end: 1636628400000, booked: "junnw", amo: "JB" },
//       { start: 1636628400000, end: 1636630200000, booked: "junnw", amo: "JB" },
//     ],
//     [
//       { start: 1636615800000, end: 1636617600000, booked: "iqcfz", amo: "PD" },
//       { start: 1636617600000, end: 1636619400000, booked: "iqcfz", amo: "PD" },
//       { start: 1636619400000, end: 1636621200000, booked: "iqcfz", amo: "PD" },
//       { start: 1636621200000, end: 1636623000000, booked: "iqcfz", amo: "PD" },
//       { start: 1636623000000, end: 1636624800000, booked: "iqcfz", amo: "PD" },
//       { start: 1636624800000, end: 1636626600000, booked: "lhofs", amo: "PD" },
//       { start: 1636626600000, end: 1636628400000, booked: "lhofs", amo: "PD" },
//       { start: 1636628400000, end: 1636630200000, booked: "lhofs", amo: "PD" },
//     ],
//     [
//       { start: 1636615800000, end: 1636617600000, booked: "ewdyh", amo: "KM" },
//       { start: 1636617600000, end: 1636619400000, booked: "ewdyh", amo: "KM" },
//       { start: 1636619400000, end: 1636621200000, booked: "ewdyh", amo: "KM" },
//       { start: 1636621200000, end: 1636623000000, booked: "ewdyh", amo: "KM" },
//       { start: 1636623000000, end: 1636624800000, booked: "ewdyh", amo: "KM" },
//       { start: 1636624800000, end: 1636626600000, booked: "ewdyh", amo: "KM" },
//       { start: 1636626600000, end: 1636628400000, booked: "ewdyh", amo: "KM" },
//       { start: 1636628400000, end: 1636630200000, booked: "ewdyh", amo: "KM" },
//     ],
//   ],
//   [
//     [
//       { start: 1636633800000, end: 1636635600000, booked: false, amo: "JB" },
//       { start: 1636635600000, end: 1636637400000, booked: false, amo: "JB" },
//       { start: 1636637400000, end: 1636639200000, booked: false, amo: "JB" },
//       { start: 1636639200000, end: 1636641000000, booked: "yonle", amo: "JB" },
//       { start: 1636641000000, end: 1636642800000, booked: "yonle", amo: "JB" },
//       { start: 1636642800000, end: 1636644600000, booked: "yonle", amo: "JB" },
//       { start: 1636644600000, end: 1636646400000, booked: "yonle", amo: "JB" },
//       { start: 1636646400000, end: 1636648200000, booked: "yonle", amo: "JB" },
//       { start: 1636648200000, end: 1636650000000, booked: false, amo: "JB" },
//       { start: 1636650000000, end: 1636651800000, booked: false, amo: "JB" },
//     ],
//     [
//       { start: 1636633800000, end: 1636635600000, booked: false, amo: "PD" },
//       { start: 1636635600000, end: 1636637400000, booked: false, amo: "PD" },
//       { start: 1636637400000, end: 1636639200000, booked: false, amo: "PD" },
//       { start: 1636639200000, end: 1636641000000, booked: false, amo: "PD" },
//       { start: 1636641000000, end: 1636642800000, booked: false, amo: "PD" },
//       { start: 1636642800000, end: 1636644600000, booked: false, amo: "PD" },
//       { start: 1636644600000, end: 1636646400000, booked: "djyzt", amo: "PD" },
//       { start: 1636646400000, end: 1636648200000, booked: "djyzt", amo: "PD" },
//       { start: 1636648200000, end: 1636650000000, booked: false, amo: "PD" },
//       { start: 1636650000000, end: 1636651800000, booked: false, amo: "PD" },
//     ],
//     [
//       { start: 1636633800000, end: 1636635600000, booked: false, amo: "KM" },
//       { start: 1636635600000, end: 1636637400000, booked: false, amo: "KM" },
//       { start: 1636637400000, end: 1636639200000, booked: "smbrb", amo: "KM" },
//       { start: 1636639200000, end: 1636641000000, booked: "smbrb", amo: "KM" },
//       { start: 1636641000000, end: 1636642800000, booked: "nsrqq", amo: "KM" },
//       { start: 1636642800000, end: 1636644600000, booked: "nsrqq", amo: "KM" },
//       { start: 1636644600000, end: 1636646400000, booked: "nsrqq", amo: "KM" },
//       { start: 1636646400000, end: 1636648200000, booked: "nsrqq", amo: "KM" },
//       { start: 1636648200000, end: 1636650000000, booked: "nsrqq", amo: "KM" },
//       { start: 1636650000000, end: 1636651800000, booked: "hkyhp", amo: "KM" },
//     ],
//   ],
//   [
//     [
//       { start: 1636702200000, end: 1636704000000, booked: false, amo: "JB" },
//       { start: 1636704000000, end: 1636705800000, booked: false, amo: "JB" },
//       { start: 1636705800000, end: 1636707600000, booked: false, amo: "JB" },
//       { start: 1636707600000, end: 1636709400000, booked: "afweh", amo: "JB" },
//       { start: 1636709400000, end: 1636711200000, booked: "afweh", amo: "JB" },
//       { start: 1636711200000, end: 1636713000000, booked: "afweh", amo: "JB" },
//       { start: 1636713000000, end: 1636714800000, booked: "afweh", amo: "JB" },
//       { start: 1636714800000, end: 1636716600000, booked: false, amo: "JB" },
//     ],
//     [
//       { start: 1636702200000, end: 1636704000000, booked: false, amo: "PD" },
//       { start: 1636704000000, end: 1636705800000, booked: false, amo: "PD" },
//       { start: 1636705800000, end: 1636707600000, booked: false, amo: "PD" },
//       { start: 1636707600000, end: 1636709400000, booked: false, amo: "PD" },
//       { start: 1636709400000, end: 1636711200000, booked: false, amo: "PD" },
//       { start: 1636711200000, end: 1636713000000, booked: false, amo: "PD" },
//       { start: 1636713000000, end: 1636714800000, booked: "phsux", amo: "PD" },
//       { start: 1636714800000, end: 1636716600000, booked: "phsux", amo: "PD" },
//     ],
//     [
//       { start: 1636702200000, end: 1636704000000, booked: false, amo: "KM" },
//       { start: 1636704000000, end: 1636705800000, booked: "xeyir", amo: "KM" },
//       { start: 1636705800000, end: 1636707600000, booked: "xeyir", amo: "KM" },
//       { start: 1636707600000, end: 1636709400000, booked: "xeyir", amo: "KM" },
//       { start: 1636709400000, end: 1636711200000, booked: "ypfrs", amo: "KM" },
//       { start: 1636711200000, end: 1636713000000, booked: "ypfrs", amo: "KM" },
//       { start: 1636713000000, end: 1636714800000, booked: "nxwmd", amo: "KM" },
//       { start: 1636714800000, end: 1636716600000, booked: "nxwmd", amo: "KM" },
//     ],
//     [
//       { start: 1636702200000, end: 1636704000000, booked: false, amo: "JY" },
//       { start: 1636704000000, end: 1636705800000, booked: "fddnq", amo: "JY" },
//       { start: 1636705800000, end: 1636707600000, booked: "fddnq", amo: "JY" },
//       { start: 1636707600000, end: 1636709400000, booked: "fddnq", amo: "JY" },
//       { start: 1636709400000, end: 1636711200000, booked: "fddnq", amo: "JY" },
//       { start: 1636711200000, end: 1636713000000, booked: false, amo: "JY" },
//       { start: 1636713000000, end: 1636714800000, booked: false, amo: "JY" },
//       { start: 1636714800000, end: 1636716600000, booked: false, amo: "JY" },
//     ],
//   ],
//   [
//     [
//       { start: 1636720200000, end: 1636722000000, booked: "lqugv", amo: "JB" },
//       { start: 1636722000000, end: 1636723800000, booked: "lqugv", amo: "JB" },
//       { start: 1636723800000, end: 1636725600000, booked: false, amo: "JB" },
//       { start: 1636725600000, end: 1636727400000, booked: "guhvm", amo: "JB" },
//       { start: 1636727400000, end: 1636729200000, booked: "guhvm", amo: "JB" },
//       { start: 1636729200000, end: 1636731000000, booked: false, amo: "JB" },
//       { start: 1636731000000, end: 1636732800000, booked: "ebyrw", amo: "JB" },
//       { start: 1636732800000, end: 1636734600000, booked: "ebyrw", amo: "JB" },
//       { start: 1636734600000, end: 1636736400000, booked: "ebyrw", amo: "JB" },
//       { start: 1636736400000, end: 1636738200000, booked: "ebyrw", amo: "JB" },
//     ],
//     [
//       { start: 1636720200000, end: 1636722000000, booked: false, amo: "PD" },
//       { start: 1636722000000, end: 1636723800000, booked: false, amo: "PD" },
//       { start: 1636723800000, end: 1636725600000, booked: false, amo: "PD" },
//       { start: 1636725600000, end: 1636727400000, booked: "jchaq", amo: "PD" },
//       { start: 1636727400000, end: 1636729200000, booked: "jchaq", amo: "PD" },
//       { start: 1636729200000, end: 1636731000000, booked: "jchaq", amo: "PD" },
//       { start: 1636731000000, end: 1636732800000, booked: "pueig", amo: "PD" },
//       { start: 1636732800000, end: 1636734600000, booked: "pueig", amo: "PD" },
//       { start: 1636734600000, end: 1636736400000, booked: "pueig", amo: "PD" },
//       { start: 1636736400000, end: 1636738200000, booked: "pueig", amo: "PD" },
//     ],
//     [
//       { start: 1636720200000, end: 1636722000000, booked: false, amo: "KM" },
//       { start: 1636722000000, end: 1636723800000, booked: false, amo: "KM" },
//       { start: 1636723800000, end: 1636725600000, booked: false, amo: "KM" },
//       { start: 1636725600000, end: 1636727400000, booked: "beyie", amo: "KM" },
//       { start: 1636727400000, end: 1636729200000, booked: "beyie", amo: "KM" },
//       { start: 1636729200000, end: 1636731000000, booked: "beyie", amo: "KM" },
//       { start: 1636731000000, end: 1636732800000, booked: "beyie", amo: "KM" },
//       { start: 1636732800000, end: 1636734600000, booked: "beyie", amo: "KM" },
//       { start: 1636734600000, end: 1636736400000, booked: false, amo: "KM" },
//       { start: 1636736400000, end: 1636738200000, booked: false, amo: "KM" },
//     ],
//     [
//       { start: 1636720200000, end: 1636722000000, booked: false, amo: "JY" },
//       { start: 1636722000000, end: 1636723800000, booked: "alyzl", amo: "JY" },
//       { start: 1636723800000, end: 1636725600000, booked: "alyzl", amo: "JY" },
//       { start: 1636725600000, end: 1636727400000, booked: "alyzl", amo: "JY" },
//       { start: 1636727400000, end: 1636729200000, booked: "alyzl", amo: "JY" },
//       { start: 1636729200000, end: 1636731000000, booked: "alyzl", amo: "JY" },
//       { start: 1636731000000, end: 1636732800000, booked: "irzuj", amo: "JY" },
//       { start: 1636732800000, end: 1636734600000, booked: "irzuj", amo: "JY" },
//       { start: 1636734600000, end: 1636736400000, booked: false, amo: "JY" },
//       { start: 1636736400000, end: 1636738200000, booked: false, amo: "JY" },
//     ],
//   ],
//   [
//     [
//       { start: 1636961400000, end: 1636963200000, booked: false, amo: "JB" },
//       { start: 1636963200000, end: 1636965000000, booked: "szsfk", amo: "JB" },
//       { start: 1636965000000, end: 1636966800000, booked: "szsfk", amo: "JB" },
//       { start: 1636966800000, end: 1636968600000, booked: "szsfk", amo: "JB" },
//       { start: 1636968600000, end: 1636970400000, booked: "szsfk", amo: "JB" },
//       { start: 1636970400000, end: 1636972200000, booked: "szsfk", amo: "JB" },
//       { start: 1636972200000, end: 1636974000000, booked: false, amo: "JB" },
//       { start: 1636974000000, end: 1636975800000, booked: false, amo: "JB" },
//     ],
//     [
//       { start: 1636961400000, end: 1636963200000, booked: false, amo: "PD" },
//       { start: 1636963200000, end: 1636965000000, booked: "xcaof", amo: "PD" },
//       { start: 1636965000000, end: 1636966800000, booked: "xcaof", amo: "PD" },
//       { start: 1636966800000, end: 1636968600000, booked: "xcaof", amo: "PD" },
//       { start: 1636968600000, end: 1636970400000, booked: "xcaof", amo: "PD" },
//       { start: 1636970400000, end: 1636972200000, booked: false, amo: "PD" },
//       { start: 1636972200000, end: 1636974000000, booked: false, amo: "PD" },
//       { start: 1636974000000, end: 1636975800000, booked: false, amo: "PD" },
//     ],
//     [
//       { start: 1636961400000, end: 1636963200000, booked: false, amo: "KM" },
//       { start: 1636963200000, end: 1636965000000, booked: false, amo: "KM" },
//       { start: 1636965000000, end: 1636966800000, booked: false, amo: "KM" },
//       { start: 1636966800000, end: 1636968600000, booked: false, amo: "KM" },
//       { start: 1636968600000, end: 1636970400000, booked: false, amo: "KM" },
//       { start: 1636970400000, end: 1636972200000, booked: false, amo: "KM" },
//       { start: 1636972200000, end: 1636974000000, booked: false, amo: "KM" },
//       { start: 1636974000000, end: 1636975800000, booked: false, amo: "KM" },
//     ],
//     [
//       { start: 1636961400000, end: 1636963200000, booked: false, amo: "JY" },
//       { start: 1636963200000, end: 1636965000000, booked: "llzlp", amo: "JY" },
//       { start: 1636965000000, end: 1636966800000, booked: "llzlp", amo: "JY" },
//       { start: 1636966800000, end: 1636968600000, booked: "wkvxo", amo: "JY" },
//       { start: 1636968600000, end: 1636970400000, booked: "wkvxo", amo: "JY" },
//       { start: 1636970400000, end: 1636972200000, booked: "wkvxo", amo: "JY" },
//       { start: 1636972200000, end: 1636974000000, booked: "wkvxo", amo: "JY" },
//       { start: 1636974000000, end: 1636975800000, booked: "wkvxo", amo: "JY" },
//     ],
//   ],
//   [
//     [
//       { start: 1636979400000, end: 1636981200000, booked: "xnxjq", amo: "JB" },
//       { start: 1636981200000, end: 1636983000000, booked: "xnxjq", amo: "JB" },
//       { start: 1636983000000, end: 1636984800000, booked: "xnxjq", amo: "JB" },
//       { start: 1636984800000, end: 1636986600000, booked: "xnxjq", amo: "JB" },
//       { start: 1636986600000, end: 1636988400000, booked: "mmohj", amo: "JB" },
//       { start: 1636988400000, end: 1636990200000, booked: "mmohj", amo: "JB" },
//       { start: 1636990200000, end: 1636992000000, booked: false, amo: "JB" },
//       { start: 1636992000000, end: 1636993800000, booked: false, amo: "JB" },
//       { start: 1636993800000, end: 1636995600000, booked: false, amo: "JB" },
//       { start: 1636995600000, end: 1636997400000, booked: false, amo: "JB" },
//     ],
//     [
//       { start: 1636979400000, end: 1636981200000, booked: false, amo: "PD" },
//       { start: 1636981200000, end: 1636983000000, booked: false, amo: "PD" },
//       { start: 1636983000000, end: 1636984800000, booked: "cuotk", amo: "PD" },
//       { start: 1636984800000, end: 1636986600000, booked: "cuotk", amo: "PD" },
//       { start: 1636986600000, end: 1636988400000, booked: "cuotk", amo: "PD" },
//       { start: 1636988400000, end: 1636990200000, booked: "cuotk", amo: "PD" },
//       { start: 1636990200000, end: 1636992000000, booked: "cuotk", amo: "PD" },
//       { start: 1636992000000, end: 1636993800000, booked: "cuotk", amo: "PD" },
//       { start: 1636993800000, end: 1636995600000, booked: "cuotk", amo: "PD" },
//       { start: 1636995600000, end: 1636997400000, booked: "cuotk", amo: "PD" },
//     ],
//     [
//       { start: 1636979400000, end: 1636981200000, booked: "zsyq", amo: "KM" },
//       { start: 1636981200000, end: 1636983000000, booked: "zsyq", amo: "KM" },
//       { start: 1636983000000, end: 1636984800000, booked: "zsyq", amo: "KM" },
//       { start: 1636984800000, end: 1636986600000, booked: "zsyq", amo: "KM" },
//       { start: 1636986600000, end: 1636988400000, booked: "oiybw", amo: "KM" },
//       { start: 1636988400000, end: 1636990200000, booked: "oiybw", amo: "KM" },
//       { start: 1636990200000, end: 1636992000000, booked: "zsyq", amo: "KM" },
//       { start: 1636992000000, end: 1636993800000, booked: "zsyq", amo: "KM" },
//       { start: 1636993800000, end: 1636995600000, booked: false, amo: "KM" },
//       { start: 1636995600000, end: 1636997400000, booked: false, amo: "KM" },
//     ],
//     [
//       { start: 1636979400000, end: 1636981200000, booked: false, amo: "JY" },
//       { start: 1636981200000, end: 1636983000000, booked: false, amo: "JY" },
//       { start: 1636983000000, end: 1636984800000, booked: false, amo: "JY" },
//       { start: 1636984800000, end: 1636986600000, booked: "mdz", amo: "JY" },
//       { start: 1636986600000, end: 1636988400000, booked: "mdz", amo: "JY" },
//       { start: 1636988400000, end: 1636990200000, booked: "mdz", amo: "JY" },
//       { start: 1636990200000, end: 1636992000000, booked: false, amo: "JY" },
//       { start: 1636992000000, end: 1636993800000, booked: false, amo: "JY" },
//       { start: 1636993800000, end: 1636995600000, booked: false, amo: "JY" },
//       { start: 1636995600000, end: 1636997400000, booked: false, amo: "JY" },
//     ],
//   ],
//   [
//     [
//       { start: 1637047800000, end: 1637049600000, booked: false, amo: "JB" },
//       { start: 1637049600000, end: 1637051400000, booked: false, amo: "JB" },
//       { start: 1637051400000, end: 1637053200000, booked: "gydtb", amo: "JB" },
//       { start: 1637053200000, end: 1637055000000, booked: "acxzz", amo: "JB" },
//       { start: 1637055000000, end: 1637056800000, booked: "acxzz", amo: "JB" },
//       { start: 1637056800000, end: 1637058600000, booked: "acxzz", amo: "JB" },
//       { start: 1637058600000, end: 1637060400000, booked: "acxzz", amo: "JB" },
//       { start: 1637060400000, end: 1637062200000, booked: "acxzz", amo: "JB" },
//     ],
//   ],
//   [
//     [
//       { start: 1637065800000, end: 1637067600000, booked: false, amo: "JB" },
//       { start: 1637067600000, end: 1637069400000, booked: false, amo: "JB" },
//       { start: 1637069400000, end: 1637071200000, booked: "lrdwr", amo: "JB" },
//       { start: 1637071200000, end: 1637073000000, booked: "lrdwr", amo: "JB" },
//       { start: 1637073000000, end: 1637074800000, booked: "lrdwr", amo: "JB" },
//       { start: 1637074800000, end: 1637076600000, booked: "wdhjq", amo: "JB" },
//       { start: 1637076600000, end: 1637078400000, booked: "wdhjq", amo: "JB" },
//       { start: 1637078400000, end: 1637080200000, booked: "sdlgc", amo: "JB" },
//       { start: 1637080200000, end: 1637082000000, booked: "sdlgc", amo: "JB" },
//       { start: 1637082000000, end: 1637083800000, booked: false, amo: "JB" },
//     ],
//   ],
//   [
//     [
//       { start: 1637134200000, end: 1637136000000, booked: "tqloy", amo: "JB" },
//       { start: 1637136000000, end: 1637137800000, booked: "tqloy", amo: "JB" },
//       { start: 1637137800000, end: 1637139600000, booked: "tqloy", amo: "JB" },
//       { start: 1637139600000, end: 1637141400000, booked: "tqloy", amo: "JB" },
//       { start: 1637141400000, end: 1637143200000, booked: false, amo: "JB" },
//       { start: 1637143200000, end: 1637145000000, booked: "eaixm", amo: "JB" },
//       { start: 1637145000000, end: 1637146800000, booked: "eaixm", amo: "JB" },
//       { start: 1637146800000, end: 1637148600000, booked: false, amo: "JB" },
//     ],
//     [
//       { start: 1637134200000, end: 1637136000000, booked: false, amo: "PD" },
//       { start: 1637136000000, end: 1637137800000, booked: "hjkld", amo: "PD" },
//       { start: 1637137800000, end: 1637139600000, booked: "hjkld", amo: "PD" },
//       { start: 1637139600000, end: 1637141400000, booked: "hjkld", amo: "PD" },
//       { start: 1637141400000, end: 1637143200000, booked: "hjkld", amo: "PD" },
//       { start: 1637143200000, end: 1637145000000, booked: false, amo: "PD" },
//       { start: 1637145000000, end: 1637146800000, booked: false, amo: "PD" },
//       { start: 1637146800000, end: 1637148600000, booked: false, amo: "PD" },
//     ],
//     [
//       { start: 1637134200000, end: 1637136000000, booked: "oorzy", amo: "KM" },
//       { start: 1637136000000, end: 1637137800000, booked: "oorzy", amo: "KM" },
//       { start: 1637137800000, end: 1637139600000, booked: "oorzy", amo: "KM" },
//       { start: 1637139600000, end: 1637141400000, booked: "oorzy", amo: "KM" },
//       { start: 1637141400000, end: 1637143200000, booked: "oorzy", amo: "KM" },
//       { start: 1637143200000, end: 1637145000000, booked: "auvut", amo: "KM" },
//       { start: 1637145000000, end: 1637146800000, booked: "auvut", amo: "KM" },
//       { start: 1637146800000, end: 1637148600000, booked: "auvut", amo: "KM" },
//     ],
//     [
//       { start: 1637134200000, end: 1637136000000, booked: false, amo: "JY" },
//       { start: 1637136000000, end: 1637137800000, booked: false, amo: "JY" },
//       { start: 1637137800000, end: 1637139600000, booked: false, amo: "JY" },
//       { start: 1637139600000, end: 1637141400000, booked: false, amo: "JY" },
//       { start: 1637141400000, end: 1637143200000, booked: false, amo: "JY" },
//       { start: 1637143200000, end: 1637145000000, booked: false, amo: "JY" },
//       { start: 1637145000000, end: 1637146800000, booked: false, amo: "JY" },
//       { start: 1637146800000, end: 1637148600000, booked: false, amo: "JY" },
//     ],
//   ],
//   [
//     [
//       { start: 1637152200000, end: 1637154000000, booked: false, amo: "JB" },
//       { start: 1637154000000, end: 1637155800000, booked: "gqcxm", amo: "JB" },
//       { start: 1637155800000, end: 1637157600000, booked: "gqcxm", amo: "JB" },
//       { start: 1637157600000, end: 1637159400000, booked: "gqcxm", amo: "JB" },
//       { start: 1637159400000, end: 1637161200000, booked: "uvhnx", amo: "JB" },
//       { start: 1637161200000, end: 1637163000000, booked: "uvhnx", amo: "JB" },
//       { start: 1637163000000, end: 1637164800000, booked: "uvhnx", amo: "JB" },
//       { start: 1637164800000, end: 1637166600000, booked: "uvhnx", amo: "JB" },
//       { start: 1637166600000, end: 1637168400000, booked: "uvhnx", amo: "JB" },
//       { start: 1637168400000, end: 1637170200000, booked: false, amo: "JB" },
//     ],
//     [
//       { start: 1637152200000, end: 1637154000000, booked: false, amo: "PD" },
//       { start: 1637154000000, end: 1637155800000, booked: false, amo: "PD" },
//       { start: 1637155800000, end: 1637157600000, booked: "evwpe", amo: "PD" },
//       { start: 1637157600000, end: 1637159400000, booked: "evwpe", amo: "PD" },
//       { start: 1637159400000, end: 1637161200000, booked: "evwpe", amo: "PD" },
//       { start: 1637161200000, end: 1637163000000, booked: "ktwzy", amo: "PD" },
//       { start: 1637163000000, end: 1637164800000, booked: "ktwzy", amo: "PD" },
//       { start: 1637164800000, end: 1637166600000, booked: "ktwzy", amo: "PD" },
//       { start: 1637166600000, end: 1637168400000, booked: "ktwzy", amo: "PD" },
//       { start: 1637168400000, end: 1637170200000, booked: false, amo: "PD" },
//     ],
//     [
//       { start: 1637152200000, end: 1637154000000, booked: false, amo: "KM" },
//       { start: 1637154000000, end: 1637155800000, booked: false, amo: "KM" },
//       { start: 1637155800000, end: 1637157600000, booked: "fqemj", amo: "KM" },
//       { start: 1637157600000, end: 1637159400000, booked: "fqemj", amo: "KM" },
//       { start: 1637159400000, end: 1637161200000, booked: "fqemj", amo: "KM" },
//       { start: 1637161200000, end: 1637163000000, booked: "fqemj", amo: "KM" },
//       { start: 1637163000000, end: 1637164800000, booked: false, amo: "KM" },
//       { start: 1637164800000, end: 1637166600000, booked: false, amo: "KM" },
//       { start: 1637166600000, end: 1637168400000, booked: "wrter", amo: "KM" },
//       { start: 1637168400000, end: 1637170200000, booked: "wrter", amo: "KM" },
//     ],
//     [
//       { start: 1637152200000, end: 1637154000000, booked: false, amo: "JY" },
//       { start: 1637154000000, end: 1637155800000, booked: false, amo: "JY" },
//       { start: 1637155800000, end: 1637157600000, booked: false, amo: "JY" },
//       { start: 1637157600000, end: 1637159400000, booked: false, amo: "JY" },
//       { start: 1637159400000, end: 1637161200000, booked: "djnlm", amo: "JY" },
//       { start: 1637161200000, end: 1637163000000, booked: "djnlm", amo: "JY" },
//       { start: 1637163000000, end: 1637164800000, booked: "djnlm", amo: "JY" },
//       { start: 1637164800000, end: 1637166600000, booked: false, amo: "JY" },
//       { start: 1637166600000, end: 1637168400000, booked: false, amo: "JY" },
//       { start: 1637168400000, end: 1637170200000, booked: false, amo: "JY" },
//     ],
//   ],
//   [
//     [
//       { start: 1637220600000, end: 1637222400000, booked: false, amo: "JB" },
//       { start: 1637222400000, end: 1637224200000, booked: "jdwzn", amo: "JB" },
//       { start: 1637224200000, end: 1637226000000, booked: "jdwzn", amo: "JB" },
//       { start: 1637226000000, end: 1637227800000, booked: "jdwzn", amo: "JB" },
//       { start: 1637227800000, end: 1637229600000, booked: "jdwzn", amo: "JB" },
//       { start: 1637229600000, end: 1637231400000, booked: "jdwzn", amo: "JB" },
//       { start: 1637231400000, end: 1637233200000, booked: false, amo: "JB" },
//       { start: 1637233200000, end: 1637235000000, booked: false, amo: "JB" },
//     ],
//     [
//       { start: 1637220600000, end: 1637222400000, booked: false, amo: "PD" },
//       { start: 1637222400000, end: 1637224200000, booked: false, amo: "PD" },
//       { start: 1637224200000, end: 1637226000000, booked: false, amo: "PD" },
//       { start: 1637226000000, end: 1637227800000, booked: false, amo: "PD" },
//       { start: 1637227800000, end: 1637229600000, booked: false, amo: "PD" },
//       { start: 1637229600000, end: 1637231400000, booked: "sjmvj", amo: "PD" },
//       { start: 1637231400000, end: 1637233200000, booked: "sjmvj", amo: "PD" },
//       { start: 1637233200000, end: 1637235000000, booked: false, amo: "PD" },
//     ],
//     [
//       { start: 1637220600000, end: 1637222400000, booked: false, amo: "KM" },
//       { start: 1637222400000, end: 1637224200000, booked: false, amo: "KM" },
//       { start: 1637224200000, end: 1637226000000, booked: false, amo: "KM" },
//       { start: 1637226000000, end: 1637227800000, booked: false, amo: "KM" },
//       { start: 1637227800000, end: 1637229600000, booked: false, amo: "KM" },
//       { start: 1637229600000, end: 1637231400000, booked: false, amo: "KM" },
//       { start: 1637231400000, end: 1637233200000, booked: false, amo: "KM" },
//       { start: 1637233200000, end: 1637235000000, booked: false, amo: "KM" },
//     ],
//     [
//       { start: 1637220600000, end: 1637222400000, booked: "vqoex", amo: "JY" },
//       { start: 1637222400000, end: 1637224200000, booked: "vqoex", amo: "JY" },
//       { start: 1637224200000, end: 1637226000000, booked: "vqoex", amo: "JY" },
//       { start: 1637226000000, end: 1637227800000, booked: "oqfvz", amo: "JY" },
//       { start: 1637227800000, end: 1637229600000, booked: "oqfvz", amo: "JY" },
//       { start: 1637229600000, end: 1637231400000, booked: "oqfvz", amo: "JY" },
//       { start: 1637231400000, end: 1637233200000, booked: false, amo: "JY" },
//       { start: 1637233200000, end: 1637235000000, booked: false, amo: "JY" },
//     ],
//   ],
//   [
//     [
//       { start: 1637238600000, end: 1637240400000, booked: false, amo: "JB" },
//       { start: 1637240400000, end: 1637242200000, booked: false, amo: "JB" },
//       { start: 1637242200000, end: 1637244000000, booked: "ytogt", amo: "JB" },
//       { start: 1637244000000, end: 1637245800000, booked: "vhvpj", amo: "JB" },
//       { start: 1637245800000, end: 1637247600000, booked: "vhvpj", amo: "JB" },
//       { start: 1637247600000, end: 1637249400000, booked: "vhvpj", amo: "JB" },
//       { start: 1637249400000, end: 1637251200000, booked: "vknez", amo: "JB" },
//       { start: 1637251200000, end: 1637253000000, booked: "vknez", amo: "JB" },
//       { start: 1637253000000, end: 1637254800000, booked: "vknez", amo: "JB" },
//       { start: 1637254800000, end: 1637256600000, booked: "vknez", amo: "JB" },
//     ],
//     [
//       { start: 1637238600000, end: 1637240400000, booked: false, amo: "PD" },
//       { start: 1637240400000, end: 1637242200000, booked: "dtboh", amo: "PD" },
//       { start: 1637242200000, end: 1637244000000, booked: "dtboh", amo: "PD" },
//       { start: 1637244000000, end: 1637245800000, booked: "dtboh", amo: "PD" },
//       { start: 1637245800000, end: 1637247600000, booked: "dtboh", amo: "PD" },
//       { start: 1637247600000, end: 1637249400000, booked: "srnhv", amo: "PD" },
//       { start: 1637249400000, end: 1637251200000, booked: "srnhv", amo: "PD" },
//       { start: 1637251200000, end: 1637253000000, booked: "srnhv", amo: "PD" },
//       { start: 1637253000000, end: 1637254800000, booked: "srnhv", amo: "PD" },
//       { start: 1637254800000, end: 1637256600000, booked: "srnhv", amo: "PD" },
//     ],
//     [
//       { start: 1637238600000, end: 1637240400000, booked: false, amo: "KM" },
//       { start: 1637240400000, end: 1637242200000, booked: false, amo: "KM" },
//       { start: 1637242200000, end: 1637244000000, booked: "yyqns", amo: "KM" },
//       { start: 1637244000000, end: 1637245800000, booked: "yyqns", amo: "KM" },
//       { start: 1637245800000, end: 1637247600000, booked: "yyqns", amo: "KM" },
//       { start: 1637247600000, end: 1637249400000, booked: "vtsa", amo: "KM" },
//       { start: 1637249400000, end: 1637251200000, booked: "vtsa", amo: "KM" },
//       { start: 1637251200000, end: 1637253000000, booked: "vtsa", amo: "KM" },
//       { start: 1637253000000, end: 1637254800000, booked: "vtsa", amo: "KM" },
//       { start: 1637254800000, end: 1637256600000, booked: "vtsa", amo: "KM" },
//     ],
//     [
//       { start: 1637238600000, end: 1637240400000, booked: false, amo: "JY" },
//       { start: 1637240400000, end: 1637242200000, booked: false, amo: "JY" },
//       { start: 1637242200000, end: 1637244000000, booked: false, amo: "JY" },
//       { start: 1637244000000, end: 1637245800000, booked: false, amo: "JY" },
//       { start: 1637245800000, end: 1637247600000, booked: false, amo: "JY" },
//       { start: 1637247600000, end: 1637249400000, booked: false, amo: "JY" },
//       { start: 1637249400000, end: 1637251200000, booked: false, amo: "JY" },
//       { start: 1637251200000, end: 1637253000000, booked: false, amo: "JY" },
//       { start: 1637253000000, end: 1637254800000, booked: false, amo: "JY" },
//       { start: 1637254800000, end: 1637256600000, booked: false, amo: "JY" },
//     ],
//   ],
//   [
//     [
//       { start: 1637307000000, end: 1637308800000, booked: false, amo: "JB" },
//       { start: 1637308800000, end: 1637310600000, booked: "jocpl", amo: "JB" },
//       { start: 1637310600000, end: 1637312400000, booked: "jocpl", amo: "JB" },
//       { start: 1637312400000, end: 1637314200000, booked: "crczp", amo: "JB" },
//       { start: 1637314200000, end: 1637316000000, booked: "crczp", amo: "JB" },
//       { start: 1637316000000, end: 1637317800000, booked: "crczp", amo: "JB" },
//       { start: 1637317800000, end: 1637319600000, booked: "crczp", amo: "JB" },
//       { start: 1637319600000, end: 1637321400000, booked: false, amo: "JB" },
//     ],
//     [
//       { start: 1637307000000, end: 1637308800000, booked: false, amo: "PD" },
//       { start: 1637308800000, end: 1637310600000, booked: false, amo: "PD" },
//       { start: 1637310600000, end: 1637312400000, booked: "thuoz", amo: "PD" },
//       { start: 1637312400000, end: 1637314200000, booked: "thuoz", amo: "PD" },
//       { start: 1637314200000, end: 1637316000000, booked: false, amo: "PD" },
//       { start: 1637316000000, end: 1637317800000, booked: false, amo: "PD" },
//       { start: 1637317800000, end: 1637319600000, booked: false, amo: "PD" },
//       { start: 1637319600000, end: 1637321400000, booked: false, amo: "PD" },
//     ],
//     [
//       { start: 1637307000000, end: 1637308800000, booked: false, amo: "KM" },
//       { start: 1637308800000, end: 1637310600000, booked: "zsbny", amo: "KM" },
//       { start: 1637310600000, end: 1637312400000, booked: "zsbny", amo: "KM" },
//       { start: 1637312400000, end: 1637314200000, booked: "zsbny", amo: "KM" },
//       { start: 1637314200000, end: 1637316000000, booked: "zsbny", amo: "KM" },
//       { start: 1637316000000, end: 1637317800000, booked: "zsbny", amo: "KM" },
//       { start: 1637317800000, end: 1637319600000, booked: false, amo: "KM" },
//       { start: 1637319600000, end: 1637321400000, booked: false, amo: "KM" },
//     ],
//     [
//       { start: 1637307000000, end: 1637308800000, booked: false, amo: "JY" },
//       { start: 1637308800000, end: 1637310600000, booked: "hpqwv", amo: "JY" },
//       { start: 1637310600000, end: 1637312400000, booked: "hpqwv", amo: "JY" },
//       { start: 1637312400000, end: 1637314200000, booked: "hpqwv", amo: "JY" },
//       { start: 1637314200000, end: 1637316000000, booked: "hpqwv", amo: "JY" },
//       { start: 1637316000000, end: 1637317800000, booked: "hpqwv", amo: "JY" },
//       { start: 1637317800000, end: 1637319600000, booked: false, amo: "JY" },
//       { start: 1637319600000, end: 1637321400000, booked: false, amo: "JY" },
//     ],
//     [
//       { start: 1637307000000, end: 1637308800000, booked: false, amo: "AF" },
//       { start: 1637308800000, end: 1637310600000, booked: false, amo: "AF" },
//       { start: 1637310600000, end: 1637312400000, booked: false, amo: "AF" },
//       { start: 1637312400000, end: 1637314200000, booked: false, amo: "AF" },
//       { start: 1637314200000, end: 1637316000000, booked: false, amo: "AF" },
//       { start: 1637316000000, end: 1637317800000, booked: false, amo: "AF" },
//       { start: 1637317800000, end: 1637319600000, booked: false, amo: "AF" },
//       { start: 1637319600000, end: 1637321400000, booked: false, amo: "AF" },
//     ],
//   ],
//   [
//     [
//       { start: 1637325000000, end: 1637326800000, booked: "ffsbr", amo: "JB" },
//       { start: 1637326800000, end: 1637328600000, booked: "ffsbr", amo: "JB" },
//       { start: 1637328600000, end: 1637330400000, booked: false, amo: "JB" },
//       { start: 1637330400000, end: 1637332200000, booked: false, amo: "JB" },
//       { start: 1637332200000, end: 1637334000000, booked: false, amo: "JB" },
//       { start: 1637334000000, end: 1637335800000, booked: "xndbj", amo: "JB" },
//       { start: 1637335800000, end: 1637337600000, booked: "xndbj", amo: "JB" },
//       { start: 1637337600000, end: 1637339400000, booked: "xndbj", amo: "JB" },
//       { start: 1637339400000, end: 1637341200000, booked: "xndbj", amo: "JB" },
//       { start: 1637341200000, end: 1637343000000, booked: "xndbj", amo: "JB" },
//     ],
//     [
//       { start: 1637325000000, end: 1637326800000, booked: false, amo: "PD" },
//       { start: 1637326800000, end: 1637328600000, booked: false, amo: "PD" },
//       { start: 1637328600000, end: 1637330400000, booked: "qukvd", amo: "PD" },
//       { start: 1637330400000, end: 1637332200000, booked: "qukvd", amo: "PD" },
//       { start: 1637332200000, end: 1637334000000, booked: "qukvd", amo: "PD" },
//       { start: 1637334000000, end: 1637335800000, booked: "vhmle", amo: "PD" },
//       { start: 1637335800000, end: 1637337600000, booked: "vhmle", amo: "PD" },
//       { start: 1637337600000, end: 1637339400000, booked: "vhmle", amo: "PD" },
//       { start: 1637339400000, end: 1637341200000, booked: "vhmle", amo: "PD" },
//       { start: 1637341200000, end: 1637343000000, booked: false, amo: "PD" },
//     ],
//     [
//       { start: 1637325000000, end: 1637326800000, booked: "dxzgj", amo: "KM" },
//       { start: 1637326800000, end: 1637328600000, booked: "dxzgj", amo: "KM" },
//       { start: 1637328600000, end: 1637330400000, booked: "dxzgj", amo: "KM" },
//       { start: 1637330400000, end: 1637332200000, booked: "dxzgj", amo: "KM" },
//       { start: 1637332200000, end: 1637334000000, booked: "dxzgj", amo: "KM" },
//       { start: 1637334000000, end: 1637335800000, booked: false, amo: "KM" },
//       { start: 1637335800000, end: 1637337600000, booked: false, amo: "KM" },
//       { start: 1637337600000, end: 1637339400000, booked: false, amo: "KM" },
//       { start: 1637339400000, end: 1637341200000, booked: false, amo: "KM" },
//       { start: 1637341200000, end: 1637343000000, booked: false, amo: "KM" },
//     ],
//     [
//       { start: 1637325000000, end: 1637326800000, booked: false, amo: "JY" },
//       { start: 1637326800000, end: 1637328600000, booked: false, amo: "JY" },
//       { start: 1637328600000, end: 1637330400000, booked: "gbepo", amo: "JY" },
//       { start: 1637330400000, end: 1637332200000, booked: "gbepo", amo: "JY" },
//       { start: 1637332200000, end: 1637334000000, booked: "gbepo", amo: "JY" },
//       { start: 1637334000000, end: 1637335800000, booked: "gbepo", amo: "JY" },
//       { start: 1637335800000, end: 1637337600000, booked: "gbepo", amo: "JY" },
//       { start: 1637337600000, end: 1637339400000, booked: "gbepo", amo: "JY" },
//       { start: 1637339400000, end: 1637341200000, booked: "gbepo", amo: "JY" },
//       { start: 1637341200000, end: 1637343000000, booked: "gbepo", amo: "JY" },
//     ],
//     [
//       { start: 1637325000000, end: 1637326800000, booked: false, amo: "AF" },
//       { start: 1637326800000, end: 1637328600000, booked: false, amo: "AF" },
//       { start: 1637328600000, end: 1637330400000, booked: "vwrtj", amo: "AF" },
//       { start: 1637330400000, end: 1637332200000, booked: "vwrtj", amo: "AF" },
//       { start: 1637332200000, end: 1637334000000, booked: "gdeyk", amo: "AF" },
//       { start: 1637334000000, end: 1637335800000, booked: "gdeyk", amo: "AF" },
//       { start: 1637335800000, end: 1637337600000, booked: "gdeyk", amo: "AF" },
//       { start: 1637337600000, end: 1637339400000, booked: "gdeyk", amo: "AF" },
//       { start: 1637339400000, end: 1637341200000, booked: false, amo: "AF" },
//       { start: 1637341200000, end: 1637343000000, booked: false, amo: "AF" },
//     ],
//   ],
// ];

// let s = new Schedule(new Data(gridTest, amos, people));
// console.log(`fitness -> ${s.getFitness()}`);
