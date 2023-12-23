const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['v', [1, 0]], ['>', [0, 1]], ['^', [-1, 0]], ['<', [0, -1]]]);
const dstr = 'v<^>';
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let arr = readword(input), R = arr.length, C = arr[0].length;

  function getD(x, y, tx, ty, arr) {
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
    ds.set('0,0v', 0).set('0,0>', 0);
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

        for (let i = 1; i <= 10; i++) {
          nx += dx, ny += dy;
          if (!isValid(cx, cy, nx, ny)) break;
          nd += getD(cx, cy, nx, ny);

          if (i < 4) continue;

          let nstr = nx + ',' + ny + ndir;

          if (!ds.has(nstr) || ds.get(nstr) > nd) {
            prev.set(nx + ',' + ny + ndir, cx + ',' + cy + dir);
            ds.set(nstr, nd);
            q.add([nx, ny, nd, ndir]);
          }
        }
      }
    }

    let a = ds.get(tx + ',' + ty + 'v') || Infinity;
    let b = ds.get(tx + ',' + ty + '>') || Infinity;

    return Math.min(a, b);
  }

  return getD(0, 0, R - 1, C - 1, arr);
}

class Heap {
  constructor() {
    this.array = [];
  }

  peek() {
    if (this.array.length === 0) {
      return null;
    }

    return this.array[0];
  }

  poll() {
    if (this.array.length === 0) {
      return null;
    }

    if (this.array.length === 1) {
      return this.array.pop();
    }

    const item = this.array[0];

    this.array[0] = this.array.pop();
    this.heapifyDown(0);

    return item;
  }

  add(item) {
    this.array.push(item);
    this.heapifyUp(this.array.length - 1);
    return this;
  }

  isEmpty() {
    return this.size() == 0;
  }

  size() {
    return this.array.length;
  }

  heapifyUp(childIndex) {
    let parentIndex = Math.floor((childIndex - 1) / 2);

    while (parentIndex >= 0 && !this.checkInvariant(this.array[parentIndex], this.array[childIndex])) {
      [this.array[parentIndex], this.array[childIndex]] = [this.array[childIndex], this.array[parentIndex]];
      childIndex = parentIndex;
      parentIndex = Math.floor((parentIndex - 1) / 2);
    }
  }

  heapifyDown(parentIndex) {
    let childIndex1 = parentIndex * 2 + 1;
    let childIndex2 = parentIndex * 2 + 2;
    let nextIndex;

    while (childIndex1 < this.array.length) {
      if (childIndex2 < this.array.length && this.checkInvariant(this.array[childIndex2], this.array[childIndex1])) {
        nextIndex = childIndex2;
      } else {
        nextIndex = childIndex1;
      }

      if (this.checkInvariant(this.array[parentIndex], this.array[nextIndex])) {
        break;
      }

      [this.array[parentIndex], this.array[nextIndex]] = [this.array[nextIndex], this.array[parentIndex]];
      parentIndex = nextIndex;
      childIndex1 = nextIndex * 2 + 1;
      childIndex2 = nextIndex * 2 + 2;
    }
  }

  checkInvariant(a, b) {
    return a[2] <= b[2];
  }
}