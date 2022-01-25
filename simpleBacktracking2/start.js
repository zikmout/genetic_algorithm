const moment = require("moment");
const { LinkedList, ListNode } = require("./LinkedList");

let grid = [
  [
    [
      { start: 1635751800000, end: 1635753600000, booked: "@zak" },
      { start: 1635753600000, end: 1635755400000, booked: "@zak" },
      { start: 1635755400000, end: 1635757200000, booked: false },
      { start: 1635757200000, end: 1635759000000, booked: false },
      { start: 1635759000000, end: 1635760800000, booked: false },
      { start: 1635760800000, end: 1635762600000, booked: false },
      { start: 1635762600000, end: 1635764400000, booked: false },
      { start: 1635764400000, end: 1635766200000, booked: false },
    ],
    [
      { start: 1635751800000, end: 1635753600000, booked: false },
      { start: 1635753600000, end: 1635755400000, booked: false },
      { start: 1635755400000, end: 1635757200000, booked: false },
      { start: 1635757200000, end: 1635759000000, booked: false },
      { start: 1635759000000, end: 1635760800000, booked: false },
      { start: 1635760800000, end: 1635762600000, booked: false },
      { start: 1635762600000, end: 1635764400000, booked: false },
      { start: 1635764400000, end: 1635766200000, booked: false },
    ],
    [
      { start: 1635751800000, end: 1635753600000, booked: false },
      { start: 1635753600000, end: 1635755400000, booked: false },
      { start: 1635755400000, end: 1635757200000, booked: false },
      { start: 1635757200000, end: 1635759000000, booked: false },
      { start: 1635759000000, end: 1635760800000, booked: false },
      { start: 1635760800000, end: 1635762600000, booked: false },
      { start: 1635762600000, end: 1635764400000, booked: false },
      { start: 1635764400000, end: 1635766200000, booked: false },
    ],
  ],
  [
    [
      { start: 1635769800000, end: 1635771600000, booked: false },
      { start: 1635771600000, end: 1635773400000, booked: false },
      { start: 1635773400000, end: 1635775200000, booked: false },
      { start: 1635775200000, end: 1635777000000, booked: false },
      { start: 1635777000000, end: 1635778800000, booked: false },
      { start: 1635778800000, end: 1635780600000, booked: false },
      { start: 1635780600000, end: 1635782400000, booked: false },
      { start: 1635782400000, end: 1635784200000, booked: false },
      { start: 1635784200000, end: 1635786000000, booked: false },
      { start: 1635786000000, end: 1635787800000, booked: false },
    ],
    [
      { start: 1635769800000, end: 1635771600000, booked: false },
      { start: 1635771600000, end: 1635773400000, booked: false },
      { start: 1635773400000, end: 1635775200000, booked: false },
      { start: 1635775200000, end: 1635777000000, booked: false },
      { start: 1635777000000, end: 1635778800000, booked: false },
      { start: 1635778800000, end: 1635780600000, booked: false },
      { start: 1635780600000, end: 1635782400000, booked: false },
      { start: 1635782400000, end: 1635784200000, booked: false },
      { start: 1635784200000, end: 1635786000000, booked: false },
      { start: 1635786000000, end: 1635787800000, booked: false },
    ],
    [
      { start: 1635769800000, end: 1635771600000, booked: false },
      { start: 1635771600000, end: 1635773400000, booked: false },
      { start: 1635773400000, end: 1635775200000, booked: false },
      { start: 1635775200000, end: 1635777000000, booked: false },
      { start: 1635777000000, end: 1635778800000, booked: false },
      { start: 1635778800000, end: 1635780600000, booked: false },
      { start: 1635780600000, end: 1635782400000, booked: false },
      { start: 1635782400000, end: 1635784200000, booked: false },
      { start: 1635784200000, end: 1635786000000, booked: false },
      { start: 1635786000000, end: 1635787800000, booked: false },
    ],
  ],
  [
    [
      { start: 1635838200000, end: 1635840000000, booked: false },
      { start: 1635840000000, end: 1635841800000, booked: false },
      { start: 1635841800000, end: 1635843600000, booked: false },
      { start: 1635843600000, end: 1635845400000, booked: false },
      { start: 1635845400000, end: 1635847200000, booked: false },
      { start: 1635847200000, end: 1635849000000, booked: false },
      { start: 1635849000000, end: 1635850800000, booked: false },
      { start: 1635850800000, end: 1635852600000, booked: false },
    ],
    [
      { start: 1635838200000, end: 1635840000000, booked: false },
      { start: 1635840000000, end: 1635841800000, booked: false },
      { start: 1635841800000, end: 1635843600000, booked: false },
      { start: 1635843600000, end: 1635845400000, booked: false },
      { start: 1635845400000, end: 1635847200000, booked: false },
      { start: 1635847200000, end: 1635849000000, booked: false },
      { start: 1635849000000, end: 1635850800000, booked: false },
      { start: 1635850800000, end: 1635852600000, booked: false },
    ],
    [
      { start: 1635838200000, end: 1635840000000, booked: false },
      { start: 1635840000000, end: 1635841800000, booked: false },
      { start: 1635841800000, end: 1635843600000, booked: false },
      { start: 1635843600000, end: 1635845400000, booked: false },
      { start: 1635845400000, end: 1635847200000, booked: false },
      { start: 1635847200000, end: 1635849000000, booked: false },
      { start: 1635849000000, end: 1635850800000, booked: false },
      { start: 1635850800000, end: 1635852600000, booked: false },
    ],
  ],
  [
    [
      { start: 1635856200000, end: 1635858000000, booked: false },
      { start: 1635858000000, end: 1635859800000, booked: false },
      { start: 1635859800000, end: 1635861600000, booked: false },
      { start: 1635861600000, end: 1635863400000, booked: false },
      { start: 1635863400000, end: 1635865200000, booked: false },
      { start: 1635865200000, end: 1635867000000, booked: false },
      { start: 1635867000000, end: 1635868800000, booked: false },
      { start: 1635868800000, end: 1635870600000, booked: false },
      { start: 1635870600000, end: 1635872400000, booked: false },
      { start: 1635872400000, end: 1635874200000, booked: false },
    ],
    [
      { start: 1635856200000, end: 1635858000000, booked: false },
      { start: 1635858000000, end: 1635859800000, booked: false },
      { start: 1635859800000, end: 1635861600000, booked: false },
      { start: 1635861600000, end: 1635863400000, booked: false },
      { start: 1635863400000, end: 1635865200000, booked: false },
      { start: 1635865200000, end: 1635867000000, booked: false },
      { start: 1635867000000, end: 1635868800000, booked: false },
      { start: 1635868800000, end: 1635870600000, booked: false },
      { start: 1635870600000, end: 1635872400000, booked: false },
      { start: 1635872400000, end: 1635874200000, booked: false },
    ],
    [
      { start: 1635856200000, end: 1635858000000, booked: false },
      { start: 1635858000000, end: 1635859800000, booked: false },
      { start: 1635859800000, end: 1635861600000, booked: false },
      { start: 1635861600000, end: 1635863400000, booked: false },
      { start: 1635863400000, end: 1635865200000, booked: false },
      { start: 1635865200000, end: 1635867000000, booked: false },
      { start: 1635867000000, end: 1635868800000, booked: false },
      { start: 1635868800000, end: 1635870600000, booked: false },
      { start: 1635870600000, end: 1635872400000, booked: false },
      { start: 1635872400000, end: 1635874200000, booked: false },
    ],
  ],
  [
    [
      { start: 1635924600000, end: 1635926400000, booked: false },
      { start: 1635926400000, end: 1635928200000, booked: false },
      { start: 1635928200000, end: 1635930000000, booked: false },
      { start: 1635930000000, end: 1635931800000, booked: false },
      { start: 1635931800000, end: 1635933600000, booked: false },
      { start: 1635933600000, end: 1635935400000, booked: false },
      { start: 1635935400000, end: 1635937200000, booked: false },
      { start: 1635937200000, end: 1635939000000, booked: false },
    ],
  ],
  [
    [
      { start: 1635942600000, end: 1635944400000, booked: false },
      { start: 1635944400000, end: 1635946200000, booked: false },
      { start: 1635946200000, end: 1635948000000, booked: false },
      { start: 1635948000000, end: 1635949800000, booked: false },
      { start: 1635949800000, end: 1635951600000, booked: false },
      { start: 1635951600000, end: 1635953400000, booked: false },
      { start: 1635953400000, end: 1635955200000, booked: false },
      { start: 1635955200000, end: 1635957000000, booked: false },
      { start: 1635957000000, end: 1635958800000, booked: false },
      { start: 1635958800000, end: 1635960600000, booked: false },
    ],
  ],
  [
    [
      { start: 1636011000000, end: 1636012800000, booked: false },
      { start: 1636012800000, end: 1636014600000, booked: false },
      { start: 1636014600000, end: 1636016400000, booked: false },
      { start: 1636016400000, end: 1636018200000, booked: false },
      { start: 1636018200000, end: 1636020000000, booked: false },
      { start: 1636020000000, end: 1636021800000, booked: false },
      { start: 1636021800000, end: 1636023600000, booked: false },
      { start: 1636023600000, end: 1636025400000, booked: false },
    ],
    [
      { start: 1636011000000, end: 1636012800000, booked: false },
      { start: 1636012800000, end: 1636014600000, booked: false },
      { start: 1636014600000, end: 1636016400000, booked: false },
      { start: 1636016400000, end: 1636018200000, booked: false },
      { start: 1636018200000, end: 1636020000000, booked: false },
      { start: 1636020000000, end: 1636021800000, booked: false },
      { start: 1636021800000, end: 1636023600000, booked: false },
      { start: 1636023600000, end: 1636025400000, booked: false },
    ],
  ],
  [
    [
      { start: 1636029000000, end: 1636030800000, booked: false },
      { start: 1636030800000, end: 1636032600000, booked: false },
      { start: 1636032600000, end: 1636034400000, booked: false },
      { start: 1636034400000, end: 1636036200000, booked: false },
      { start: 1636036200000, end: 1636038000000, booked: false },
      { start: 1636038000000, end: 1636039800000, booked: false },
      { start: 1636039800000, end: 1636041600000, booked: false },
      { start: 1636041600000, end: 1636043400000, booked: false },
      { start: 1636043400000, end: 1636045200000, booked: false },
      { start: 1636045200000, end: 1636047000000, booked: false },
    ],
    [
      { start: 1636029000000, end: 1636030800000, booked: false },
      { start: 1636030800000, end: 1636032600000, booked: false },
      { start: 1636032600000, end: 1636034400000, booked: false },
      { start: 1636034400000, end: 1636036200000, booked: false },
      { start: 1636036200000, end: 1636038000000, booked: false },
      { start: 1636038000000, end: 1636039800000, booked: false },
      { start: 1636039800000, end: 1636041600000, booked: false },
      { start: 1636041600000, end: 1636043400000, booked: false },
      { start: 1636043400000, end: 1636045200000, booked: false },
      { start: 1636045200000, end: 1636047000000, booked: false },
    ],
  ],
  [
    [
      { start: 1636097400000, end: 1636099200000, booked: false },
      { start: 1636099200000, end: 1636101000000, booked: false },
      { start: 1636101000000, end: 1636102800000, booked: false },
      { start: 1636102800000, end: 1636104600000, booked: false },
      { start: 1636104600000, end: 1636106400000, booked: false },
      { start: 1636106400000, end: 1636108200000, booked: false },
      { start: 1636108200000, end: 1636110000000, booked: false },
      { start: 1636110000000, end: 1636111800000, booked: false },
    ],
    [
      { start: 1636097400000, end: 1636099200000, booked: false },
      { start: 1636099200000, end: 1636101000000, booked: false },
      { start: 1636101000000, end: 1636102800000, booked: false },
      { start: 1636102800000, end: 1636104600000, booked: false },
      { start: 1636104600000, end: 1636106400000, booked: false },
      { start: 1636106400000, end: 1636108200000, booked: false },
      { start: 1636108200000, end: 1636110000000, booked: false },
      { start: 1636110000000, end: 1636111800000, booked: false },
    ],
  ],
  [
    [
      { start: 1636115400000, end: 1636117200000, booked: false },
      { start: 1636117200000, end: 1636119000000, booked: false },
      { start: 1636119000000, end: 1636120800000, booked: false },
      { start: 1636120800000, end: 1636122600000, booked: false },
      { start: 1636122600000, end: 1636124400000, booked: false },
      { start: 1636124400000, end: 1636126200000, booked: false },
      { start: 1636126200000, end: 1636128000000, booked: false },
      { start: 1636128000000, end: 1636129800000, booked: false },
      { start: 1636129800000, end: 1636131600000, booked: false },
      { start: 1636131600000, end: 1636133400000, booked: false },
    ],
    [
      { start: 1636115400000, end: 1636117200000, booked: false },
      { start: 1636117200000, end: 1636119000000, booked: false },
      { start: 1636119000000, end: 1636120800000, booked: false },
      { start: 1636120800000, end: 1636122600000, booked: false },
      { start: 1636122600000, end: 1636124400000, booked: false },
      { start: 1636124400000, end: 1636126200000, booked: false },
      { start: 1636126200000, end: 1636128000000, booked: false },
      { start: 1636128000000, end: 1636129800000, booked: false },
      { start: 1636129800000, end: 1636131600000, booked: false },
      { start: 1636131600000, end: 1636133400000, booked: false },
    ],
  ],
  [
    [
      { start: 1636356600000, end: 1636358400000, booked: false },
      { start: 1636358400000, end: 1636360200000, booked: false },
      { start: 1636360200000, end: 1636362000000, booked: false },
      { start: 1636362000000, end: 1636363800000, booked: false },
      { start: 1636363800000, end: 1636365600000, booked: false },
      { start: 1636365600000, end: 1636367400000, booked: false },
      { start: 1636367400000, end: 1636369200000, booked: false },
      { start: 1636369200000, end: 1636371000000, booked: false },
    ],
    [
      { start: 1636356600000, end: 1636358400000, booked: false },
      { start: 1636358400000, end: 1636360200000, booked: false },
      { start: 1636360200000, end: 1636362000000, booked: false },
      { start: 1636362000000, end: 1636363800000, booked: false },
      { start: 1636363800000, end: 1636365600000, booked: false },
      { start: 1636365600000, end: 1636367400000, booked: false },
      { start: 1636367400000, end: 1636369200000, booked: false },
      { start: 1636369200000, end: 1636371000000, booked: false },
    ],
    [
      { start: 1636356600000, end: 1636358400000, booked: false },
      { start: 1636358400000, end: 1636360200000, booked: false },
      { start: 1636360200000, end: 1636362000000, booked: false },
      { start: 1636362000000, end: 1636363800000, booked: false },
      { start: 1636363800000, end: 1636365600000, booked: false },
      { start: 1636365600000, end: 1636367400000, booked: false },
      { start: 1636367400000, end: 1636369200000, booked: false },
      { start: 1636369200000, end: 1636371000000, booked: false },
    ],
    [
      { start: 1636356600000, end: 1636358400000, booked: false },
      { start: 1636358400000, end: 1636360200000, booked: false },
      { start: 1636360200000, end: 1636362000000, booked: false },
      { start: 1636362000000, end: 1636363800000, booked: false },
      { start: 1636363800000, end: 1636365600000, booked: false },
      { start: 1636365600000, end: 1636367400000, booked: false },
      { start: 1636367400000, end: 1636369200000, booked: false },
      { start: 1636369200000, end: 1636371000000, booked: false },
    ],
  ],
  [
    [
      { start: 1636374600000, end: 1636376400000, booked: false },
      { start: 1636376400000, end: 1636378200000, booked: false },
      { start: 1636378200000, end: 1636380000000, booked: false },
      { start: 1636380000000, end: 1636381800000, booked: false },
      { start: 1636381800000, end: 1636383600000, booked: false },
      { start: 1636383600000, end: 1636385400000, booked: false },
      { start: 1636385400000, end: 1636387200000, booked: false },
      { start: 1636387200000, end: 1636389000000, booked: false },
      { start: 1636389000000, end: 1636390800000, booked: false },
      { start: 1636390800000, end: 1636392600000, booked: false },
    ],
    [
      { start: 1636374600000, end: 1636376400000, booked: false },
      { start: 1636376400000, end: 1636378200000, booked: false },
      { start: 1636378200000, end: 1636380000000, booked: false },
      { start: 1636380000000, end: 1636381800000, booked: false },
      { start: 1636381800000, end: 1636383600000, booked: false },
      { start: 1636383600000, end: 1636385400000, booked: false },
      { start: 1636385400000, end: 1636387200000, booked: false },
      { start: 1636387200000, end: 1636389000000, booked: false },
      { start: 1636389000000, end: 1636390800000, booked: false },
      { start: 1636390800000, end: 1636392600000, booked: false },
    ],
    [
      { start: 1636374600000, end: 1636376400000, booked: false },
      { start: 1636376400000, end: 1636378200000, booked: false },
      { start: 1636378200000, end: 1636380000000, booked: false },
      { start: 1636380000000, end: 1636381800000, booked: false },
      { start: 1636381800000, end: 1636383600000, booked: false },
      { start: 1636383600000, end: 1636385400000, booked: false },
      { start: 1636385400000, end: 1636387200000, booked: false },
      { start: 1636387200000, end: 1636389000000, booked: false },
      { start: 1636389000000, end: 1636390800000, booked: false },
      { start: 1636390800000, end: 1636392600000, booked: false },
    ],
    [
      { start: 1636374600000, end: 1636376400000, booked: false },
      { start: 1636376400000, end: 1636378200000, booked: false },
      { start: 1636378200000, end: 1636380000000, booked: false },
      { start: 1636380000000, end: 1636381800000, booked: false },
      { start: 1636381800000, end: 1636383600000, booked: false },
      { start: 1636383600000, end: 1636385400000, booked: false },
      { start: 1636385400000, end: 1636387200000, booked: false },
      { start: 1636387200000, end: 1636389000000, booked: false },
      { start: 1636389000000, end: 1636390800000, booked: false },
      { start: 1636390800000, end: 1636392600000, booked: false },
    ],
  ],
  [
    [
      { start: 1636443000000, end: 1636444800000, booked: false },
      { start: 1636444800000, end: 1636446600000, booked: false },
      { start: 1636446600000, end: 1636448400000, booked: false },
      { start: 1636448400000, end: 1636450200000, booked: false },
      { start: 1636450200000, end: 1636452000000, booked: false },
      { start: 1636452000000, end: 1636453800000, booked: false },
      { start: 1636453800000, end: 1636455600000, booked: false },
      { start: 1636455600000, end: 1636457400000, booked: false },
    ],
  ],
  [
    [
      { start: 1636461000000, end: 1636462800000, booked: false },
      { start: 1636462800000, end: 1636464600000, booked: false },
      { start: 1636464600000, end: 1636466400000, booked: false },
      { start: 1636466400000, end: 1636468200000, booked: false },
      { start: 1636468200000, end: 1636470000000, booked: false },
      { start: 1636470000000, end: 1636471800000, booked: false },
      { start: 1636471800000, end: 1636473600000, booked: false },
      { start: 1636473600000, end: 1636475400000, booked: false },
      { start: 1636475400000, end: 1636477200000, booked: false },
      { start: 1636477200000, end: 1636479000000, booked: false },
    ],
  ],
  [
    [
      { start: 1636529400000, end: 1636531200000, booked: false },
      { start: 1636531200000, end: 1636533000000, booked: false },
      { start: 1636533000000, end: 1636534800000, booked: false },
      { start: 1636534800000, end: 1636536600000, booked: false },
      { start: 1636536600000, end: 1636538400000, booked: false },
      { start: 1636538400000, end: 1636540200000, booked: false },
      { start: 1636540200000, end: 1636542000000, booked: false },
      { start: 1636542000000, end: 1636543800000, booked: false },
    ],
  ],
  [
    [
      { start: 1636547400000, end: 1636549200000, booked: false },
      { start: 1636549200000, end: 1636551000000, booked: false },
      { start: 1636551000000, end: 1636552800000, booked: false },
      { start: 1636552800000, end: 1636554600000, booked: false },
      { start: 1636554600000, end: 1636556400000, booked: false },
      { start: 1636556400000, end: 1636558200000, booked: false },
      { start: 1636558200000, end: 1636560000000, booked: false },
      { start: 1636560000000, end: 1636561800000, booked: false },
      { start: 1636561800000, end: 1636563600000, booked: false },
      { start: 1636563600000, end: 1636565400000, booked: false },
    ],
  ],
  [
    [
      { start: 1636615800000, end: 1636617600000, booked: false },
      { start: 1636617600000, end: 1636619400000, booked: false },
      { start: 1636619400000, end: 1636621200000, booked: false },
      { start: 1636621200000, end: 1636623000000, booked: false },
      { start: 1636623000000, end: 1636624800000, booked: false },
      { start: 1636624800000, end: 1636626600000, booked: false },
      { start: 1636626600000, end: 1636628400000, booked: false },
      { start: 1636628400000, end: 1636630200000, booked: false },
    ],
    [
      { start: 1636615800000, end: 1636617600000, booked: false },
      { start: 1636617600000, end: 1636619400000, booked: false },
      { start: 1636619400000, end: 1636621200000, booked: false },
      { start: 1636621200000, end: 1636623000000, booked: false },
      { start: 1636623000000, end: 1636624800000, booked: false },
      { start: 1636624800000, end: 1636626600000, booked: false },
      { start: 1636626600000, end: 1636628400000, booked: false },
      { start: 1636628400000, end: 1636630200000, booked: false },
    ],
    [
      { start: 1636615800000, end: 1636617600000, booked: false },
      { start: 1636617600000, end: 1636619400000, booked: false },
      { start: 1636619400000, end: 1636621200000, booked: false },
      { start: 1636621200000, end: 1636623000000, booked: false },
      { start: 1636623000000, end: 1636624800000, booked: false },
      { start: 1636624800000, end: 1636626600000, booked: false },
      { start: 1636626600000, end: 1636628400000, booked: false },
      { start: 1636628400000, end: 1636630200000, booked: false },
    ],
  ],
  [
    [
      { start: 1636633800000, end: 1636635600000, booked: false },
      { start: 1636635600000, end: 1636637400000, booked: false },
      { start: 1636637400000, end: 1636639200000, booked: false },
      { start: 1636639200000, end: 1636641000000, booked: false },
      { start: 1636641000000, end: 1636642800000, booked: false },
      { start: 1636642800000, end: 1636644600000, booked: false },
      { start: 1636644600000, end: 1636646400000, booked: false },
      { start: 1636646400000, end: 1636648200000, booked: false },
      { start: 1636648200000, end: 1636650000000, booked: false },
      { start: 1636650000000, end: 1636651800000, booked: false },
    ],
    [
      { start: 1636633800000, end: 1636635600000, booked: false },
      { start: 1636635600000, end: 1636637400000, booked: false },
      { start: 1636637400000, end: 1636639200000, booked: false },
      { start: 1636639200000, end: 1636641000000, booked: false },
      { start: 1636641000000, end: 1636642800000, booked: false },
      { start: 1636642800000, end: 1636644600000, booked: false },
      { start: 1636644600000, end: 1636646400000, booked: false },
      { start: 1636646400000, end: 1636648200000, booked: false },
      { start: 1636648200000, end: 1636650000000, booked: false },
      { start: 1636650000000, end: 1636651800000, booked: false },
    ],
    [
      { start: 1636633800000, end: 1636635600000, booked: false },
      { start: 1636635600000, end: 1636637400000, booked: false },
      { start: 1636637400000, end: 1636639200000, booked: false },
      { start: 1636639200000, end: 1636641000000, booked: false },
      { start: 1636641000000, end: 1636642800000, booked: false },
      { start: 1636642800000, end: 1636644600000, booked: false },
      { start: 1636644600000, end: 1636646400000, booked: false },
      { start: 1636646400000, end: 1636648200000, booked: false },
      { start: 1636648200000, end: 1636650000000, booked: false },
      { start: 1636650000000, end: 1636651800000, booked: false },
    ],
  ],
  [
    [
      { start: 1636702200000, end: 1636704000000, booked: false },
      { start: 1636704000000, end: 1636705800000, booked: false },
      { start: 1636705800000, end: 1636707600000, booked: false },
      { start: 1636707600000, end: 1636709400000, booked: false },
      { start: 1636709400000, end: 1636711200000, booked: false },
      { start: 1636711200000, end: 1636713000000, booked: false },
      { start: 1636713000000, end: 1636714800000, booked: false },
      { start: 1636714800000, end: 1636716600000, booked: false },
    ],
    [
      { start: 1636702200000, end: 1636704000000, booked: false },
      { start: 1636704000000, end: 1636705800000, booked: false },
      { start: 1636705800000, end: 1636707600000, booked: false },
      { start: 1636707600000, end: 1636709400000, booked: false },
      { start: 1636709400000, end: 1636711200000, booked: false },
      { start: 1636711200000, end: 1636713000000, booked: false },
      { start: 1636713000000, end: 1636714800000, booked: false },
      { start: 1636714800000, end: 1636716600000, booked: false },
    ],
    [
      { start: 1636702200000, end: 1636704000000, booked: false },
      { start: 1636704000000, end: 1636705800000, booked: false },
      { start: 1636705800000, end: 1636707600000, booked: false },
      { start: 1636707600000, end: 1636709400000, booked: false },
      { start: 1636709400000, end: 1636711200000, booked: false },
      { start: 1636711200000, end: 1636713000000, booked: false },
      { start: 1636713000000, end: 1636714800000, booked: false },
      { start: 1636714800000, end: 1636716600000, booked: false },
    ],
    [
      { start: 1636702200000, end: 1636704000000, booked: false },
      { start: 1636704000000, end: 1636705800000, booked: false },
      { start: 1636705800000, end: 1636707600000, booked: false },
      { start: 1636707600000, end: 1636709400000, booked: false },
      { start: 1636709400000, end: 1636711200000, booked: false },
      { start: 1636711200000, end: 1636713000000, booked: false },
      { start: 1636713000000, end: 1636714800000, booked: false },
      { start: 1636714800000, end: 1636716600000, booked: false },
    ],
  ],
  [
    [
      { start: 1636720200000, end: 1636722000000, booked: false },
      { start: 1636722000000, end: 1636723800000, booked: false },
      { start: 1636723800000, end: 1636725600000, booked: false },
      { start: 1636725600000, end: 1636727400000, booked: false },
      { start: 1636727400000, end: 1636729200000, booked: false },
      { start: 1636729200000, end: 1636731000000, booked: false },
      { start: 1636731000000, end: 1636732800000, booked: false },
      { start: 1636732800000, end: 1636734600000, booked: false },
      { start: 1636734600000, end: 1636736400000, booked: false },
      { start: 1636736400000, end: 1636738200000, booked: false },
    ],
    [
      { start: 1636720200000, end: 1636722000000, booked: false },
      { start: 1636722000000, end: 1636723800000, booked: false },
      { start: 1636723800000, end: 1636725600000, booked: false },
      { start: 1636725600000, end: 1636727400000, booked: false },
      { start: 1636727400000, end: 1636729200000, booked: false },
      { start: 1636729200000, end: 1636731000000, booked: false },
      { start: 1636731000000, end: 1636732800000, booked: false },
      { start: 1636732800000, end: 1636734600000, booked: false },
      { start: 1636734600000, end: 1636736400000, booked: false },
      { start: 1636736400000, end: 1636738200000, booked: false },
    ],
    [
      { start: 1636720200000, end: 1636722000000, booked: false },
      { start: 1636722000000, end: 1636723800000, booked: false },
      { start: 1636723800000, end: 1636725600000, booked: false },
      { start: 1636725600000, end: 1636727400000, booked: false },
      { start: 1636727400000, end: 1636729200000, booked: false },
      { start: 1636729200000, end: 1636731000000, booked: false },
      { start: 1636731000000, end: 1636732800000, booked: false },
      { start: 1636732800000, end: 1636734600000, booked: false },
      { start: 1636734600000, end: 1636736400000, booked: false },
      { start: 1636736400000, end: 1636738200000, booked: false },
    ],
    [
      { start: 1636720200000, end: 1636722000000, booked: false },
      { start: 1636722000000, end: 1636723800000, booked: false },
      { start: 1636723800000, end: 1636725600000, booked: false },
      { start: 1636725600000, end: 1636727400000, booked: false },
      { start: 1636727400000, end: 1636729200000, booked: false },
      { start: 1636729200000, end: 1636731000000, booked: false },
      { start: 1636731000000, end: 1636732800000, booked: false },
      { start: 1636732800000, end: 1636734600000, booked: false },
      { start: 1636734600000, end: 1636736400000, booked: false },
      { start: 1636736400000, end: 1636738200000, booked: false },
    ],
  ],
  [
    [
      { start: 1636961400000, end: 1636963200000, booked: false },
      { start: 1636963200000, end: 1636965000000, booked: false },
      { start: 1636965000000, end: 1636966800000, booked: false },
      { start: 1636966800000, end: 1636968600000, booked: false },
      { start: 1636968600000, end: 1636970400000, booked: false },
      { start: 1636970400000, end: 1636972200000, booked: false },
      { start: 1636972200000, end: 1636974000000, booked: false },
      { start: 1636974000000, end: 1636975800000, booked: false },
    ],
    [
      { start: 1636961400000, end: 1636963200000, booked: false },
      { start: 1636963200000, end: 1636965000000, booked: false },
      { start: 1636965000000, end: 1636966800000, booked: false },
      { start: 1636966800000, end: 1636968600000, booked: false },
      { start: 1636968600000, end: 1636970400000, booked: false },
      { start: 1636970400000, end: 1636972200000, booked: false },
      { start: 1636972200000, end: 1636974000000, booked: false },
      { start: 1636974000000, end: 1636975800000, booked: false },
    ],
    [
      { start: 1636961400000, end: 1636963200000, booked: false },
      { start: 1636963200000, end: 1636965000000, booked: false },
      { start: 1636965000000, end: 1636966800000, booked: false },
      { start: 1636966800000, end: 1636968600000, booked: false },
      { start: 1636968600000, end: 1636970400000, booked: false },
      { start: 1636970400000, end: 1636972200000, booked: false },
      { start: 1636972200000, end: 1636974000000, booked: false },
      { start: 1636974000000, end: 1636975800000, booked: false },
    ],
    [
      { start: 1636961400000, end: 1636963200000, booked: false },
      { start: 1636963200000, end: 1636965000000, booked: false },
      { start: 1636965000000, end: 1636966800000, booked: false },
      { start: 1636966800000, end: 1636968600000, booked: false },
      { start: 1636968600000, end: 1636970400000, booked: false },
      { start: 1636970400000, end: 1636972200000, booked: false },
      { start: 1636972200000, end: 1636974000000, booked: false },
      { start: 1636974000000, end: 1636975800000, booked: false },
    ],
  ],
  [
    [
      { start: 1636979400000, end: 1636981200000, booked: false },
      { start: 1636981200000, end: 1636983000000, booked: false },
      { start: 1636983000000, end: 1636984800000, booked: false },
      { start: 1636984800000, end: 1636986600000, booked: false },
      { start: 1636986600000, end: 1636988400000, booked: false },
      { start: 1636988400000, end: 1636990200000, booked: false },
      { start: 1636990200000, end: 1636992000000, booked: false },
      { start: 1636992000000, end: 1636993800000, booked: false },
      { start: 1636993800000, end: 1636995600000, booked: false },
      { start: 1636995600000, end: 1636997400000, booked: false },
    ],
    [
      { start: 1636979400000, end: 1636981200000, booked: false },
      { start: 1636981200000, end: 1636983000000, booked: false },
      { start: 1636983000000, end: 1636984800000, booked: false },
      { start: 1636984800000, end: 1636986600000, booked: false },
      { start: 1636986600000, end: 1636988400000, booked: false },
      { start: 1636988400000, end: 1636990200000, booked: false },
      { start: 1636990200000, end: 1636992000000, booked: false },
      { start: 1636992000000, end: 1636993800000, booked: false },
      { start: 1636993800000, end: 1636995600000, booked: false },
      { start: 1636995600000, end: 1636997400000, booked: false },
    ],
    [
      { start: 1636979400000, end: 1636981200000, booked: false },
      { start: 1636981200000, end: 1636983000000, booked: false },
      { start: 1636983000000, end: 1636984800000, booked: false },
      { start: 1636984800000, end: 1636986600000, booked: false },
      { start: 1636986600000, end: 1636988400000, booked: false },
      { start: 1636988400000, end: 1636990200000, booked: false },
      { start: 1636990200000, end: 1636992000000, booked: false },
      { start: 1636992000000, end: 1636993800000, booked: false },
      { start: 1636993800000, end: 1636995600000, booked: false },
      { start: 1636995600000, end: 1636997400000, booked: false },
    ],
    [
      { start: 1636979400000, end: 1636981200000, booked: false },
      { start: 1636981200000, end: 1636983000000, booked: false },
      { start: 1636983000000, end: 1636984800000, booked: false },
      { start: 1636984800000, end: 1636986600000, booked: false },
      { start: 1636986600000, end: 1636988400000, booked: false },
      { start: 1636988400000, end: 1636990200000, booked: false },
      { start: 1636990200000, end: 1636992000000, booked: false },
      { start: 1636992000000, end: 1636993800000, booked: false },
      { start: 1636993800000, end: 1636995600000, booked: false },
      { start: 1636995600000, end: 1636997400000, booked: false },
    ],
  ],
  [
    [
      { start: 1637047800000, end: 1637049600000, booked: false },
      { start: 1637049600000, end: 1637051400000, booked: false },
      { start: 1637051400000, end: 1637053200000, booked: false },
      { start: 1637053200000, end: 1637055000000, booked: false },
      { start: 1637055000000, end: 1637056800000, booked: false },
      { start: 1637056800000, end: 1637058600000, booked: false },
      { start: 1637058600000, end: 1637060400000, booked: false },
      { start: 1637060400000, end: 1637062200000, booked: false },
    ],
  ],
  [
    [
      { start: 1637065800000, end: 1637067600000, booked: false },
      { start: 1637067600000, end: 1637069400000, booked: false },
      { start: 1637069400000, end: 1637071200000, booked: false },
      { start: 1637071200000, end: 1637073000000, booked: false },
      { start: 1637073000000, end: 1637074800000, booked: false },
      { start: 1637074800000, end: 1637076600000, booked: false },
      { start: 1637076600000, end: 1637078400000, booked: false },
      { start: 1637078400000, end: 1637080200000, booked: false },
      { start: 1637080200000, end: 1637082000000, booked: false },
      { start: 1637082000000, end: 1637083800000, booked: false },
    ],
  ],
  [
    [
      { start: 1637134200000, end: 1637136000000, booked: false },
      { start: 1637136000000, end: 1637137800000, booked: false },
      { start: 1637137800000, end: 1637139600000, booked: false },
      { start: 1637139600000, end: 1637141400000, booked: false },
      { start: 1637141400000, end: 1637143200000, booked: false },
      { start: 1637143200000, end: 1637145000000, booked: false },
      { start: 1637145000000, end: 1637146800000, booked: false },
      { start: 1637146800000, end: 1637148600000, booked: false },
    ],
    [
      { start: 1637134200000, end: 1637136000000, booked: false },
      { start: 1637136000000, end: 1637137800000, booked: false },
      { start: 1637137800000, end: 1637139600000, booked: false },
      { start: 1637139600000, end: 1637141400000, booked: false },
      { start: 1637141400000, end: 1637143200000, booked: false },
      { start: 1637143200000, end: 1637145000000, booked: false },
      { start: 1637145000000, end: 1637146800000, booked: false },
      { start: 1637146800000, end: 1637148600000, booked: false },
    ],
    [
      { start: 1637134200000, end: 1637136000000, booked: false },
      { start: 1637136000000, end: 1637137800000, booked: false },
      { start: 1637137800000, end: 1637139600000, booked: false },
      { start: 1637139600000, end: 1637141400000, booked: false },
      { start: 1637141400000, end: 1637143200000, booked: false },
      { start: 1637143200000, end: 1637145000000, booked: false },
      { start: 1637145000000, end: 1637146800000, booked: false },
      { start: 1637146800000, end: 1637148600000, booked: false },
    ],
    [
      { start: 1637134200000, end: 1637136000000, booked: false },
      { start: 1637136000000, end: 1637137800000, booked: false },
      { start: 1637137800000, end: 1637139600000, booked: false },
      { start: 1637139600000, end: 1637141400000, booked: false },
      { start: 1637141400000, end: 1637143200000, booked: false },
      { start: 1637143200000, end: 1637145000000, booked: false },
      { start: 1637145000000, end: 1637146800000, booked: false },
      { start: 1637146800000, end: 1637148600000, booked: false },
    ],
  ],
  [
    [
      { start: 1637152200000, end: 1637154000000, booked: false },
      { start: 1637154000000, end: 1637155800000, booked: false },
      { start: 1637155800000, end: 1637157600000, booked: false },
      { start: 1637157600000, end: 1637159400000, booked: false },
      { start: 1637159400000, end: 1637161200000, booked: false },
      { start: 1637161200000, end: 1637163000000, booked: false },
      { start: 1637163000000, end: 1637164800000, booked: false },
      { start: 1637164800000, end: 1637166600000, booked: false },
      { start: 1637166600000, end: 1637168400000, booked: false },
      { start: 1637168400000, end: 1637170200000, booked: false },
    ],
    [
      { start: 1637152200000, end: 1637154000000, booked: false },
      { start: 1637154000000, end: 1637155800000, booked: false },
      { start: 1637155800000, end: 1637157600000, booked: false },
      { start: 1637157600000, end: 1637159400000, booked: false },
      { start: 1637159400000, end: 1637161200000, booked: false },
      { start: 1637161200000, end: 1637163000000, booked: false },
      { start: 1637163000000, end: 1637164800000, booked: false },
      { start: 1637164800000, end: 1637166600000, booked: false },
      { start: 1637166600000, end: 1637168400000, booked: false },
      { start: 1637168400000, end: 1637170200000, booked: false },
    ],
    [
      { start: 1637152200000, end: 1637154000000, booked: false },
      { start: 1637154000000, end: 1637155800000, booked: false },
      { start: 1637155800000, end: 1637157600000, booked: false },
      { start: 1637157600000, end: 1637159400000, booked: false },
      { start: 1637159400000, end: 1637161200000, booked: false },
      { start: 1637161200000, end: 1637163000000, booked: false },
      { start: 1637163000000, end: 1637164800000, booked: false },
      { start: 1637164800000, end: 1637166600000, booked: false },
      { start: 1637166600000, end: 1637168400000, booked: false },
      { start: 1637168400000, end: 1637170200000, booked: false },
    ],
    [
      { start: 1637152200000, end: 1637154000000, booked: false },
      { start: 1637154000000, end: 1637155800000, booked: false },
      { start: 1637155800000, end: 1637157600000, booked: false },
      { start: 1637157600000, end: 1637159400000, booked: false },
      { start: 1637159400000, end: 1637161200000, booked: false },
      { start: 1637161200000, end: 1637163000000, booked: false },
      { start: 1637163000000, end: 1637164800000, booked: false },
      { start: 1637164800000, end: 1637166600000, booked: false },
      { start: 1637166600000, end: 1637168400000, booked: false },
      { start: 1637168400000, end: 1637170200000, booked: false },
    ],
  ],
  [
    [
      { start: 1637220600000, end: 1637222400000, booked: false },
      { start: 1637222400000, end: 1637224200000, booked: false },
      { start: 1637224200000, end: 1637226000000, booked: false },
      { start: 1637226000000, end: 1637227800000, booked: false },
      { start: 1637227800000, end: 1637229600000, booked: false },
      { start: 1637229600000, end: 1637231400000, booked: false },
      { start: 1637231400000, end: 1637233200000, booked: false },
      { start: 1637233200000, end: 1637235000000, booked: false },
    ],
    [
      { start: 1637220600000, end: 1637222400000, booked: false },
      { start: 1637222400000, end: 1637224200000, booked: false },
      { start: 1637224200000, end: 1637226000000, booked: false },
      { start: 1637226000000, end: 1637227800000, booked: false },
      { start: 1637227800000, end: 1637229600000, booked: false },
      { start: 1637229600000, end: 1637231400000, booked: false },
      { start: 1637231400000, end: 1637233200000, booked: false },
      { start: 1637233200000, end: 1637235000000, booked: false },
    ],
    [
      { start: 1637220600000, end: 1637222400000, booked: false },
      { start: 1637222400000, end: 1637224200000, booked: false },
      { start: 1637224200000, end: 1637226000000, booked: false },
      { start: 1637226000000, end: 1637227800000, booked: false },
      { start: 1637227800000, end: 1637229600000, booked: false },
      { start: 1637229600000, end: 1637231400000, booked: false },
      { start: 1637231400000, end: 1637233200000, booked: false },
      { start: 1637233200000, end: 1637235000000, booked: false },
    ],
    [
      { start: 1637220600000, end: 1637222400000, booked: false },
      { start: 1637222400000, end: 1637224200000, booked: false },
      { start: 1637224200000, end: 1637226000000, booked: false },
      { start: 1637226000000, end: 1637227800000, booked: false },
      { start: 1637227800000, end: 1637229600000, booked: false },
      { start: 1637229600000, end: 1637231400000, booked: false },
      { start: 1637231400000, end: 1637233200000, booked: false },
      { start: 1637233200000, end: 1637235000000, booked: false },
    ],
  ],
  [
    [
      { start: 1637238600000, end: 1637240400000, booked: false },
      { start: 1637240400000, end: 1637242200000, booked: false },
      { start: 1637242200000, end: 1637244000000, booked: false },
      { start: 1637244000000, end: 1637245800000, booked: false },
      { start: 1637245800000, end: 1637247600000, booked: false },
      { start: 1637247600000, end: 1637249400000, booked: false },
      { start: 1637249400000, end: 1637251200000, booked: false },
      { start: 1637251200000, end: 1637253000000, booked: false },
      { start: 1637253000000, end: 1637254800000, booked: false },
      { start: 1637254800000, end: 1637256600000, booked: false },
    ],
    [
      { start: 1637238600000, end: 1637240400000, booked: false },
      { start: 1637240400000, end: 1637242200000, booked: false },
      { start: 1637242200000, end: 1637244000000, booked: false },
      { start: 1637244000000, end: 1637245800000, booked: false },
      { start: 1637245800000, end: 1637247600000, booked: false },
      { start: 1637247600000, end: 1637249400000, booked: false },
      { start: 1637249400000, end: 1637251200000, booked: false },
      { start: 1637251200000, end: 1637253000000, booked: false },
      { start: 1637253000000, end: 1637254800000, booked: false },
      { start: 1637254800000, end: 1637256600000, booked: false },
    ],
    [
      { start: 1637238600000, end: 1637240400000, booked: false },
      { start: 1637240400000, end: 1637242200000, booked: false },
      { start: 1637242200000, end: 1637244000000, booked: false },
      { start: 1637244000000, end: 1637245800000, booked: false },
      { start: 1637245800000, end: 1637247600000, booked: false },
      { start: 1637247600000, end: 1637249400000, booked: false },
      { start: 1637249400000, end: 1637251200000, booked: false },
      { start: 1637251200000, end: 1637253000000, booked: false },
      { start: 1637253000000, end: 1637254800000, booked: false },
      { start: 1637254800000, end: 1637256600000, booked: false },
    ],
    [
      { start: 1637238600000, end: 1637240400000, booked: false },
      { start: 1637240400000, end: 1637242200000, booked: false },
      { start: 1637242200000, end: 1637244000000, booked: false },
      { start: 1637244000000, end: 1637245800000, booked: false },
      { start: 1637245800000, end: 1637247600000, booked: false },
      { start: 1637247600000, end: 1637249400000, booked: false },
      { start: 1637249400000, end: 1637251200000, booked: false },
      { start: 1637251200000, end: 1637253000000, booked: false },
      { start: 1637253000000, end: 1637254800000, booked: false },
      { start: 1637254800000, end: 1637256600000, booked: false },
    ],
  ],
  [
    [
      { start: 1637307000000, end: 1637308800000, booked: false },
      { start: 1637308800000, end: 1637310600000, booked: false },
      { start: 1637310600000, end: 1637312400000, booked: false },
      { start: 1637312400000, end: 1637314200000, booked: false },
      { start: 1637314200000, end: 1637316000000, booked: false },
      { start: 1637316000000, end: 1637317800000, booked: false },
      { start: 1637317800000, end: 1637319600000, booked: false },
      { start: 1637319600000, end: 1637321400000, booked: false },
    ],
    [
      { start: 1637307000000, end: 1637308800000, booked: false },
      { start: 1637308800000, end: 1637310600000, booked: false },
      { start: 1637310600000, end: 1637312400000, booked: false },
      { start: 1637312400000, end: 1637314200000, booked: false },
      { start: 1637314200000, end: 1637316000000, booked: false },
      { start: 1637316000000, end: 1637317800000, booked: false },
      { start: 1637317800000, end: 1637319600000, booked: false },
      { start: 1637319600000, end: 1637321400000, booked: false },
    ],
    [
      { start: 1637307000000, end: 1637308800000, booked: false },
      { start: 1637308800000, end: 1637310600000, booked: false },
      { start: 1637310600000, end: 1637312400000, booked: false },
      { start: 1637312400000, end: 1637314200000, booked: false },
      { start: 1637314200000, end: 1637316000000, booked: false },
      { start: 1637316000000, end: 1637317800000, booked: false },
      { start: 1637317800000, end: 1637319600000, booked: false },
      { start: 1637319600000, end: 1637321400000, booked: false },
    ],
    [
      { start: 1637307000000, end: 1637308800000, booked: false },
      { start: 1637308800000, end: 1637310600000, booked: false },
      { start: 1637310600000, end: 1637312400000, booked: false },
      { start: 1637312400000, end: 1637314200000, booked: false },
      { start: 1637314200000, end: 1637316000000, booked: false },
      { start: 1637316000000, end: 1637317800000, booked: false },
      { start: 1637317800000, end: 1637319600000, booked: false },
      { start: 1637319600000, end: 1637321400000, booked: false },
    ],
    [
      { start: 1637307000000, end: 1637308800000, booked: false },
      { start: 1637308800000, end: 1637310600000, booked: false },
      { start: 1637310600000, end: 1637312400000, booked: false },
      { start: 1637312400000, end: 1637314200000, booked: false },
      { start: 1637314200000, end: 1637316000000, booked: false },
      { start: 1637316000000, end: 1637317800000, booked: false },
      { start: 1637317800000, end: 1637319600000, booked: false },
      { start: 1637319600000, end: 1637321400000, booked: false },
    ],
  ],
  [
    [
      { start: 1637325000000, end: 1637326800000, booked: false },
      { start: 1637326800000, end: 1637328600000, booked: false },
      { start: 1637328600000, end: 1637330400000, booked: false },
      { start: 1637330400000, end: 1637332200000, booked: false },
      { start: 1637332200000, end: 1637334000000, booked: false },
      { start: 1637334000000, end: 1637335800000, booked: false },
      { start: 1637335800000, end: 1637337600000, booked: false },
      { start: 1637337600000, end: 1637339400000, booked: false },
      { start: 1637339400000, end: 1637341200000, booked: false },
      { start: 1637341200000, end: 1637343000000, booked: false },
    ],
    [
      { start: 1637325000000, end: 1637326800000, booked: false },
      { start: 1637326800000, end: 1637328600000, booked: false },
      { start: 1637328600000, end: 1637330400000, booked: false },
      { start: 1637330400000, end: 1637332200000, booked: false },
      { start: 1637332200000, end: 1637334000000, booked: false },
      { start: 1637334000000, end: 1637335800000, booked: false },
      { start: 1637335800000, end: 1637337600000, booked: false },
      { start: 1637337600000, end: 1637339400000, booked: false },
      { start: 1637339400000, end: 1637341200000, booked: false },
      { start: 1637341200000, end: 1637343000000, booked: false },
    ],
    [
      { start: 1637325000000, end: 1637326800000, booked: false },
      { start: 1637326800000, end: 1637328600000, booked: false },
      { start: 1637328600000, end: 1637330400000, booked: false },
      { start: 1637330400000, end: 1637332200000, booked: false },
      { start: 1637332200000, end: 1637334000000, booked: false },
      { start: 1637334000000, end: 1637335800000, booked: false },
      { start: 1637335800000, end: 1637337600000, booked: false },
      { start: 1637337600000, end: 1637339400000, booked: false },
      { start: 1637339400000, end: 1637341200000, booked: false },
      { start: 1637341200000, end: 1637343000000, booked: false },
    ],
    [
      { start: 1637325000000, end: 1637326800000, booked: false },
      { start: 1637326800000, end: 1637328600000, booked: false },
      { start: 1637328600000, end: 1637330400000, booked: false },
      { start: 1637330400000, end: 1637332200000, booked: false },
      { start: 1637332200000, end: 1637334000000, booked: false },
      { start: 1637334000000, end: 1637335800000, booked: false },
      { start: 1637335800000, end: 1637337600000, booked: false },
      { start: 1637337600000, end: 1637339400000, booked: false },
      { start: 1637339400000, end: 1637341200000, booked: false },
      { start: 1637341200000, end: 1637343000000, booked: false },
    ],
    [
      { start: 1637325000000, end: 1637326800000, booked: false },
      { start: 1637326800000, end: 1637328600000, booked: false },
      { start: 1637328600000, end: 1637330400000, booked: false },
      { start: 1637330400000, end: 1637332200000, booked: false },
      { start: 1637332200000, end: 1637334000000, booked: false },
      { start: 1637334000000, end: 1637335800000, booked: false },
      { start: 1637335800000, end: 1637337600000, booked: "@simon8889" },
      { start: 1637337600000, end: 1637339400000, booked: "@simon8889" },
      { start: 1637339400000, end: 1637341200000, booked: "@simon8889" },
      { start: 1637341200000, end: 1637343000000, booked: "@simon8889" },
    ],
  ],
];

