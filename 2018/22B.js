const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
class Heap{constructor(){this.array=[]}peek(){return 0===this.array.length?null:this.array[0]}poll(){if(0===this.array.length)return null;if(1===this.array.length)return this.array.pop();const r=this.array[0];return this.array[0]=this.array.pop(),this.heapifyDown(0),r}add(r){return this.array.push(r),this.heapifyUp(this.array.length-1),this}isEmpty(){return 0==this.array.length}heapifyUp(r){let a=Math.floor((r-1)/2);for(;a>=0&&!this.checkInvariant(this.array[a],this.array[r]);)[this.array[a],this.array[r]]=[this.array[r],this.array[a]],r=a,a=Math.floor((a-1)/2)}heapifyDown(r){let a,t=2*r+1,h=2*r+2;for(;t<this.array.length&&(a=h<this.array.length&&this.checkInvariant(this.array[h],this.array[t])?h:t,!this.checkInvariant(this.array[r],this.array[a]));)[this.array[r],this.array[a]]=[this.array[a],this.array[r]],r=a,t=2*a+1,h=2*a+2}checkInvariant(r,a){return r[3]<=a[3]}}
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let map = new Map();
  let [depth, x, y] = readnum(input);
  let M = 20183;
  let torch = 0, climbing = 1, neither = 2;
  let equip = [[torch, climbing], [climbing, neither], [torch, neither]]

  let indexArr = [...Array(y+1)].map(() => Array(x+1).fill(null));
  indexArr[0][0] = 0;
  indexArr[y][x] = 0;

  function getIndex(i, j) {
    if (i == indexArr.length)
      indexArr.push(indexArr[0].slice().fill(null));

    if (indexArr[i][j] != null)
      return indexArr[i][j];

    let index;

    if (i == 0)
      index = (j * 16807 + depth) % M
    else if (j == 0)
      index = (i * 48271 + depth) % M;
    else
      index = (getIndex(i, j-1) * getIndex(i-1, j) + depth) % M

    indexArr[i][j] = index;

    return index;
  }

  let pq = new Heap().add([0,0,0,0]);
  map = new Map().set('0,0,0', 0);

  while (!pq.isEmpty()) {
    let [i, j, tool, w] = pq.poll();

    if (i == y && j == x && tool == 0) return w;
    if (i == y && j == x && tool == 1) {
      pq.add([i,j,0,w+7]);
      map.set(i+','+j+',0', w+7);
      continue;
    }

    let [tool1, tool2] = equip[getIndex(i, j) % 3];
    if (tool1 != tool && tool2 != tool) continue;

    let str1 = i+','+j+','+tool1, str2 = i+','+j+','+tool2;
    let w1 = tool == tool1 ? w : w + 7, w2 = tool == tool2 ? w : w + 7;

    if ((map.get(str1) || Infinity) < w1) w1 = Infinity;
    if ((map.get(str2) || Infinity) < w2) w2 = Infinity;

    for (let [di,dj] of darr) {
      let ni =i+di, nj=j+dj;
      if (ni < 0 || nj < 0) continue;

      let [tool3, tool4] = equip[getIndex(ni, nj) % 3];
      let str3 = ni+','+nj+','+tool3, str4 = ni+','+nj+','+tool4;
      let w3 = Math.min(tool3 == tool1 ? w1 : Infinity, tool3 == tool2 ? w2 : Infinity) + 1;
      let w4 = Math.min(tool4 == tool1 ? w1 : Infinity, tool4 == tool2 ? w2 : Infinity) + 1;

      if ((map.get(str3) || Infinity) > w3) {
        pq.add([ni,nj,tool3,w3]);
        map.set(str3, w3);
      }

      if ((map.get(str4) || Infinity) > w4) {
        pq.add([ni,nj,tool4,w4]);
        map.set(str4, w4);
      }
    }
  }
}