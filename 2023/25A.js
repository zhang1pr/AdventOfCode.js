const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), cntMap = new Map();
  let arr = readword(input);
  let cntA = 1, cntB = 0, start;

  for (let row of arr) {
    let [u, v] = row.split(': ');
    map.set(u, v.split(' '));
    start = u;
  }

  let cnt = 0;

  for (let [parent, children] of map) {
    cntMap.set(parent, cnt);
    cnt++;

    for (let child of children) {
      if (!map.has(child))
        map.set(child, [parent]);
      else if (!map.get(child).includes(parent))
        map.get(child).push(parent);
    }
  }

  let used;
  let startNeis = map.get(start);

  for (let [node] of map) {
    if (node == start) continue;

    used = new Set().add(start);

    let cnt = 0;

    for (let nei of startNeis) {
      if (cnt > 3) break;

      if (nei == node) {
        cnt++;
        continue;
      }

      let path = BFS(node, nei);

      if (path != null) {
        cnt++;
        for (let node of path)
          used.add(node);
      }
    }

    if (cnt > 3)
      cntA++;
    else
      cntB++;
  }

  function BFS(target, source) {
    let vis = new Set().add(source);
    let par = new Map();
    let q = [source];

    while (q.length) {
      let nq = [];

      for (let node of q) {
        for (let nei of map.get(node)) {
          if (target == nei) {
            let cur = node;
            let path = [node];

            while (cur != source) {
              cur = par.get(cur);
              path.push(cur);
            }

            return path;
          }

          if (vis.has(nei) || used.has(nei)) continue;
          vis.add(nei);

          par.set(nei, node);
          nq.push(nei);
        }
      }

      q = nq;
    }
  }

  return cntA * cntB;
}

console.log(solve(input));