// const people = [
//   5, 3, 5, 3, 5, 2, 2, 3, 5, 5, 4, 2, 2, 4, 4, 2, 3, 5, 3, 4, 2, 5, 4, 8, 5, 4,
//   5, 4, 5, 4, 4, 5, 3, 2, 5, 8, 4, 5, 4, 3, 5, 2, 5, 5, 4, 5, 5, 5, 4, 8, 4, 5,
//   4, 5, 4, 5, 2, 3, 2, 5, 5, 5, 3, 5, 4, 4, 5, 4, 5, 4, 2, 8, 4, 5, 2, 8, 4, 8,
//   5, 5, 5, 3, 5, 2, 2, 5, 8, 5, 3, 5, 5, 8, 8, 4, 5, 5, 3, 2, 2, 2, 4, 5, 5, 4,
//   5, 4, 2, 3, 4, 5, 4, 4, 5, 4, 5, 2, 4, 4, 4, 2, 8, 2, 5, 3, 4, 4, 5, 4, 5, 2,
//   2, 3, 3, 3, 5, 5, 4, 4, 4, 5, 3, 5, 3, 5, 2, 2, 3, 5, 5, 4, 5, 3, 5, 3, 5, 2,
//   2, 4, 3, 5, 2, 5, 5, 4, 3, 5, 2, 5,
// ];

