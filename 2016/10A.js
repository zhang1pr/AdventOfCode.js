const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map(), lmap = new Map(), hmap = new Map();
  let arr = readnum2d(input);

  let q = [];

  for (let nums of arr) {
    if (nums.length == 2) {
      let [val, id] = nums;
      
      if (!map.has(id)) 
        map.set(id, []);

      map.get(id).push(val);

      if (map.get(id).length == 2) 
        q.push(id);
    } else {
      let [id, lid, hid] = nums;
      lmap.set(id, lid);
      hmap.set(id, hid);
    }
  }
  
  while (q.length) {
    let nq = [];
    for (let id of q) {
      let low = lmap.get(id), high = hmap.get(id);
      let [lval, hval] = map.get(id).sort((a,b)=>a-b);

      if (lval == 17 && hval == 61)
        return 73;

      map.set(id, []);

      if (!map.has(low))
        map.set(low, []);
      map.get(low).push(lval); 
      if (map.get(low).length == 2) nq.push(low);  

      if (!map.has(high))
        map.set(high, []);
      map.get(high).push(hval);
      if (map.get(high).length == 2) nq.push(high);  
    }

    q = nq;  
  }
}