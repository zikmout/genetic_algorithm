// Implementation de l'algorithme en listes chainees

class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor(amo) {
    this.head = null;
    this.size = 0;
    this.amo = amo;
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