const people = [
  5, 3, 5, 3, 5, 2, 2, 3, 5, 5, 4, 2, 2, 4, 4, 2, 3, 5, 3, 4, 2, 5, 4, 8, 5, 4,
  5, 4, 5, 4, 4, 5, 3, 2, 5, 8, 4, 5, 4, 3, 5, 2, 5, 5, 4, 5, 5, 5, 4, 8, 4, 5,
  4, 5, 4, 5, 2, 3, 2, 5, 5, 5, 3, 5, 4, 4, 5, 4, 5, 4, 2, 8, 4, 5, 2, 8, 4, 8,
  5, 5, 5, 3, 5, 2, 2, 5, 8, 5, 3, 5, 5, 8, 8, 4, 5, 5, 3, 2, 2, 2, 4, 5, 5, 4,
  5, 4, 2, 3, 4, 5, 4, 4, 5, 4, 5, 2, 4, 4, 4, 2, 8, 2, 5, 3, 4, 4, 5, 4, 5, 2,
  2, 3, 3, 3, 5, 5, 4, 4, 4, 5, 3, 5, 3, 5, 2, 2, 3, 5, 5, 4, 5, 3, 5, 3, 5, 2,
  2, 4, 3, 5, 2, 5, 5, 4, 3, 5, 2, 5, 4, 4, 8, 5, 2,
];

