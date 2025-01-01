const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['N', [-1, 0]], ['S', [1, 0]], ['W', [0, -1]], ['E', [0, 1]]]);
const dstr = 'NESW';
class Heap { constructor() { this.array = []; } peek() { return 0 === this.array.length ? null : this.array[0]; } poll() { if (0 === this.array.length) return null; if (1 === this.array.length) return this.array.pop(); const r = this.array[0]; return this.array[0] = this.array.pop(), this.heapifyDown(0), r; } add(r) { return this.array.push(r), this.heapifyUp(this.array.length - 1), this; } isEmpty() { return 0 == this.array.length; } heapifyUp(r) { let a = Math.floor((r - 1) / 2); for (; a >= 0 && !this.checkInvariant(this.array[a], this.array[r]);) [this.array[a], this.array[r]] = [this.array[r], this.array[a]], r = a, a = Math.floor((a - 1) / 2); } heapifyDown(r) { let a, t = 2 * r + 1, h = 2 * r + 2; for (; t < this.array.length && (a = h < this.array.length && this.checkInvariant(this.array[h], this.array[t]) ? h : t, !this.checkInvariant(this.array[r], this.array[a]));) [this.array[r], this.array[a]] = [this.array[a], this.array[r]], r = a, t = 2 * a + 1, h = 2 * a + 2; } checkInvariant(r, a) { return r[0] <= a[0]; } }
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), res = 0;
  let arr = readword(input), R = arr.length, C = arr[0].length;

  let sr, sc, er, ec;

  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++)
      if (arr[r][c] == 'S')
        sr = r, sc = c;
      else if (arr[r][c] == 'E')
        er = r, ec = c;

  let srcSet = new Set([sr + ',' + sc]);
  let q = new Heap().add([0, sr, sc, 'E', srcSet]);
  map.set(sr + ',' + sc + 'E', [0, srcSet]);

  while (!q.isEmpty()) {
    let [w, r, c, dir, set] = q.poll();

    if (w > map.get(r + ',' + c + dir)) continue;

    if (r == er && c == ec)
      return set.size;

    let d1 = (dstr.indexOf(dir) + 1) % 4, d2 = (dstr.indexOf(dir) + 3) % 4;
    let k1 = r + ',' + c + d1, k2 = r + ',' + c + d2;

    if (!map.has(k1) || map.get(k1)[0] >= w + 1000) {
      let [k1w, k1set] = map.get(k1) || [];

      if (k1w == w + 1000)
        for (let p of set)
          k1set.add(p);
      else {
        let nset = new Set(set);
        map.set(k1, [w + 1000, nset]);
        q.add([w + 1000, r, c, dstr[d1], nset]);
      }
    }

    if (!map.has(k2) || map.get(k2)[0] >= w + 1000) {
      let [k2w, k2set] = map.get(k2) || [];

      if (k2w == w + 1000)
        for (let p of set)
          k2set.add(p);
      else {
        let nset = new Set(set);
        map.set(k2, [w + 1000, nset]);
        q.add([w + 1000, r, c, dstr[d2], nset]);
      }
    }

    let [dr, dc] = dmap.get(dir);
    let nr = r + dr, nc = c + dc;
    if (arr[nr][nc] == '#') continue;

    w++;
    let k3 = nr + ',' + nc + dir;

    if (!map.has(k3) || map.get(k3)[0] >= w) {
      let [k3w, k3set] = map.get(k3) || [];

      if (k3w == w)
        for (let p of set)
          k3set.add(p);
      else {
        set.add(nr + ',' + nc);
        map.set(k3, [w, set]);
        q.add([w, nr, nc, dir, set]);
      }
    }
  }
}

console.log(solve(input));