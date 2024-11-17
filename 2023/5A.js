const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readword2d(input);
  let seeds = arr[0].slice(1).map(a => +a);
  let nseeds = seeds;

  for (let map of arr) {
    if (map[0] == '' || map[1] == 'map:' || map[0] == 'seeds:') {
      seeds = nseeds;
      nseeds = seeds.slice();
      continue;
    }

    let [a, b, range] = map.map(a => +a);

    for (let i = 0; i < seeds.length; i++) {
      let x = seeds[i];
      if (x >= b && x < b + range)
        nseeds[i] = seeds[i] - b + a;
    }
  }

  return Math.min(...nseeds);
}