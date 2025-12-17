const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
class DisjointSetUnion { constructor(i) { this.par = [...Array(i)].map((i, t) => t), this.rank = Array(i).fill(0), this.sz = Array(i).fill(1); } find(i) { return this.par[i] != i && (this.par[i] = this.find(this.par[i])), this.par[i]; } union(i, t) { let s = this.find(i), n = this.find(t); return s != n && (this.rank[s] < this.rank[n] && ([s, n] = [n, s]), this.rank[s] == this.rank[n] && this.rank[s]++, this.par[n] = s, this.sz[s] += this.sz[n], !0); } size(i) { return this.sz[this.find(i)]; } areInSameSet(i, t) { return this.find(i) == this.find(t); } }
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = [];
  let arr = readword(input).map(a => a.split(','));
  let dis = [], dsu = new DisjointSetUnion(arr.length);

  for (let i = 0; i < arr.length; i++) {
    let [a1, b1, c1] = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      let [a2, b2, c2] = arr[j];
      dis.push([(a1 - a2) ** 2 + (b1 - b2) ** 2 + (c1 - c2) ** 2, i, j]);
    }
  }

  dis.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < 1000; i++) {
    let [d, i1, i2] = dis[i];
    dsu.union(i1, i2);
  }

  for (let i = 0; i < arr.length; i++)
    if (dsu.find(i) == i)
      res.push(dsu.size(i));

  res.sort((a, b) => b - a);

  return res.slice(0, 3).reduce((a, b) => a * b);
}

console.log(solve(input));