const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set();
  let arr = readword2d(input);
  let line = arr[0].slice(1);

  let seeds = [];
  for (let i = 0; i < line.length; i += 2)
    seeds.push([+line[i], (+line[i]) + (+line[i + 1]) - 1]);
  let nseeds = [];

  let flag = false;

  for (let map of arr) {
    if (map[1] == 'map:' && flag) {
      for (let i = 0; i < seeds.length; i++)
        if (!set.has(i))
          nseeds.push(seeds[i]);

      seeds = nseeds;
      nseeds = [];
      set = new Set();
    }

    if (map[1] == 'map:') flag = true;
    if (map[0] == '' || map[1] == 'map:' || map[0] == 'seeds:') {
      continue;
    }

    let [a, b, range] = map.map(a => +a);
    let left1 = b, right1 = b + range - 1;

    for (let i = 0; i < seeds.length; i++) {
      if (set.has(i)) continue;
      let [left2, right2] = seeds[i];
      if (left1 > right2 || left2 > right1) {
        continue;
      }

      let lp = [left2, Math.max(left1, left2) - 1];
      let mp = [Math.max(left1, left2), Math.min(right1, right2)];
      let rp = [Math.min(right1, right2) + 1, right2];

      if (lp[0] <= lp[1]) seeds.push(lp);
      nseeds.push(mp.map(x => x - b + a));
      if (rp[0] <= rp[1]) seeds.push(rp);
      set.add(i);
    }
  }

  for (let i = 0; i < seeds.length; i++)
    if (!set.has(i))
      nseeds.push(seeds[i]);

  return Math.min(...nseeds.flat());
}

console.log(solve(input));