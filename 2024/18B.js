const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
class DisjointSetUnion { constructor(i) { this.par = [...Array(i)].map((i, t) => t), this.rank = Array(i).fill(0), this.sz = Array(i).fill(1); } find(i) { return this.par[i] != i && (this.par[i] = this.find(this.par[i])), this.par[i]; } union(i, t) { let goal = this.find(i), n = this.find(t); return goal != n && (this.rank[goal] < this.rank[n] && ([goal, n] = [n, goal]), this.rank[goal] == this.rank[n] && this.rank[goal]++, this.par[n] = goal, this.sz[goal] += this.sz[n], !0); } size(i) { return this.sz[this.find(i)]; } areInSameSet(i, t) { return this.find(i) == this.find(t); } }
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), set = new Set(), bset = new Set();
  let arr = readword(input);

  let goal = 70;

  let dsu = new DisjointSetUnion((goal + 1) ** 2);

  for (let x of arr)
    bset.add(x);

  BFS(0, 0);
  BFS(goal, goal);

  for (let i = arr.length - 1; i >= 0; i--) {
    let x = arr[i];
    bset.delete(x);

    BFS(...x.split(',').map(a => +a));

    if (dsu.find(0) == dsu.find((goal + 1) ** 2 - 1))
      return arr[i];
  }

  function BFS(r, c) {
    let q = [[r, c]];

    while (q.length) {
      let nq = [];

      for (let [r, c] of q) {
        for (let [dr, dc] of darr) {
          let nr = r + dr, nc = c + dc;
          if (!isIn(nr, nc, goal + 1, goal + 1) || bset.has(nr + ',' + nc)) continue;

          dsu.union(r * (goal + 1) + c, nr * (goal + 1) + nc);

          if (set.has(nr + ',' + nc)) continue;

          set.add(nr + ',' + nc);

          nq.push([nr, nc]);
        }
      }

      q = nq;
    }
  }
}

console.log(solve(input));