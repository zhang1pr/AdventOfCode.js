const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let emap = new Map(), res = 0;
  let wmap = new Map(), dmap = new Map();
  let set = new Set(['AA']);

  for (let line of readword(input)) {
    let [num] = readnum(line);
    let keys = line.match(/[A-Z]{2}/g);

    emap.set(keys[0], keys.slice(1));
    wmap.set(keys[0], num);

    if (num > 0) set.add(keys[0]);
  }

  for (let cur of set)
    BFS(cur, set, dmap, emap);

  function complement(arr, res) {
    let set = new Set(res);
    return arr.filter(a => !set.has(a));
  }

  function partition(arr, ans, idx) {
    if (ans.length <= arr.length / 2) {
      res = Math.max(res,
        BFS2(ans, wmap, dmap)
        +
        BFS2(complement(arr, ans), wmap, dmap)
      );
    }

    for (let i = idx; i < arr.length; i++) {
      ans.push(arr[i]);
      partition(arr, ans, i + 1);
      ans.pop();
    }
  }

  let targets = [...set].filter(a => a != 'AA');
  partition(targets, [], 0);

  return res;
}

function BFS(start, vset, dmap, emap) {
  let d = 0;
  let q = [start];
  let set = new Set().add(start);
  dmap.set(start, []);

  while (q.length) {
    let nq = [];
    d++;

    for (let cur of q) {
      for (let nei of emap.get(cur)) {
        if (!set.has(nei)) {
          set.add(nei);
          nq.push(nei);

          if (vset.has(nei)) {
            dmap.get(start).push([nei, d]);
          }
        }
      }
    }

    q = nq;
  }
}

function BFS2(subset, wmap, dmap) {
  subset = new Set(subset);
  let q = [['AA', 0, 0, new Set(), 0]];
  let res = 0;

  while (q.length) {
    let nq = [];

    for (let [cur, ct, w, set, total] of q) {
      for (let [nei, t] of dmap.get(cur)) {
        if (subset.has(nei)) {
          let nt = ct + t + 1;
          let ntotal = total + (t + 1) * w;

          if (!set.has(nei) && nt <= 26) {
            let nw = w + wmap.get(nei);
            let nset = new Set(set).add(nei);

            let a = [nei, nt, nw, nset, ntotal];
            nq.push(a);
            res = Math.max(res, ntotal + (26 - nt) * nw);
          }
        }
      }
    }

    q = nq;
  }

  return res;
}

console.log(solve(input));