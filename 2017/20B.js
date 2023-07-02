const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/-?\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let arr = readnum2d(input);
  let getASum = ([px,py,pz,vx,vy,vz,ax,ay,az]) => Math.abs(ax) + Math.abs(ay) + Math.abs(az);
  let getVSum = ([px,py,pz,vx,vy,vz,ax,ay,az]) => Math.abs(vx) + Math.abs(vy) + Math.abs(vz);
  let getPSum = ([px,py,pz,vx,vy,vz,ax,ay,az]) => Math.abs(px) + Math.abs(py) + Math.abs(pz);

  let res = 0;

  while (arr.length) {
    let narr = [];
    let set = new Set();
    let map = new Map();

    for (let i=0;i<arr.length;i++) {
      let [px,py,pz,vx,vy,vz,ax,ay,az] = arr[i];
      vx+=ax,vy+=ay,vz+=az;
      px+=vx,py+=vy,pz+=vz;
      let str = px+','+py+','+pz;

      narr.push([px,py,pz,vx,vy,vz,ax,ay,az]);
      if (!map.has(str))
        map.set(str, []);
      map.get(str).push(i);
    }

    for (let [k,v] of map)
      if (v.length > 1)
        for (let idx of v)
          set.add(idx)

    arr = narr.filter((data, idx) => !set.has(idx)).sort((a,b)=> getPSum(a) - getPSum(b));
    
    while (arr.length) {
      let last = arr.at(-1);
      let curasum = getASum(last), curvsum = getVSum(last);
      let restasum = 0, restvsum = 0;

      for (let i=0; i<arr.length-1; i++) {  
        restasum = Math.max(restasum, getASum(arr[i]));
        restvsum = Math.max(restvsum, getVSum(arr[i])); 
      }

      if (restasum > curasum || restvsum > curvsum) 
        break;

      arr.pop();
      res++;  
    }
  }

  return res;
}
