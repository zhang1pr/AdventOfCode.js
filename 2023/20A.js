const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map(), t = 0;
  let hi = 0, lo = 0;
  let fMap = new Map(), cMap = new Map();
  let arr = readword(input);
  let broad = [];

  for (let line of arr) {
    let [a, b] = line.split(' -> ');
    b = b.split(', ');
    let name = a.slice(1);

    if (a[0] == '%') {
      map.set(name, b);
      fMap.set(name, 'off');
    } else if (a[0] == '&') {
      map.set(name, b);
      cMap.set(name, new Map());
    } else {
      for (let x of b)
        broad.push(x);
    }
  }

  for (let line of arr) {
    let [a, b] = line.split(' -> ');
    b = b.split(', ');
    let name = a[0] == 'b' ? a : a.slice(1);

    for (let x of b)
      if (cMap.has(x))
        cMap.get(x).set(name, 'lo');
  }

  while (t < 1000) {
    t++;
    lo++;

    let q = [['broad', 'lo']];

    while (q.length) {
      let nq = [];

      for (let [name, pulse] of q) {
        let next = name == 'broad' ? broad : map.get(name);

        for (let nei of next) {
          if (pulse == 'hi') hi++;
          if (pulse == 'lo') lo++;

          if (fMap.has(nei)) {
            if (pulse == 'hi') continue;

            let v = fMap.get(nei);
            fMap.set(nei, v == 'off' ? 'on' : 'off');
            nq.push([nei, v == 'off' ? 'hi' : 'lo']);
          } else if (cMap.has(nei)) {
            let neiMap = cMap.get(nei);
            neiMap.set(name, pulse);
            let flag = [...neiMap.values()].every(a => a == 'hi');
            nq.push([nei, flag ? 'lo' : 'hi']);
          }
        }
      }


      q = nq;
    }
  }

  return hi * lo;
}