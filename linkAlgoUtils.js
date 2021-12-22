// Implementation de l'algorithme en listes chainees

class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
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
