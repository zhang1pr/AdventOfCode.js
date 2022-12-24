const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['S', [1, 0]],['N', [-1, 0]],['W', [0, -1]],['E', [0, 1]],['NE', [-1, 1]],['SE', [1, 1]],['SW', [1, -1]],['NW', [-1, -1]]]);
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let arr = readword(input).map(a=>a.split(''));
  let elf = new Set();
  let moves = 'NSWE'.split('');
  let moveMap = new Map([
    ['N', 'N, NE, NW'.split(', ')],
    ['S', 'S, SE, SW'.split(', ')],
    ['W', 'W, NW, SW'.split(', ')],
    ['E', 'E, NE, SE'.split(', ')]
  ]);


  let minR = minC = 0, maxR = arr.length-1, maxC = arr[0].length-1;
  for (let r=minR;r<=maxR;r++)
    for (let c=minC;c<=maxC;c++)
      if (arr[r][c] == '#')
        elf.add(r+','+c);
        
  for (let i = 0; i < 10; i++) {
    countMap = new Map();
    
    let go = new Map();
    for (let str of elf) {
      let [r,c] = str.split(',').map(a=>+a);

      let count = 0;
      for (let [dr,dc] of dmap.values())
        if (elf.has([r+dr,c+dc].join(',')))
          count++;

      if (count == 0) 
        continue;

      for (let ch of moves) {
        let f = true, [dr,dc] = dmap.get(ch);
        let nr=r+dr,nc=c+dc;
          
        for (let nei of moveMap.get(ch)) {
          let [ddr,ddc] = dmap.get(nei);
          let nnr=r+ddr,nnc=c+ddc;
          if (elf.has(nnr+','+nnc)) {
            f = false;
            break;
          }
        }

        if (!f) continue;

        go.set(r+','+c, nr+','+nc);
        countMap.set(nr+','+nc, (countMap.get(nr+','+nc) || 0) + 1);
        break;
      }
    }
    
    if (go.size == 0) 
      break;

    let nelf = new Set();
    for (let str of elf)
      if (go.has(str)) {
        let nstr = go.get(str);

        if (countMap.get(nstr) == 1)
          nelf.add(nstr);
        else {
          nelf.add(str)
        } 
      } else {
        nelf.add(str);
      }
      
    moves.push(moves.shift());
    elf = nelf;

    minR=minC=Infinity;
    maxR=maxC=-Infinity;
    for (let str of elf) {
      let [r,c] = str.split(',').map(a=>+a);
  
      minR = Math.min(r,minR);
      minC = Math.min(c,minC);
      maxR = Math.max(r,maxR);
      maxC = Math.max(c,maxC);
    }
  }

  return (maxR-minR+1)*(maxC-minC+1) - elf.size;
}