const moment = require("moment");

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
      //   console.log(JSON.stringify(data.start));
      if (currentNode.data.start === data.start) {
        // console.log(`OKOK ${data.next.start}`);
        console.log();
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

module.exports = { ListNode, LinkedList };
