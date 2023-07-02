const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let parMap = new Map(), childMap = new Map(), weightMap = new Map();
  let res;
  let arr = readword(input);

  for (let row of arr) {
    let [tower, to] = row.split(' -> ');
    let [from, weight] = tower.split(' ');
    weight = readnum(weight)[0];
    weightMap.set(from, weight);

    if (to) {
      to = to.split(', ');
      childMap.set(from, to);

      for (let x of to) {
        parMap.set(x, from);
      }
    }
  }

  function DFS(node) {
    if (!childMap.has(node))
      return weightMap.get(node);
    
    let map = new Map();
    let total = weightMap.get(node);

    for (let child of childMap.get(node)) {
      let cur = DFS(child);

      if (!map.has(cur))
        map.set(cur, [])
      map.get(cur).push(child);  
        
      total += cur;  
    }

    if (map.size == 2 && res == null) {
      let diff = 0, id;
      for (let [k, arr] of map) {
        if (arr.length > 1) {
          diff += k;
        } else {
          diff -= k;
          id = arr[0];
        }
      }
    
      res = weightMap.get(id) + diff;
    }

    return total;
  }

  for (let row of arr) {
    let [tower] = row.split(' -> ');
    let [from] = tower.split(' ');

    if (!parMap.has(from)) {
      DFS(from);
    }
  }

  return res;
}
