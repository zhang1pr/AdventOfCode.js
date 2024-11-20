const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let str = input;

  while (str.length < 272) {
    let nstr = str + '0';

    for (let i = str.length - 1; i >= 0; i--)
      nstr += str[i] == '0' ? '1' : '0';

    str = nstr;
  }

  str = str.slice(0, 272);
  while (str.length % 2 == 0) {
    let nstr = '';

    for (let i = 0; i < str.length; i += 2)
      nstr += str[i] == str[i + 1] ? '1' : '0';

    str = nstr;
  }

  return str;
}

console.log(solve(input));