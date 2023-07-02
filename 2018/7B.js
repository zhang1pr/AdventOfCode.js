const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let map = new Map(), indMap = new Map(), set = new Set(), t = 0;
  let arr = readword2d(input);
  let workerNum = 5;
  let workerTime = Array(workerNum).fill(0);
  let workerGoal = Array(workerNum);

  for (let ins of arr) {
    let [u, v] = [ins[1], ins[7]];
    set.add(u).add(v);

    if (!map.has(u)) map.set(u, []);
    map.get(u).push(v);

    indMap.set(v, (indMap.get(v) || 0) + 1);
  }

  let q = [];
  for (let x of set)
    if (!indMap.has(x))
      q.push(x);
  
  let cnt = set.size;
  while (cnt) {
    q.sort();      
      
    for (let i=0; i<workerTime.length; i++)
      if (workerTime[i] == 0)
        if (q.length) {
          let cur = q.shift();
          workerTime[i] = cur.charCodeAt(0) - 4;
          workerGoal[i] = cur
        } else {
          workerGoal[i] = null;
        }
     
    if (workerTime.every(a => a == 0)) break;  

    t++;

    for (let i=0; i<workerTime.length; i++) {
      workerTime[i] = Math.max(workerTime[i] - 1, 0);

      if (workerTime[i] == 0 && workerGoal[i]) {
        cnt--;
        let cur = workerGoal[i];

        for (let nei of (map.get(cur) || [])) {
          let ind = indMap.get(nei) - 1;
          if (ind == 0) q.push(nei);
          indMap.set(nei, ind);
        }
      } 
    }
  }

  return t;
}
