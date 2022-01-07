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
  LinkedList,
} = require("./linkAlgoUtils");

const { Planning } = require("./Planning");

class Backtracking {
  constructor(planning) {
    this.planning = planning;
    this.setAllLengths = Array.from(new Set([...this.planning.people]));
    this.S = {};
  }

  getPlanning() {
    return this.planning;
  }

  fillRdv(rdvLength, pt) {
    let ran = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 5);
    // console.log(`+ ${rdvLength}`);
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

  getAmosListCopy() {
    let amosList = [];
    for (let amo = 0; amo < this.planning.getAmosList().length; amo++) {
      let planningStart = this.planning.getAmosList()[amo].planningStart;
      let planningEnd = this.planning.getAmosList()[amo].planningEnd;

      let newLinkedList = new LinkedList(
        amo,
        planningStart,
        planningEnd,
        this.planning.pas
      );
      let linkedListSize =
        (planningEnd - planningStart) / (this.planning.pas * 1000);

      let ptr = this.planning.getAmosList()[amo].head;

      while (ptr !== null) {
        newLinkedList.add({
          start: ptr.data.start,
          end: ptr.data.end,
          booked: ptr.data.booked,
        });
        ptr = ptr.next;
      }

      amosList.push(newLinkedList);

      // console.log(
      //   `this.planning.getAmosList() : ${this.planning.getAmosList()[amo]}`
      // );
    }
    return amosList;
  }

