const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map(), set = new Set();
  let arr = readword(input);
  let replace = arr.slice(0, arr.length-2).map(a => a.split(' => '));
  let molecule = arr[arr.length-1];
  
  for (let [a,b] of replace) {
    if (!map.has(a)) map.set(a,[]);

    map.get(a).push(b);
  }


  for (let i=0; i<molecule.length; i++) {
    let cur = molecule[i], next = molecule[i+1], nstr;

    if (map.has(cur)) {
      for (let val of map.get(cur)) {
        nstr = molecule.slice(0, i) + val + molecule.slice(i+1);
        set.add(nstr);
      }
    }

    if (next && map.has(cur+next)) {
      for (let val of map.get(cur+next)) {
        nstr = molecule.slice(0, i) + val + molecule.slice(i+2);
        set.add(nstr);
      }
    }
  }

  return set.size;
}
