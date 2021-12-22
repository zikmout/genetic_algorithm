function* createRangeIterator(from, to) {
  while (from <= to) {
    yield from++;
  }
}

const range = [...createRangeIterator(2, 5)];
console.log(range);
