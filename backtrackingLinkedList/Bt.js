const moment = require("moment");

const { LinkedList, ListNode } = require("./LinkedList");

const getAmoNb = (grid) => {
  let max = 0;
  grid.map((shift) => {
    if (shift.length >= max) {
      max = shift.length;
    }
  });
  return max;
};
const getPlanningStart = (grid) => {
  if (!grid[0][0][0]) {
    return undefined;
  } else {
    return grid[0][0][0].start;
  }
};
const getPlanningEnd = (grid) => {
  let tmax = 0;
  if (!grid) {
    return tmax;
  } else {
    for (let shift = 0; shift < grid.length; shift++) {
      for (let amo = 0; amo < grid[shift].length; amo++) {
        for (let slot = 0; slot < grid[shift][amo].length; slot++) {
          if (grid[shift][amo][slot].end > tmax) {
            tmax = grid[shift][amo][slot].end;
          }
        }
      }
    }
    return tmax;
  }
};
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const isBooked = (
  start,
  end,
  startDayHours,
  endDayHours,
  startDayMinutes,
  endDayMinutes,
  startLunchHours,
  startLunchMinutes,
  endLunchHours,
  endLunchMinutes,
  startShiftHours,
  startShiftMinutes,
  endShiftHours,
  endShiftMinutes
) => {
  // @Break
  if (
    moment.utc(start) <
      moment(start)
        .set("hour", startDayHours)
        .set("minutes", startDayMinutes)
        .utc() ||
    moment.utc(start) >=
      moment(start).set("hour", endDayHours).set("minutes", endDayMinutes).utc()
  ) {
    return "@break";
  }

  // @Lunch
  if (
    moment.utc(start) >
      moment(start)
        .set("hour", startLunchHours)
        .set("minutes", startLunchMinutes)
        .utc() &&
    moment.utc(start) <=
      moment(start)
        .set("hour", endLunchHours)
        .set("minutes", endLunchMinutes)
        .utc()
  ) {
    return "@lunch";
  }

  // @Shift
  if (
    moment.utc(start) <
      moment(start)
        .set("hour", startShiftHours)
        .set("minutes", startShiftMinutes)
        .utc() ||
    moment.utc(start) >=
      moment(start)
        .set("hour", endShiftHours)
        .set("minutes", endShiftMinutes)
        .utc()
  ) {
    return "@shift";
  }

  return false;
};
const copyGrid = (inputGrid) => {
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

function mapList(
  grid,
  pas,
  startDay,
  endDay,
  startLunch,
  endLunch,
  startShift,
  endShift
) {
  let nbOfAmos = getAmoNb(grid);
  let planningStart = getPlanningStart(grid);
  let planningEnd = getPlanningEnd(grid);

  let startDayHours = startDay.split(":")[0];
  if (startDayHours.startsWith(`0`)) {
    startDayHours = startDayHours[1];
  }

  let startDayMinutes = startDay.split(":")[1];
  if (startDayMinutes.startsWith(`0`)) {
    startDayMinutes = startDayMinutes[1];
  }

  let endDayHours = endDay.split(":")[0];
  if (endDayHours.startsWith(`0`)) {
    endDayHours = endDayHours[1];
  }

  let endDayMinutes = endDay.split(":")[1];
  if (endDayMinutes.startsWith(`0`)) {
    endDayMinutes = endDayMinutes[1];
  }

  let startLunchHours = startLunch.split(":")[0];
  if (startLunchHours.startsWith(`0`)) {
    startLunchHours = startLunchHours[1];
  }
  let startLunchMinutes = startDay.split(":")[1];
  if (startLunchMinutes.startsWith(`0`)) {
    startLunchMinutes = startLunchMinutes[1];
  }

  let endLunchHours = endLunch.split(":")[0];
  if (endLunchHours.startsWith(`0`)) {
    endLunchHours = endLunchHours[1];
  }
  let endLunchMinutes = startDay.split(":")[1];
  if (endLunchMinutes.startsWith(`0`)) {
    endLunchMinutes = endLunchMinutes[1];
  }

  let startShiftHours = startShift.split(":")[0];
  if (startShiftHours.startsWith(`0`)) {
    startShiftHours = startShiftHours[1];
  }
  let startShiftMinutes = startShift.split(":")[1];
  if (startShiftMinutes.startsWith(`0`)) {
    startShiftMinutes = startShiftMinutes[1];
  }

  let endShiftHours = endShift.split(":")[0];
  if (endShiftHours.startsWith(`0`)) {
    endShiftHours = endshiftHours[1];
  }
  let endShiftMinutes = startShift.split(":")[1];
  if (endShiftMinutes.startsWith(`0`)) {
    endShiftMinutes = endShiftMinutes[1];
  }

  let amosList = [];

  console.log(
    `\nmapList() : ${nbOfAmos} amos, planningStart: ${planningStart}, planningEnd: ${planningEnd}, nbSlots = ${
      (planningEnd - planningStart) / (pas * 1000)
    }`
  );

  // Start of planning must be end of shifts
  planningStart = moment(planningStart)
    .set("hour", startDayHours)
    .set("minutes", startDayMinutes)
    .utc();

  // End of planning must be end of shifts
  planningEnd = moment(planningEnd)
    .set("hour", endDayHours)
    .set("minutes", endDayMinutes)
    .utc();

  // Creation des listes chainees, une pour chaque AMO
  for (let i = 0; i < nbOfAmos; i++) {
    let newLinkedList = new LinkedList(i, planningStart, planningEnd, pas);
    let linkedListSize = (planningEnd - planningStart) / (pas * 1000);
    // console.log(`AMO ${i} linkedListSize : ${linkedListSize}`);

    // Remplissage de la data avec start, end et booked
    for (let j = 0; j < linkedListSize; j++) {
      let booked = isBooked(
        planningStart + j * pas * 1000,
        planningStart + (j + 1) * pas * 1000,
        startDayHours,
        endDayHours,
        startDayMinutes,
        endDayMinutes,
        startLunchHours,
        startLunchMinutes,
        endLunchHours,
        endLunchMinutes,
        startShiftHours,
        startShiftMinutes,
        endShiftHours,
        endShiftMinutes
      );

      newLinkedList.add({
        start: j * pas * 1000,
        end: (j + 1) * pas * 1000,
        booked: booked,
      });
    }

    amosList.push(newLinkedList);
  }

  // Remplissage des contraintes de chaque AMO
  for (let shift = 0; shift < grid.length; shift++) {
    for (let amo = 0; amo < grid[shift].length; amo++) {
      for (let slot = 0; slot < grid[shift][amo].length; slot++) {
        let node = amosList[amo].getNodeFromStart(
          planningStart,
          grid[shift][amo][slot].start
        );
        // console.log(`node : ${JSON.stringify(node)}`);
        node.data.booked = `@unavailable`;
      }
    }
  }
  //   console.log("fin");

  return amosList;
}

class Bt {
  constructor(amosList, pas) {
    this.amosList = amosList;
    this.pas = pas;
  }

  printAmos() {
    for (let i = 0; i < this.amosList.length; i++) {
      this.amosList[i].printList();
    }
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

  fit(pt, rdvLength, pas) {
    let opt = pt;
    let counter = 0;
    while (opt !== null && counter < rdvLength) {
      if (
        (opt.data.end - opt.data.start) / (pas * 1000) === 1 &&
        opt.data.booked === false
      ) {
        counter++;
      } else {
        break;
      }
      opt = opt.next;
    }
    if (counter === rdvLength) {
      return true;
    }
    return false;
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

  getPlacedPeople(alc) {
    let people = [];

    for (let amo = 0; amo < alc.length; amo++) {
      let ptr = alc[amo].head;
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

  ftRec(amoNb, alc, pt, people) {
    // console.log(JSON.stringify(people));
    if (people.length === 0) {
      console.log(`/!\\ END BACKTRACKING, PEOPLE = 0 /!\\`);
      // let placedPeople = this.getPlacedPeople(alc);
      // console.log(`placedPeople : ${JSON.stringify(placedPeople)}`);
      return alc;
    }

    if (pt === null || pt.next === null) {
      if (amoNb === alc.length - 1) {
        // throw new Error(
        //   `PAS DE SOLUTIION (impossible de placer ${people.length} personne(s))`
        // );
        return null;
      } else {
        amoNb++;
        pt = alc[amoNb].head;
      }
    }

    if (pt.data.booked !== false) {
      return this.ftRec(amoNb, alc, pt.next, people);
    }

    if (pt.next.data.booked !== false) {
      return this.ftRec(amoNb, alc, pt.next.next, people);
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

    let peopleSet = Array.from(new Set([...people]));
    for (let i = 0; i < peopleSet.length; i++) {
      if (peopleSet[i] > available) {
        continue;
      } else {
        let pc = [...people];
        let pplIdx = pc.indexOf(peopleSet[i]);
        pc.splice(pplIdx, 1);

        let alc2 = this.getAmosListCopy(alc);
        let nodeIdx = alc[amoNb].indexOf(pt.data);
        let nc = alc2[amoNb].getNodeAt(nodeIdx);
        let newPtr = this.fillRdv(peopleSet[i], nc);

        return this.ftRec(amoNb, alc2, newPtr, pc);
      }
    }
    return this.ftRec(amoNb, alc, pt.next, people);
  }

  getAvailabilities(alc) {
    let S = {};

    for (let amo = 0; amo < alc.length; amo++) {
      let ptr = alc[amo].head;
      let planningStart = alc[amo].planningStart;
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
    }
    return S;
  }

  isAlreadyFoundSolution(S1, rdvLength, start) {
    if (S1[rdvLength] === undefined) {
      return false;
    }
    if (S1[rdvLength].find((_) => _.start === start) !== undefined) {
      console.log(`\n--------------------> FOUND SOLUTIOIN !!!!!\n`);
      return true;
    }

    return false;
  }

  mergeSolutions(S1, S2) {
    for (const [key, value] of Object.entries(S2)) {
      if (S1[key] === undefined) S1[key] = [];
      for (let v = 0; v < value.length; v++) {
        if (S1[key].find((_) => _.start === value[v].start) === undefined) {
          S1[key].push(value[v]);
        }
      }
    }

    return S1;
  }

  giveAnswers(rdvLength, people) {
    let S = {};
    console.log(`giveAnswers() : ${rdvLength}`);

    let counter = 0;
    for (let amo = 0; amo < this.amosList.length; amo++) {
      let ptr = this.amosList[amo].head;
      let nodeCounter = 0;
      while (ptr !== null) {
        if (ptr.data.booked === false) {
          console.log(
            `> Test place ${rdvLength} pour amo ${amo} a ${ptr.data.start}`
          );
          if (
            this.fit(ptr, rdvLength, this.pas) &&
            !this.isAlreadyFoundSolution(
              S,
              rdvLength,
              this.amosList[amo].planningStart + ptr.data.start
            )
          ) {
            console.log(`Rdv ${rdvLength} DOES FIT`);
            let alc = this.getAmosListCopy(this.amosList);
            let nc = alc[amo].getNodeAt(nodeCounter);
            this.fillRdv(rdvLength, nc);
            let S1 = [];
            S1 = this.ftRec(0, alc, alc[0].head, [...people]);
            if (S1 === null) {
              console.log(`PAS DE SOLUTION`);
            } else {
              S = this.mergeSolutions(S, this.getAvailabilities(S1));
              // console.log(JSON.stringify(S));
            }
          } else {
            console.log(`Rdv ${rdvLength} DOES NOT FIT`);
          }
          // throw new Error(`STOP`);
          counter++;
        }

        ptr = ptr.next;
        nodeCounter += 1;
      }
    }
    console.log(`COUNTER : ${counter}`);

    return S;
  }
}

module.exports = { Bt, mapList };
