const moment = require("moment");

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
    while (!!currentNode.next) {
      currentNode = currentNode.next;
      console.log(
        `${moment
          .utc(planningStart + currentNode.data.start)
          .format("DD/MM HH:mm")}  -  ${moment
          .utc(planningStart + currentNode.data.end)
          .format("DD/MM HH:mm")}    :    ${currentNode.data.booked}`
      );
    }
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

  indexOf(data) {
    let currentNode = this.head;
    let index = 0;
    while (!!currentNode) {
      if (currentNode.data === data) {
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

function mapList(grid, pas) {
  let nbOfAmos = getAmoNb(grid);
  let planningStart = getPlanningStart(grid);
  let planningEnd = getPlanningEnd(grid);
  let amoLists = [];
  console.log(
    `mapList() : ${nbOfAmos} amos, planningStart: ${planningStart}, planningEnd: ${planningEnd}, nbSlots = ${
      (planningEnd - planningStart) / (pas * 1000)
    }`
  );

  // Creation des listes chainees, une pour chaque AMO
  for (let i = 0; i < nbOfAmos; i++) {
    let newLinkedList = new LinkedList(i, planningStart, planningEnd, pas);
    let linkedListSize = (planningEnd - planningStart) / (pas * 1000);
    console.log(`linkedListSize : ${linkedListSize}`);
    for (let j = 0; j < linkedListSize; j++) {
      newLinkedList.add({
        start: j * pas * 1000,
        end: (j + 1) * pas * 1000,
        booked: false,
      });
    }
    amoLists.push(newLinkedList);
  }

  // Remplissage des liste chainees

  return amoLists;
}

module.exports = { LinkedList, ListNode, getAvailables, reducer, mapList };
