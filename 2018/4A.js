const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), t, id, idMap;
  let arr = readword(input).sort();

  for (let text of arr) {
    let [date, time, word1, word2] = text.split(' ');
    let cnt = 0;
    let tLast = parseInt(time.split(':')[1]);

    if (word2[0] == '#') {
      id = +word2.slice(1);
      if (!map.has(id)) map.set(id, new Map());
      idMap = map.get(id);
    } else if (word1 == 'falls') {
      t = tLast;
    } else if (word1 == 'wakes') {
      cnt += tLast - t;
      idMap.set('cnt', (idMap.get('cnt') || 0) + cnt);
      for (let i = t; i < tLast; i++)
        idMap.set(i, (idMap.get(i) || 0) + 1);
      t = arr;
    }
  }

  let max = 0;
  for (let [key, idMap] of map) {
    let cnt = idMap.get('cnt');
    if (cnt > max) {
      max = cnt;
      id = key;
    }
  }

  idMap = map.get(id);
  max = 0;

  for (let [time, val] of idMap) {
    if (time != 'cnt' && val > max) {
      max = val;
      t = time;
    }
  }

  return t * id;
}

console.log(solve(input));