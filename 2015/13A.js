const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map(), res = 0;
  let nameMap = new Map(), i = 0;

  readword(input).map(a => {
    let cur = a.split(' ');
    let last = cur[cur.length-1];
    let firstP = cur[0], lastP = last.slice(0, last.length-1);

    if (!nameMap.has(firstP)) {
      nameMap.set(firstP, i);
      i++;
    }

    if (!nameMap.has(lastP)) {
      nameMap.set(lastP, i);
      i++;
    }

    firstP = nameMap.get(firstP);
    lastP = nameMap.get(lastP);

    let key1 = firstP + ',' + lastP;
    let key2 = lastP + ',' + firstP;

    let val = cur[2] == 'gain' ? +cur[3] : -cur[3];

    map.set(key1, (map.get(key1) || 0) + val);
    map.set(key2, (map.get(key2) || 0) + val);
  });

  let q = [[[], new Set(nameMap.values()), 0]];

  while (q.length) {
    let nq = [];

    for (let [arr, unused, total] of q) {      
      for (let cur of unused) {
        let narr = arr.slice();
        narr.push(cur);
          
        let nunused = new Set(unused);
        nunused.delete(cur);
        let ntotal = total;

        let last = cur;

        if (arr.length) {
          let secondLast = arr[arr.length-1];

          ntotal += map.get(last + ',' + secondLast);
        }

        if (narr.length == nameMap.size) {
          let first = narr[0];

          ntotal += map.get(last + ',' + first);
        }

        if (nunused.size == 0) {
          res = Math.max(res, ntotal);
        } else {
          nq.push([narr, nunused, ntotal]);  
        }
      }
    }

    q = nq;
  }

  return res;
}
