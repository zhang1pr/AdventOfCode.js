const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();const log = (...a) => console.log(...a);const dmap = new Map([['N', [1, 0]],['S', [-1, 0]],['W', [0, -1]],['E', [0, 1]],['NE', [1, 1]],['SE', [1, -1]],['SW', [-1, -1]],['NW', [-1, 1]],['U', [-1, 0]],['D', [1, 0]],['L', [0, -1]],['R', [0, 1]],['v', [1, 0]],['>', [0,1]],['^', [-1, 0]],['<', [0,-1]]]);const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];const ddarr = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];const dstr = 'NESW';
const readnum = (a) => a.split('\n').map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => a.split(/\s+/).map(a => Number(a)));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let res = 0;
  let arr = readword(input);

  for (let i = 0; i < arr.length; i+=3) {
    let [a,b,c] = arr.slice(i, i+3);

    for (let ch of a) {
      if (b.includes(ch) && c.includes(ch)) {
        if (ch >= 'a') res += ch.charCodeAt() - 97 + 1;
        else res += ch.charCodeAt() - 65 + 27;
        break;
      }
    }
  }

  return res;
}
