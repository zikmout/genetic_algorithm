const moment = require("moment");
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
            .format("DD/MM HH:mm")}    :    ${_shifts[shift][amo][slot].booked}`
        );
      }
    }
  }
  console.log(
    `\n\n###############################################################################################################\n\n`
  );
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
const reducer = (accumulator, currentValue) => accumulator + currentValue;
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
// Implementation de l'algorithme en listes chainees

class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor(amo, planningStart, planningEnd, pas) {
    this.head = null;
    this.amo = amo;
    this.planningStart = planningStart;
    this.planningEnd = planningEnd;
    this.pas = pas;
    this.size = 0;
  }

  add(data) {
    let newNode = new ListNode(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (!!currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }
    this.size++;
  }

  printList() {
    let planningStart = this.planningStart;
    let planningEnd = this.planningEnd;
    let currentNode = this.head;
    let counter = 0;
    while (!!currentNode) {
      counter++;
      if (counter === 500) {
        return;
      }
      console.log(
        `${moment
          .utc(planningStart + currentNode.data.start)
          .format("DD/MM HH:mm")}  -  ${moment
          .utc(planningStart + currentNode.data.end)
          .format("DD/MM HH:mm")}    :    ${currentNode.data.booked}`
      );
      currentNode = currentNode.next;
    }
  }

  getMargin() {
    let counter = 0;
    let currentNode = this.head;
    while (!!currentNode) {
      //   console.log(`ezf`);
      if (currentNode.data.booked === false) {
        counter = counter + 1;
      }
      currentNode = currentNode.next;
    }
    return counter;
  }

  getNodeAt(index) {
    if (index < 0 || index > this.size - 1) {
      return undefined;
    } else {
      let currentNode = this.head;
      for (let i = 0; i < index; i++) {
        currentNode = currentNode.next;
      }
      return currentNode;
    }
  }

  removeFrom(index) {
    if (index < 0 || index > this.size - 1) {
      return undefined;
    } else {
      let currentNode = this.head;
      if (index === 0) {
        this.head = currentNode.next;
      } else {
        let previousNode;
        for (let i = 0; i < index; i++) {
          previousNode = currentNode;
          currentNode = currentNode.next;
        }
        previousNode.next = currentNode.next;
      }
      this.size--;
      return currentNode.data;
    }
  }

  removeNode(data) {
    let currentNode = this.head;
    let previousNode;
    while (!!currentNode) {
      if (currentNode.data === data) {
        if (previousNode) {
          previousNode.next = currentNode.next;
        } else {
          this.head = currentNode.next;
        }
        this.size--;
        return currentNode.data;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    return undefined;
  }

  insertAt(index, data) {
    if (index < 0 || index > this.size - 1) {
      return undefined;
    } else {
      let newNode = new ListNode(data);
      if (index === 0) {
        newNode.next = this.head;
        this.head = newNode;
      } else {
        let currentNode = this.head;
        let previousNode;
        for (let i = 0; i < index; i++) {
          previousNode = currentNode;
          currentNode = currentNode.next;
        }
        previousNode.next = newNode;
        mewNode.next = currentNode;
      }
      this.size++;
    }
  }

  getNodeFromStart(planningStart, start) {
    let currentNode = this.head;
    while (!!currentNode) {
      //   console.log(`currentNode.data.start : ${currentNode.data.start}`);
      if (planningStart + currentNode.data.start === start) {
        // console.log("top");
        return currentNode;
      } else {
        currentNode = currentNode.next;
      }
    }
    return undefined;
  }

  indexOf(data) {
    let currentNode = this.head;
    let index = 0;
    while (!!currentNode) {
      if (JSON.stringify(currentNode.data) === JSON.stringify(data)) {
        return index;
      } else {
        currentNode = currentNode.next;
        index++;
      }
    }
    return -1;
  }

  clear() {
    this.head = null;
    this.size = 0;
  }
}

function mapSort(linkedList) {
  var sortedList = [];
  var map = new Map();
  var currentId = null;

  // index the linked list by previous_item_id
  for (var i = 0; i < linkedList.length; i++) {
    var item = linkedList[i];
    if (item.previous_item_id === null) {
      // first item
      currentId = item.item_id;
      sortedList.push(item);
    } else {
      map.set(item.previous_item_id, i);
    }
  }

  while (sortedList.length < linkedList.length) {
    // get the item with a previous item ID referencing the current item
    var nextItem = linkedList[map.get(currentId)];
    sortedList.push(nextItem);
    currentId = nextItem.item_id;
  }

  return sortedList;
}

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
    `mapList() : ${nbOfAmos} amos, planningStart: ${planningStart}, planningEnd: ${planningEnd}, nbSlots = ${
      (planningEnd - planningStart) / (pas * 1000)
    }\n\n`
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

module.exports = {
  LinkedList,
  ListNode,
  getAvailables,
  reducer,
  mapList,
  printGrid,
  copyGrid,
  shuffle,
  getAmoNb,
};
