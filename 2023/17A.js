const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['v', [1, 0]], ['>', [0, 1]], ['^', [-1, 0]], ['<', [0, -1]]]);
const dstr = 'v<^>';
class Heap { constructor() { this.array = []; } peek() { return 0 === this.array.length ? null : this.array[0]; } poll() { if (0 === this.array.length) return null; if (1 === this.array.length) return this.array.pop(); const r = this.array[0]; return this.array[0] = this.array.pop(), this.heapifyDown(0), r; } add(r) { return this.array.push(r), this.heapifyUp(this.array.length - 1), this; } isEmpty() { return 0 == this.array.length; } heapifyUp(r) { let a = Math.floor((r - 1) / 2); for (; a >= 0 && !this.checkInvariant(this.array[a], this.array[r]);) [this.array[a], this.array[r]] = [this.array[r], this.array[a]], r = a, a = Math.floor((a - 1) / 2); } heapifyDown(r) { let a, t = 2 * r + 1, h = 2 * r + 2; for (; t < this.array.length && (a = h < this.array.length && this.checkInvariant(this.array[h], this.array[t]) ? h : t, !this.checkInvariant(this.array[r], this.array[a]));) [this.array[r], this.array[a]] = [this.array[a], this.array[r]], r = a, t = 2 * a + 1, h = 2 * a + 2; } checkInvariant(r, a) { return r[2] <= a[2]; } }
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readword(input), R = arr.length, C = arr[0].length;

  function f(x, y, tx, ty, arr) {
    let R = arr.length, C = arr[0].length;

    let getD = (x1, y1, x2, y2) => {
      return +arr[x2][y2];
    };

    let isValid = (x1, y1, x2, y2) => {
      return 0 <= x2 && x2 < R && 0 <= y2 && y2 < C;
    };

    let q = new Heap(), ds = new Map();
    q.add([x, y, 0, '>']);
    q.add([x, y, 0, 'v']);
    ds.set('0,0>', 0).set('0,0v', 0);
    let prev = new Map();

    while (!q.isEmpty()) {
      let [cx, cy, d, dir] = q.poll();
      if (d > ds.get(cx + ',' + cy + dir)) continue;

      let DS = [];

      let ch = dstr.indexOf(dir);
      let nd1 = dstr[(ch + 1) % 4], nd2 = dstr[(ch + 3) % 4];
      if (d == 0) DS.push([...dmap.get(dir), dir]);
      DS.push([...dmap.get(nd1), nd1]), DS.push([...dmap.get(nd2), nd2]);

      for (let [dx, dy, ndir] of DS) {
        let nx = cx, ny = cy, nd = d;

        for (let i = 1; i <= 3; i++) {
          nx += dx, ny += dy;
          if (!isValid(cx, cy, nx, ny)) break;
          nd += getD(cx, cy, nx, ny);

          let nstr = nx + ',' + ny + ndir;

          if (!ds.has(nstr) || ds.get(nstr) > nd) {
            prev.set(nx + ',' + ny + ndir, cx + ',' + cy + dir);
            ds.set(nstr, nd);
            q.add([nx, ny, nd, ndir]);
          }
        }
      }
    }

    let a = ds.get(tx + ',' + ty + 'v') ?? Infinity;
    let b = ds.get(tx + ',' + ty + '>') ?? Infinity;

    return Math.min(a, b);
  }

  return f(0, 0, R - 1, C - 1, arr);
}

console.log(solve(input));