  goRec(amoNb, pt, people, pas) {
    // console.log(`people enter : ${JSON.stringify(people.reduce(reducer))}`);
    // console.log(people.reduce(reducer));
    // console.log(
    //   `people.length : ${
    //     people.length
    //   }, amoNb : ${amoNb}, pt : ${JSON.stringify(pt.data)}`
    // );
    // console.log(`${JSON.stringify(people)}`);
    let amoSolutions = [];
    let counter = 0;
    if (people.length === 0) {
      console.log(`people : ${JSON.stringify(people)}`);
      this.S = this.planning.getSolutions();
      // console.log(this.planning.getSolutions());

      for (let amo = 0; amo < this.planning.getAmosList().length; amo++) {
        // console.log(`margin after : ${this.getAmosList()[amo].getMargin()}`);
        amoSolutions = amoSolutions.concat(
          this.planning.getSlotsForLength2(amo)
        );
      }
      console.log(amoSolutions.reduce(reducer));
      // throw new Error(`OK. NO MORE PEOPLE TO PLACE`);
      return;
    }
    if (pt === undefined || pt === null || pt.next === null) {
      if (amoNb === this.planning.amosList.length - 1) {
        // throw new Error(`PAS DE SOLUTIION`);
        console.log(`FINFIN : ${people.length}`);
        return;
      } else {
        // console.log(`amo++`);
        amoNb++;
        pt = this.planning.amosList[amoNb].head;
      }
    }

    // Si le prochain slot est booked, recursion
    if (pt.data.booked !== false) {
      let np = new Planning(
        this.planning.grid,
        this.planning.people,
        this.planning.pas,
        this.planning.startDay,
        this.planning.endDay,
        this.planning.startShift,
        this.planning.endShift,
        this.planning.startLunch,
        this.planning.endLunch,
        false
      );
      np.amosList = this.getAmosListCopy();
      let nb = new Backtracking(np);
      let idx = this.planning.getAmosList()[amoNb].indexOf(pt.next.data);
      let node = this.planning.getAmosList()[amoNb].getNodeAt(idx);
      return nb.goRec(amoNb, node.next, people, pas);
    }
    if (pt.next.data.booked !== false) {
      let np = new Planning(
        this.planning.grid,
        this.planning.people,
        this.planning.pas,
        this.planning.startDay,
        this.planning.endDay,
        this.planning.startShift,
        this.planning.endShift,
        this.planning.startLunch,
        this.planning.endLunch,
        false
      );
      np.amosList = this.getAmosListCopy();
      let nb = new Backtracking(np);
      let idx = this.planning.getAmosList()[amoNb].indexOf(pt.next.data);
      let node = this.planning.getAmosList()[amoNb].getNodeAt(idx);
      return nb.goRec(amoNb, node, people, pas);
    }

    // Verifie si il peut poser sinon recursion
    let originPt = pt;
    while (pt.next !== null) {
      if (pt.next.data.start !== pt.data.end) {
        let np = new Planning(
          this.planning.grid,
          this.planning.people,
          this.planning.pas,
          this.planning.startDay,
          this.planning.endDay,
          this.planning.startShift,
          this.planning.endShift,
          this.planning.startLunch,
          this.planning.endLunch,
          false
        );
        np.amosList = this.getAmosListCopy();
        let nb = new Backtracking(np);
        let idx = this.planning.getAmosList()[amoNb].indexOf(pt.next.data);
        let node = this.planning.getAmosList()[amoNb].getNodeAt(idx);

        nb.goRec(amoNb, node.next, people, pas);
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
        console.log(
          `->AMO ${amoNb} : ${setPeople[i]} <= ${counter} (${people.length})`
        );
        let newPtr = this.fillRdv(setPeople[i], originPt);
        // this.planning.amosList[amoNb].printList();
        let pc = [];
        for (var j = 0; j < people.length; j++) pc[j] = people[j];
        let pplIdx = pc.indexOf(setPeople[i]);
        pc.splice(pplIdx, 1);
        // console.log(
        //   `people before : ${people.reduce(
        //     reducer
        //   )}, people after : ${pc.reduce(reducer)}`
        // );
        // this.S = this.planning.getSolutions();
        // console.log(this.planning.getSolutions());

        // for (let amo = 0; amo < this.planning.getAmosList().length; amo++) {
        // console.log(`margin after : ${this.getAmosList()[amo].getMargin()}`);
        // amoSolutions = amoSolutions.concat(
        // this.planning.getSlotsForLength2(amo)
        // );
        // }
        // console.log(`sol --> ${amoSolutions.reduce(reducer)}`);
        let np = new Planning(
          this.planning.grid,
          this.planning.people,
          this.planning.pas,
          this.planning.startDay,
          this.planning.endDay,
          this.planning.startShift,
          this.planning.endShift,
          this.planning.startLunch,
          this.planning.endLunch,
          false
        );
        np.amosList = this.getAmosListCopy();
        let nb = new Backtracking(np);
        let idx = this.planning.getAmosList()[amoNb].indexOf(newPtr.next.data);
        let node = this.planning.getAmosList()[amoNb].getNodeAt(idx);
        // console.log(`node -> ${node.data}`);
        nb.goRec(amoNb, node, pc, pas);
      }
    }
    // return this.goRec(amoNb, originPt.next, people, pas);
    console.log(`dev`);
    let np = new Planning(
      this.planning.grid,
      this.planning.people,
      this.planning.pas,
      this.planning.startDay,
      this.planning.endDay,
      this.planning.startShift,
      this.planning.endShift,
      this.planning.startLunch,
      this.planning.endLunch,
      false
    );
    np.amosList = this.getAmosListCopy();
    let nb = new Backtracking(np);
    let idx = this.planning.getAmosList()[amoNb].indexOf(originPt.next.data);
    let node = this.planning.getAmosList()[amoNb].getNodeAt(idx);
    // console.log(`node -> ${node.data}`);
    return nb.goRec(amoNb, node, people, pas);
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

  isAlreadyFoundSolution(S1, rdvLength, start) {
    if (S1[rdvLength] === undefined) {
      return false;
    }

    // console.log(Object.keys(S1));
    // console.log(start);
    // console.log(S1[rdvLength].find((_) => _.start === start));
    if (S1[rdvLength].find((_) => _.start === start) !== undefined) {
      // console.log(`FOUND SOLUTION`);
      return true;
    }

    return false;
  }
  // 1636561800000
  giveAnswers(S1, rdvLength) {
    let start = new Date().getTime();
    // console.log(`\nmargin : ${this.planning.getMargin()}\n`);

    let S = {};
    let ptr = null;
    let currentSlotPtr = this.planning.amosList[0].head;
    let planningStart = this.planning.amosList[0].planningStart;

    while (currentSlotPtr !== null) {
      // currentSlotPtr = this.planning.amosList[0].head;
      // console.log(
      //   `Essai rdv ${moment(
      //     new Date(planningStart + currentSlotPtr.data.start)
      //   )}`
      // );
      for (let amo = 0; amo < this.planning.amoNb; amo++) {
        ptr = this.planning.amosList[amo].head;
        // console.log(`\nAMO ${amo} (ptr : ${JSON.stringify(ptr.data)}})\n`);
        while (ptr !== null) {
          // console.log(`${ptr.data.start} === ${currentSlotPtr.data.start}`);
          if (ptr.data.start === currentSlotPtr.data.start) {
            // console.log(`ptr : ${JSON.stringify(ptr.data)}`);
            if (
              this.fit(ptr, rdvLength, this.planning.pas) &&
              !this.isAlreadyFoundSolution(
                S1,
                rdvLength,
                this.planning.amosList[amo].planningStart + ptr.data.start
              )
            ) {
              // console.log(`okay it fits !`);
              let newPtr = this.fillRdv(rdvLength, ptr);

              let pc = [];
              for (var i = 0; i < this.planning.people.length; i++)
                pc[i] = this.planning.people[i];
              let pplIdx = pc.indexOf(rdvLength);
              pc.splice(pplIdx, 1);

              // console.log(`ptr.data: ${JSON.stringify(ptr.data)}`);
              // printGrid(this.planning.grid);
              // throw new Error();
              // this.goRec(amo, newPtr.next, pc, S, this.planning.pas);

              this.goRec(
                0,
                this.planning.amosList[0].head,
                pc,
                this.planning.pas
              );
              // console.log(`this.S = ${JSON.stringify(Object.keys(this.S))}`);

              throw new Error("FIN goRec()");
              // return;

              for (const [key, value] of Object.entries(this.S)) {
                if (S[key] === undefined) S[key] = [];
                for (let v = 0; v < value.length; v++) {
                  if (
                    S[key].find((_) => _.start === value[v].start) === undefined
                  ) {
                    S[key].push(value[v]);
                  }
                }
              }

              this.planning.cleanAmoLists();
              this.S = {};

              // throw new Error("fin premier fit");
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
    return S;
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

  solveRdv() {
    var S1 = {};
    for (let x = 0; x < this.setAllLengths.length; x++) {
      let S2 = this.giveAnswers(S1, this.setAllLengths[x]);
      S1 = this.mergeSolutions(S1, S2);
      // console.log(`S = ${JSON.stringify(Object.keys(S))}`);
      // S1[setAllLengths[x]] = S;
    }
    Object.keys(S1).forEach((obj) => {
      S1[obj] = S1[obj].sort(function (a, b) {
        return a.start - b.start;
      });
    });
    // console.log(S1);
  }
}

module.exports = { Backtracking };
