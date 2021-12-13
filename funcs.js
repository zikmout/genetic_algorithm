const moment = require("moment");

const conversion = {
  1: "1H",
  1.5: "1H30",
  2: "2H",
  2.5: "2H30",
  3: "3H",
};

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

areHoursCrossing = (mt1, mt2) => {
  //   console.log(mt1);
  //   console.log(mt2);
  let startA = mt1[1].split(" ")[1];
  let endA = mt1[1].split(" ")[3];
  let startB = mt2[1].split(" ")[1];
  let endB = mt2[1].split(" ")[3];

  //   console.log(
  //     `startA : ${startA}, startB : ${startB}, endA : ${endA}, endB : ${endB}`
  //   );

  let sA = new Date().setHours(startA.split(":")[0], startA.split(":")[1], 0);
  let eA = new Date().setHours(endA.split(":")[0], endA.split(":")[1], 0);
  let sB = new Date().setHours(startB.split(":")[0], startB.split(":")[1], 0);
  let eB = new Date().setHours(endB.split(":")[0], endB.split(":")[1], 0);

  //   console.log(`sA : ${sA}, sB : ${sB}, eA : ${eA}, eB : ${eB}`);

  if (sA < eB && eA > sB) {
    return true;
  }
  return false;
};

areHoursCrossing(MEETING_TIMES[0], MEETING_TIMES[1]);

getMeetingTimeDay = (mt) => {
  return mt[1].split(" ")[0];
};

getHourLength = (mt) => {
  //   console.log(mt);
  let splitted = mt.split(" ");
  //   console.log(`splitted : ${JSON.stringify(splitted)}`);
  let stringStart = splitted[1];
  let stringEnd = splitted[3];
  let hourStart = new Date().setHours(
    stringStart.split(":")[0],
    stringStart.split(":")[1],
    0
  );
  let hourEnd = new Date().setHours(
    stringEnd.split(":")[0],
    stringEnd.split(":")[1],
    0
  );
  //   console.log(`start : ${hourStart}, end : ${hourEnd}`);
  let diff = Math.round(((hourEnd - hourStart) / 3600000) * 100) / 100;
  //   console.log(`diff : ${diff}`);
  return conversion[diff];
};

// console.log(`RETOUR -> ${getHourLength(MEETING_TIMES[10])}`);

module.exports = { getHourLength, getMeetingTimeDay, areHoursCrossing };
