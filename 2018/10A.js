const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const ddarr = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
const readnum = (a) => (a.match(/-?\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let arr = readnum2d(input);
  let maxx = maxy = -Infinity, minx = miny = Infinity;

  while (true) {
    let set = new Set();
    
    for (let i = 0; i < arr.length; i++) {
      let [x, y, dx, dy] = arr[i];

      arr[i][0] += dx;
      arr[i][1] += dy;
      set.add(arr[i][0] + ',' + arr[i][1]);
    }

    let good = true;
    for (let i = 0; i < arr.length; i++) {
      let [x, y] = arr[i];

      let f = false;
      for (let [dx, dy] of ddarr) {
        let nx = x + dx, ny = y + dy;
      
        if (set.has(nx + ',' + ny)) 
          f = true;
      }
      
      if (!f) {
        good = false;
        break;
      }
    }

    if (good)
      break;
  }

  for (let i = 0; i < arr.length; i++) {
    let [x, y] = arr[i];
  
    maxx = Math.max(maxx, x);
    maxy = Math.max(maxy, y);
    minx = Math.min(minx, x);
    miny = Math.min(miny, y);
  }

  let mat = [...Array(maxy-miny+1)].map(() => Array(maxx-minx+1).fill(' '));

  for (let [x, y] of arr) 
    mat[y-miny][x-minx] = '#';  

  return mat.reduce((a,b) => a + '\n' + b.join(''), '');
}
