const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let res = balance = 0;
  let isGarbage = false;

  for (let i=0; i<input.length; i++) {
    let ch = input[i];

    if (ch == '!')
      i++;
    else if (ch == '<')
      isGarbage = true;
    else if (ch == '>')
      isGarbage = false;  
    else if (ch == '{' && !isGarbage)
      balance++;
    else if (ch == '}' && !isGarbage) {
      res += balance;
      balance--;
    }
  }

  return res;
}
