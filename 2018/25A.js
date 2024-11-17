const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
class DisjointSetUnion { constructor(i) { this.par = [...Array(i)].map((i, t) => t), this.rank = Array(i).fill(0), this.sz = Array(i).fill(1); } find(i) { return this.par[i] != i && (this.par[i] = this.find(this.par[i])), this.par[i]; } union(i, t) { let s = this.find(i), n = this.find(t); return s != n && (this.rank[s] < this.rank[n] && ([s, n] = [n, s]), this.rank[s] == this.rank[n] && this.rank[s]++, this.par[n] = s, this.sz[s] += this.sz[n], !0); } size(i) { return this.sz[this.find(i)]; } areInSameSet(i, t) { return this.find(i) == this.find(t); } }
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set();
  let arr = readword(input);
  let dsu = new DisjointSetUnion(arr.length);

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      let [a1, b1, c1, d1] = arr[i].split(',').map(a => +a);
      let [a2, b2, c2, d2] = arr[j].split(',').map(a => +a);

      if (Math.abs(a1 - a2) + Math.abs(b1 - b2) + Math.abs(c1 - c2) + Math.abs(d1 - d2) <= 3)
        dsu.union(i, j);
    }
  }

  for (let i = 0; i < arr.length; i++)
    set.add(dsu.find(i));

  return set.size;
}