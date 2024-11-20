const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input);

  for (let i = 0; i < arr.length; i += 3) {
    let [a, b, c] = arr.slice(i, i + 3);

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

console.log(solve(input));