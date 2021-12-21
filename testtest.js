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

// const shuffle = (arr) =>
//   arr.reduceRight(
//     (r, _, __, s) => (
//       r.push(s.splice(0 | (Math.random() * s.length), 1)[0]), r
//     ),
//     []
//   );

console.log(JSON.stringify(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])));
