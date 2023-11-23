const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
class Heap { constructor() { this.array = []; } peek() { return 0 === this.array.length ? null : this.array[0]; } poll() { if (0 === this.array.length) return null; if (1 === this.array.length) return this.array.pop(); const r = this.array[0]; return this.array[0] = this.array.pop(), this.heapifyDown(0), r; } add(r) { return this.array.push(r), this.heapifyUp(this.array.length - 1), this; } isEmpty() { return 0 == this.array.length; } heapifyUp(r) { let a = Math.floor((r - 1) / 2); for (; a >= 0 && !this.checkInvariant(this.array[a], this.array[r]);) [this.array[a], this.array[r]] = [this.array[r], this.array[a]], r = a, a = Math.floor((a - 1) / 2); } heapifyDown(r) { let a, t = 2 * r + 1, h = 2 * r + 2; for (; t < this.array.length && (a = h < this.array.length && this.checkInvariant(this.array[h], this.array[t]) ? h : t, !this.checkInvariant(this.array[r], this.array[a]));) [this.array[r], this.array[a]] = [this.array[a], this.array[r]], r = a, t = 2 * a + 1, h = 2 * a + 2; } checkInvariant(r, a) { return r[0] <= a[0]; } }
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let map = new Map(), indexMap = new Map(), res = 0;

  let arr = readword(input).map(a => {
    let cur = a.split(' ');
    return [cur[0], cur[2], +cur[4]];
  });

  let i = 0;
  for (let [a, b, w] of arr) {
    if (!indexMap.has(a)) {
      indexMap.set(a, i);
      i++;
    }

    if (!indexMap.has(b)) {
      indexMap.set(b, i);
      i++;
    }

    if (!map.has(a)) map.set(a, []);
    if (!map.has(b)) map.set(b, []);
    map.get(a).push([b, w]);
    map.get(b).push([a, w]);
  }

  let N = indexMap.size;

  for (let cur of map.keys()) {
    let curIdx = indexMap.get(cur);
    let bit = 1 << curIdx;

    let pq = new Heap().add([0, cur, bit]);
    let strMap = new Map().set(cur + ',' + bit, 0);

    while (!pq.isEmpty()) {
      let [curw, curcity, bit] = pq.poll();
      let str = curcity + ',' + bit;
      if (strMap.has(str) && strMap.get(str) > curw) continue;

      for (let [nei, w] of (map.get(curcity) || [])) {
        let nw = curw + w;
        let nidx = indexMap.get(nei);
        let nbit = bit | 1 << nidx;

        if (nbit == bit) continue;

        if (nbit == (1 << N) - 1) {
          res = Math.max(res, nw);
          break;
        }

        let nstr = nei + ',' + nbit;
        if (strMap.has(nstr) && strMap.get(nstr) >= nw) continue;

        pq.add([nw, nei, nbit]);
        strMap.set(nstr, nw);
      }
    }
  }

  return res;
}