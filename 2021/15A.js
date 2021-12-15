const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
class Heap{constructor(){this.array=[]}peek(){return 0===this.array.length?null:this.array[0]}poll(){if(0===this.array.length)return null;if(1===this.array.length)return this.array.pop();const r=this.array[0];return this.array[0]=this.array.pop(),this.heapifyDown(0),r}add(r){return this.array.push(r),this.heapifyUp(this.array.length-1),this}isEmpty(){return 0==this.array.length}heapifyUp(r){let a=Math.floor((r-1)/2);for(;a>=0&&!this.checkInvariant(this.array[a],this.array[r]);)[this.array[a],this.array[r]]=[this.array[r],this.array[a]],r=a,a=Math.floor((a-1)/2)}heapifyDown(r){let a,t=2*r+1,h=2*r+2;for(;t<this.array.length&&(a=h<this.array.length&&this.checkInvariant(this.array[h],this.array[t])?h:t,!this.checkInvariant(this.array[r],this.array[a]));)[this.array[r],this.array[a]]=[this.array[a],this.array[r]],r=a,t=2*a+1,h=2*a+2}checkInvariant(r,a){return r[2]<=a[2]}}
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map(), res = 0;
  let arr = readword(input).map(a => a.split('').map(a=>+a));
  let R = arr.length, C = arr[0].length;
  res = arr.map(a=>a.slice().fill(0));

  let pq = new Heap().add([0,0,0]);
  map = new Map().set('0,0', 0);
    
  while (!pq.isEmpty()) {
    let [i, j, w] = pq.poll();
  
    let str = i+','+j;  
    if (i == R-1 && j == C-1) return w;
    if ((map.get(str) || Infinity) < w) continue; 
      
    for (let [di,dj] of darr) {
      let ni =i+di, nj=j+dj;
      if (arr[ni] == null || arr[ni][nj] == null) continue;
      let w2 = w + arr[ni][nj];
      let nstr = ni+','+nj;

      if ((map.get(nstr) || Infinity) <= w2) continue;
        
      pq.add([ni,nj,w2]);
      map.set(nstr, w2);
    }  
  } 
}
