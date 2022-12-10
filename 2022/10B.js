const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let x = 1;
  let arr = readword2d(input);
  let pre = [1];
  let graph = [...Array(6)].map(()=>Array(40).fill('.'));

  for (let [ins,val] of arr) {
    if (ins == 'addx') {
      pre.push(x);
      val=+val;
      x+=val;
    }

    pre.push(x);
  }

  for (let i=0; i<pre.length; i++) {
    let r = Math.floor(i/40), c = i - r * 40;
    let pos = pre[i];

    if (pos - 1 <= c && c <= pos + 1)
      graph[r][c] = '#';
  } 
  
  return graph.map(a=>a.join('')).join('\n');
}
