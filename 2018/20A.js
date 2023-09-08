const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['N', [1, 0]],['S', [-1, 0]],['W', [0, -1]],['E', [0, 1]]]);
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let set = new Set();
  let len = input.length;

  function DFS(idx, r, c) {
    let cands = [];
    let curr = r, curc = c;

    for (let i=idx; i<len-1; i++) {
      if (input[i] == '(') {
        [i, cands] = DFS(i+1, curr, curc);
      } else if (input[i] == ')') {
        cands.push([curr, curc]);
        
        return [i, cands];
      } else if (input[i] == '|') {
        cands.push([curr, curc]);
        curr = r, curc = c;
      } else {
        let [dr, dc] = dmap.get(input[i]);
        curr += dr, curc += dc;
        set.add(curr+','+curc);
       
        curr += dr, curc += dc;
        set.add(curr+','+curc);
      }
    }
  }

  DFS(1, 0, 0);
  
  let q = [[0, 0]], d = 0, visited = new Set().add('0,0');

  while (q.length) {
    let nq = [];
    d++;

    for (let [r, c] of q) {
      for (let [dr, dc] of darr) {
        let nr=r+dr,nc=c+dc;

        if (!set.has(nr+','+nc)) continue;
        nr+=dr, nc+=dc;

        if (visited.has(nr+','+nc)) continue;
        visited.add(nr+','+nc);
        nq.push([nr, nc]);
      }
    }

    q = nq;
  }

  return d - 1;
}