// const people = [
//   5, 3, 5, 3, 5, 2, 2, 3, 5, 5, 4, 2, 2, 4, 4, 2, 3, 5, 3, 4, 2, 5, 4, 8, 5, 4,
//   5, 4, 5, 4, 4, 5, 3, 2, 5, 8, 4, 5, 4, 3, 5, 2, 5, 5, 4, 5, 5, 5, 4, 8, 4, 5,
// ];
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
const getPlacedPeople = (amosList) => {
  let people = [];

  for (let amo = 0; amo < amosList.length; amo++) {
    let ptr = amosList[amo].head;
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
};
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

  return "@unavailable";
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
        if (grid[shift][amo][slot].booked !== false) {
          node.data.booked = grid[shift][amo][slot].booked;
        } else {
          node.data.booked = false;
        }
      }
    }
  }
  return amosList;
}
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
const dummyFill = (pt, amoNb, people, alc) => {
  if (people.length === 0) {
    return alc;
  }

  if (pt === null || pt.next === null) {
    if (amoNb === alc.length - 1) {
      return false;
    } else {
      amoNb++;
      pt = alc[amoNb].head;
    }
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

  // console.log(`available -> ${available}`);
  if (available === 0) {
    return dummyFill(pto.next, amoNb, people, alc);
  }

  let peopleSet = Array.from(new Set(people));
  for (let i = 0; i < peopleSet.length; i++) {
    if (peopleSet[i] > available) {
      continue;
    } else {
      let pc = [...people];
      let pplIdx = pc.indexOf(peopleSet[i]);
      pc.splice(pplIdx, 1);

      let newPtr = fillRdv(peopleSet[i], pt);
      // console.log(`pc : ${pc.length}`);
      // this.data.people = pc;

      return dummyFill(newPtr, amoNb, pc, alc);
    }
  }
  return dummyFill(pto.next, amoNb, people, alc);
};
const printLst = (alc) => {
  for (let amo = 0; amo < alc.length; amo++) {
    alc[amo].printList();
  }
};
const printAvailabilities = (S) => {
  let typos = Object.keys(S);
  console.log(`typos -> ${JSON.stringify(typos)}`);
  for (let typo = 0; typo < typos.length; typo++) {
    for (let slot = 0; slot < S[typos[typo]].length; slot++) {
      console.log(
        `[${typos[typo]}] ${moment
          .utc(S[typos[typo]][slot].start)
          .format("DD/MM HH:mm")}  -  ${moment
          .utc(S[typos[typo]][slot].end)
          .format("DD/MM HH:mm")}    :    ${S[typos[typo]][slot].booked}`
      );
    }
  }
};

let pas = 1800;

let startDay = "06:00";
let endDay = "20:00";
let startShift = "08:30";
let endShift = "18:30";
let startLunch = "12:30";
let endLunch = "13:30";

let initialAmosList = mapList(
  grid,
  pas,
  startDay,
  endDay,
  startLunch,
  endLunch,
  startShift,
  endShift
);

// let gen = ftGenetic(initialAmosList, people);
// console.log(`initialAmosList ---> ${JSON.stringify(initialAmosList)}`);
let totalMargin = 0;
for (let i = 0; i < initialAmosList.length; i++) {
  let margin = initialAmosList[i].getMargin();
  // console.log(`margin -> ${margin}`);
  totalMargin += margin;
}

// console.log(`Margin TOTAL = ${totalMargin}\n\n`);

let [nbBooked, nbNotBooked] = getAvailables(grid);
if (people.length > 0) {
  var totalPeople = people.reduce(reducer);
} else {
  var totalPeople = 0;
}
let margin = nbNotBooked - totalPeople;
// console.log(
//   `margin : ${margin}, nbNotBooked : ${nbNotBooked}, nbBooked : ${nbBooked}, total : ${totalPeople}`
// );
const fit = (pt, rdvLength, pas) => {
  let opt = pt;
  let counter = 0;
  while (opt !== null && counter < rdvLength) {
    // console.log(`TOP`);
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
};
const isAlreadyFoundSolution = (S1, rdvLength, start) => {
  if (S1[rdvLength] === undefined) {
    return false;
  }
  if (S1[rdvLength].find((_) => _.start === start) !== undefined) {
    // console.log(`\n--------------------> FOUND SOLUTIOIN !!!!!\n`);
    return true;
  }

  return false;
};
const mergeSolutions = (S1, S2) => {
  for (const [key, value] of Object.entries(S2)) {
    if (S1[key] === undefined) S1[key] = [];
    for (let v = 0; v < value.length; v++) {
      if (S1[key].find((_) => _.start === value[v].start) === undefined) {
        S1[key].push(value[v]);
      }
    }
  }

  return S1;
};
const getAmosListCopy = (amosList) => {
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
};
const fillRdv = (rdvLength, pt) => {
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
};
const getAvailabilities = (alc) => {
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
};
const printSolutionsNumber = (S) => {
  // console.log(`\n\n`);
  let keys = Object.keys(S);
  for (let i = 0; i < keys.length; i++) {
    console.log(`Length : ${keys[i]} : ${S[keys[i]].length}`);
  }
};
const giveAnswers = (S, rdvLength, people) => {
  // let S = {};
  console.log(`giveAnswers() : ${rdvLength}`);

  let counter = 0;
  for (let amo = 0; amo < initialAmosList.length; amo++) {
    let ptr = initialAmosList[amo].head;
    let nodeCounter = 0;
    while (ptr !== null) {
      if (ptr.data.booked === false) {
        // console.log(
        //   `> Test place ${rdvLength} pour amo ${amo} a ${ptr.data.start}`
        // );
        if (
          fit(ptr, rdvLength, 1800) &&
          !isAlreadyFoundSolution(
            S,
            rdvLength,
            initialAmosList[amo].planningStart + ptr.data.start
          )
        ) {
          // console.log(`Rdv ${rdvLength} DOES FIT`);
          let alc = getAmosListCopy(initialAmosList);
          let nc = alc[amo].getNodeAt(nodeCounter);
          fillRdv(rdvLength, nc);
          let S1 = [];
          // S1 = this.ftRec(0, alc, alc[0].head, [...people]);
          S1 = dummyFill(alc[0].head, 0, [...people], alc);
          // console.log(S1);
          if (S1 === null) {
            // console.log(`PAS DE SOLUTION`);
          } else {
            S = mergeSolutions(S, getAvailabilities(S1));
            printSolutionsNumber(S);
          }
        } else {
          // console.log(`Rdv ${rdvLength} DOES NOT FIT`);
        }
        // throw new Error(`STOP`);
        counter++;
      }

      ptr = ptr.next;
      nodeCounter += 1;
    }
  }
  // console.log(`COUNTER : ${counter}`);
  // console.log(JSON.stringify(S));
  return S;
};

const solveRdv = (people) => {
  let S = {};

  // Get all solutions for all rdv lengths
  let S1 = undefined;
  let setAllLengths = Array.from(new Set(people)).sort(function (a, b) {
    return b - a;
  });
  for (let x = 0; x < setAllLengths.length; x++) {
    // console.log(`giveAnswer() : setAllLengths[${x}] = ${setAllLengths[x]}`);
    S1 = [];
    S1 = giveAnswers(S, setAllLengths[x], [...people]);
    // console.log(S1);
    if (S1 !== null) {
      S = mergeSolutions(S, S1);
      // console.log(JSON.stringify(S));
    }
    // S1[setAllLengths[x]] = S;
  }

  return S;
};

let S = solveRdv(people);

console.log(S);
// let alc = dummyFill(initialAmosList[0].head, 0, people, initialAmosList);

// printLst(alc);

// printLst(ret);
// let S = getAvailabilities(ret);
// console.log(S);
// printAvailabilities(S);
// let bt = new Bt(initialAmosList, pas);
// let S = bt.giveAnswers(2, people);
// S = bt.giveAnswers(3, people);
// S = bt.giveAnswers(4, people);
// S = bt.giveAnswers(5, people);
// console.log(JSON.stringify(ret));
