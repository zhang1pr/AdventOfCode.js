const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let str = input;
  let stack = [[0, 1]];
  let cur = '';

  for (let i = 0; i < str.length; i++) {
    let ch = str[i];

    if (ch >= '0' && ch <= '9' || ch == '-') {
      cur += ch;
    } else if (cur) {
      stack[stack.length - 1][0] += Number(cur);
      cur = '';
    }

    if (ch == '{') {
      stack.push([0, 1]);
    } else if (ch == '}') {
      let [num, multi] = stack.pop();
      stack[stack.length - 1][0] += num * multi;
    } else if (stack.length > 1 && str.slice(i - 2, i + 3) == ':"red') {
      stack[stack.length - 1][1] = 0;
    }
  }

  return stack[0][0];
}

console.log(solve(input));