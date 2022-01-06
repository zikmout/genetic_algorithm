const moment = require("moment");

const {
  ftGenetic,
  getAvailables,
  reducer,
  mapList,
  printGrid,
  copyGrid,
  shuffle,
  getAmoNb,
} = require("./linkAlgoUtils");

class Backtracking {
  constructor(planning) {
    this.planning = planning;
    this.setAllLengths = Array.from(new Set(this.planning.people));
    this.S1 = {};
  }

  getPlanning() {
    return this.planning;
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
      // console.log("pt.data.booked");
      // console.log(pt.data.booked);
      if (rdvLength === 0) {
        break;
      }
      pt = pt.next;
    }
    return pt;
  }

  goRec(amoNb, pt, people, S, pas) {
    // console.log(
    //   `people.length : ${
    //     people.length
    //   }, amoNb : ${amoNb}, pt : ${JSON.stringify(pt.data)}`
    // );
    let counter = 0;
    if (people.length === 0) {
      throw new Error(`OK. NO MORE PEOPLE TO PLACE`);
      return;
    }
    if (pt === null || pt.next === null) {
      if (amoNb === this.planning.amosList.length - 1) {
        console.log(`FINFIN`);
        return;
      } else {
        console.log(`amo++`);
        amoNb++;
        pt = this.planning.amosList[amoNb].head;
      }
    }

    // Si le prochain slot est booked, recursion
    if (pt.data.booked !== false) {
      return this.goRec(amoNb, pt.next, people, S, pas);
    }
    if (pt.next.data.booked !== false) {
      return this.goRec(amoNb, pt.next.next, people, S, pas);
    }

    // Verifie si il peut poser sinon recursion
    let originPt = pt;
    while (pt.next !== null) {
      if (pt.next.data.start !== pt.data.end) {
        return this.goRec(amoNb, pt.next, people, S, pas);
      } else {
        if (pt.data.booked === false) {
          counter += 1;
        } else {
          break;
        }
      }
      pt = pt.next;
    }

    // Il y a assez de place pour le rdv
    // Place le rendez-vous et recursion
    let setPeople = Array.from(new Set(shuffle([...people]))); //.sort(function (
    // a,
    // b
    // ) {
    // return b - a;
    // });
    for (let i = 0; i < setPeople.length; i++) {
      if (setPeople[i] <= counter) {
        console.log(`-> ${setPeople[i]} <= ${counter} (${people.length})`);
        let newPtr = this.fillRdv(setPeople[i], originPt);
        let pc = [];
        for (var j = 0; j < people.length; j++) pc[j] = people[j];
        let pplIdx = pc.indexOf(setPeople[j]);
        pc.splice(pplIdx, 1);
        return this.goRec(amoNb, newPtr.next, pc, S, pas);
      }
    }
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

  giveAnswers(rdvLength) {
    let start = new Date().getTime();
    console.log(`\nmargin : ${this.planning.getMargin()}\n`);

    let S = [];
    let ptr = null;
    let currentSlotPtr = this.planning.amosList[0].head;
    let planningStart = this.planning.amosList[0].planningStart;

    while (currentSlotPtr !== null) {
      // currentSlotPtr = this.planning.amosList[0].head;
      console.log(
        `Essai rdv ${moment(
          new Date(planningStart + currentSlotPtr.data.start)
        )}`
      );
      for (let amo = 0; amo < this.planning.amoNb; amo++) {
        ptr = this.planning.amosList[amo].head;
        // console.log(`\nAMO ${amo} (ptr : ${JSON.stringify(ptr.data)}})\n`);
        while (ptr !== null) {
          // console.log(`${ptr.data.start} === ${currentSlotPtr.data.start}`);
          if (ptr.data.start === currentSlotPtr.data.start) {
            // console.log(`ptr : ${JSON.stringify(ptr.data)}`);
            if (this.fit(ptr, rdvLength, this.planning.pas)) {
              console.log(`okay it fits !`);
              let newPtr = this.fillRdv(rdvLength, ptr);

              let pc = [];
              for (var i = 0; i < this.planning.people.length; i++)
                pc[i] = this.planning.people[i];
              let pplIdx = pc.indexOf(rdvLength);
              pc.splice(pplIdx, 1);

              // console.log(`ptr.data: ${JSON.stringify(ptr.data)}`);
              // printGrid(this.planning.grid);
              // throw new Error();
              // return this.goRec(amo, newPtr.next, pc, S, this.planning.pas);
              return this.goRec(
                0,
                this.planning.amosList[0].head,
                pc,
                S,
                this.planning.pas
              );
              // console.log(`S.lengthff : ${S.length}`);

              // throw new Error(`Fin de goRec()`);
            } else {
              // console.log(`DOES NOT fit`);
              break;
            }
          }
          ptr = ptr.next;
        }
        // console.log(`nok`);
      }

      currentSlotPtr = currentSlotPtr.next;
      // break;
    }

    // console.log(`ptr --> ${JSON.stringify(ptr)}`);
    // this.goRec(
    //   rdvLength,
    //   0,
    //   this.planning.amosList[0].head,
    //   this.planning.people,
    //   S,
    //   this.planning.pas
    // );
    // console.log(`S.length : ${S.length}`);

    // console.log(
    //   `\ngiveAnswer() : ${Math.round((new Date().getTime() - start) / 1000)}s`
    // );
  }

  solveRdv() {
    var S = [];
    for (let x = 0; x < this.setAllLengths.length; x++) {
      S = this.giveAnswers(setAllLengths[x]);
      S1[setAllLengths[x]] = S;
    }
  }
}

module.exports = { Backtracking };
