const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
class DisjointSetUnion { constructor(i) { this.par = [...Array(i)].map((i, t) => t), this.rank = Array(i).fill(0), this.sz = Array(i).fill(1); } find(i) { return this.par[i] != i && (this.par[i] = this.find(this.par[i])), this.par[i]; } union(i, t) { let s = this.find(i), n = this.find(t); return s != n && (this.rank[s] < this.rank[n] && ([s, n] = [n, s]), this.rank[s] == this.rank[n] && this.rank[s]++, this.par[n] = s, this.sz[s] += this.sz[n], !0); } size(i) { return this.sz[this.find(i)]; } areInSameSet(i, t) { return this.find(i) == this.find(t); } }
const readnum = (a) => (a.match(/-?\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let t = 0;
  let arr = readnum2d(input);
  let W = 101, H = 103;
  let halfw = Math.floor(W / 2), halfh = Math.floor(H / 2);

  let MOD = (x, mod) => (x % mod + mod) % mod;

  while (true) {
    t++;

    let map = new Map();
    let dsu = new DisjointSetUnion(arr.length);
    let size = arr.length;

    for (let i = 0; i < arr.length; i++) {
      let [px, py, vx, vy] = arr[i];
      let x = MOD(px + t * vx, W), y = MOD(py + t * vy, H);

      for (let [dx, dy] of darr) {
        let nx = x + dx, ny = y + dy;
        if (!isIn(nx, ny, W, H) || !map.has(nx + ',' + ny)) continue;

        dsu.union(i, map.get(nx + ',' + ny));
        size--;
      }

      map.set(x + ',' + y, i);
    }

    if (size < arr.length / 2) return t;
  }
}

console.log(solve(input));