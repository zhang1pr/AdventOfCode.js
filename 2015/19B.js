const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let smap = new Map(), lmap = new Map(), chmap = new Map(), earr = [], res = 0;
  let arr = readword(input);
  let replace = arr.slice(0, arr.length-2).map(a => a.split(' => '));
  let molecule = arr[arr.length-1];
  
  for (let [a,b] of replace) {
    if (a == 'e') {
      earr.push(b);
      continue;
    }

    let last = b.length - 1, f = b[1] == b[1].toLowerCase();
    if (b[last] == 'r') {
      let mid = b.slice(f ? 4 : 3, last - 1);

      let head = f ? b.slice(0, 2) : b[0];
      if (!chmap.has(head)) chmap.set(head, []);
      chmap.get(head).push(mid);

      lmap.set(head + ',' + mid, a);
    } else {
      smap.set(b,a);
    }
  }

  function BFS(head, mid) {
    let end = head == 'e' ? earr : chmap.get(head), str = mid, steps = 0;

    while (true) {
      if (end.includes(str)) {
        break;
      }
      
      let f = false;

      for (let i=0;i<str.length;i++) {
        if (str[i] == str[i].toLowerCase()) continue;

        for (let j=i+1;j<str.length && j<i+4;j++) {
          let cstr = str.slice(i, j+1);
          if (smap.has(cstr)) {
            nstr = str.slice(0,i) + smap.get(cstr) + str.slice(j+1);
            
            steps++;
            f = true;
            break;
          }
        }

        if (f) break;
      }

      str = nstr;
    }

    return [steps+1, lmap.get(head + ',' + str)];
  }

  while (true) {
    let nmolecule = '';
    let RIdx, rIdx;
      
    for (let i=0; i<molecule.length;i++) {
      let cur = molecule[i];

      if (cur == 'R') RIdx = i;
      
      if (cur == 'r') {
        rIdx = i;
        let check = molecule[RIdx-1] == molecule[RIdx-1].toLowerCase();
        let start = check ? RIdx-2 : RIdx-1;
        let head = molecule.slice(start, RIdx);
        let mid = molecule.slice(RIdx+2, i-1);
        
        let [d, ch] = BFS(head, mid);
        if (d != null) {
          res += d;
          nmolecule = molecule.slice(0,start) + ch + molecule.slice(rIdx+1);
        }

        break;
      }
    }  

    if (rIdx == null) {
      let [d] = BFS('e', molecule);

      res += d;
      break;
    }

    molecule = nmolecule;
  }

  return res;
}