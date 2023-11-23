const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let res = 0, len = input.length;

  for (let i = 0; i < len / 2; i++)
    if (input[i + len / 2] == input[i])
      res += input[i] * 2;

  return res;
}