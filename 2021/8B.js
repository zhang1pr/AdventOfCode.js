const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let map = new Map(), res = 0, top;
  let arr = readword(input).map(a => a.split(' | ').map(a => a.split(' ')));

  for (let i = 0; i < arr.length; i++) {
    let [cur, code] = arr[i];
    map = new Map();
    cur.sort((a, b) => a.length - b.length);
    cur = cur.map(a => [...a].sort().join(''));

    map.set(cur[0], 1).set(cur[1], 7).set(cur[2], 4);
    map.set(cur[9], 8);
    let a = cur[3], b = cur[4], c = cur[5];
    let d = cur[6], e = cur[7], f = cur[8];

    for (let ch of cur[1]) {
      if (!cur[0].includes(ch)) top = ch;
    }
    let lup, mid, can = [];
    for (let ch of cur[2]) {
      if (!cur[0].includes(ch)) can.push(ch);
    }
    let [can1, can2] = can;
    let t1 = 0, t2 = 0;
    for (let str of cur) {
      if (str.includes(can1)) {
        t1++;
      }
      if (str.includes(can2)) {
        t2++;
      }
    }

    if (t1 == 6) {
      lup = can1;
      mid = can2;
    } else {
      lup = can2;
      mid = can1;
    }

    for (let str of [d, e, f]) {
      if (!str.includes(mid)) {
        map.set(str, 0);
      }
    }

    let nine, six;

    for (let str of [d, e, f]) {
      if (str.includes(cur[0][0]) && str.includes(cur[0][1]) && !map.has(str)) {
        map.set(str, 9);
        nine = str;
      } else if (!map.has(str)) {
        map.set(str, 6);
        six = str;
      }
    }

    for (let str of [a, b, c]) {
      let ninc = [...str].every(z => nine.includes(z));
      let sinc = [...str].every(z => six.includes(z));

      if (ninc && sinc) {
        map.set(str, 5);
      } else if (ninc) {
        map.set(str, 3);
      } else {
        map.set(str, 2);
      }
    }

    let val = '';

    for (let ch of code) val += map.get([...ch].sort().join(''));

    res += (+val);
  }

  return res;
}