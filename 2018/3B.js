const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let map = new Map()
  let arr = readnum2d(input);

  for (let [id, x, y, w, l] of arr)
    for (let i=x; i<x+w; i++)
      for (let j=y; j<y+l; j++)
        map.set(i+','+j, (map.get(i+','+j) || 0) + 1);
 
  for (let [id, x, y, w, l] of arr) {
    let f = true;

    for (let i=x; i<x+w; i++)
      for (let j=y; j<y+l; j++)
        if (map.get(i+','+j) > 1)
          f = false;

    if (f) return id;      
  }
}