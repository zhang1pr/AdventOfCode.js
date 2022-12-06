const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let map = new Map(), set = new Set();
  let arr = readword(input);

  let A = [], B = [], C = [], D = [];
  let E = [...arr[1]].filter(a=>a!='#').fill('E');
  let state = [A, B, C, D, E];

  let first = [...arr[2]].filter(a=>a!='#');
  let second = [...arr[3]].filter(a=>a!='#' && a!=' ');

  for (let i=0;i<4;i++) {
    state[i].push(first[i]);
    state[i].push(second[i]);
  }

  let final = ['A', 'B', 'C', 'D'];
  let indices = [2, 4, 6, 8];
  let idxSet = new Set(indices);

  let cost = new Map([['A', 1], ['B', 10], ['C', 100], ['D', 1000]]);

  function getDist(col, i, j) {
    let col2 = indices[i];

    return Math.abs(col - col2) + j + 1;
  }

  function checkPath(col, i, j, top) {
    let col2 = indices[i];
    let start = Math.min(col, col2);
    let end = Math.max(col, col2);

    for (let i=start+1; i<end; i++) {
      if (top[i] != 'E') return false; 
    }

    return true;
  }

  function DFS(state) {
    let str = state.map(a => a.join('')).join(',');
    let res = Infinity;
    if (map.has(str)) return map.get(str);

    let ordered = new Set();
    for (let i=0;i<4;i++) {
      if (state[i].every(a => a == 'E' || a == final[i])) ordered.add(indices[i]);
    }

    let top = state[4];

    if (ordered.size == 4 && top.every(a=>a=='E')) res = 0; 
    else {
      let f = true;

      for (let col=0;col<top.length;col++) {
        if (top[col] == 'E' || idxSet.has(col)) continue;
  
        let ch = top[col];    
        let i = final.indexOf(ch);

        if (!ordered.has(indices[i])) continue;

        let room = state[i];

        for (let j=room.length-1;j>=0;j--) {
          if (room[j] == 'E') {

            if (checkPath(col, i, j, top)) {
              let nstate = state.map(a=>a.slice());
  
              nstate[4][col] = room[j];
              nstate[i][j] = top[col];
              
              let nstr = nstate.map(a=>a.join('')).join(',');

              if (map.has(nstr) || !map.has(nstr) && !set.has(nstr)) {
                set.add(nstr);
                f = false;

                res = Math.min(res, DFS(nstate) + getDist(col, i, j) * cost.get(ch));
              }
            }
  
            break;
          }
        }
      }
      
      if (f) {
        for (let i=0;i<4;i++) {
          if (ordered.has(indices[i])) continue;
    
          let room = state[i];
    
          for (let j=0; j<room.length; j++) {
            if (room[j] != 'E') {
              let ch = room[j];
    
              for (let col=0;col<top.length;col++) {
                if (top[col] != 'E' || idxSet.has(col)) continue;
    
                if (!checkPath(col, i, j, top)) continue;
    
                let nstate = state.map(a=>a.slice());
    
                nstate[4][col] = room[j];
                nstate[i][j] = top[col];
                let nstr = nstate.map(a=>a.join('')).join(',');
                
                if (!set.has(nstr)) {
                  set.add(nstr);
                  
                  res = Math.min(res, DFS(nstate) + getDist(col, i, j) * cost.get(ch));
                }
              } 
    
              break;
            }
          }
        }  
      }  
    }
    
    map.set(str, res);
    return res;
  }
  
  set.add(state.map(a => a.join('')).join(','));
  return DFS(state);
}
