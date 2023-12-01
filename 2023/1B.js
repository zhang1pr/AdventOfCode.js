const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let res = 0;
  let arr = readword(input);
  let wordArr = 'one, two, three, four, five, six, seven, eight, nine'.split(', ');

  for (let str of arr) {
    let num = '';

    for (let i = 0; i < str.length; i++) {
      let ch = str[i];

      if (ch >= '0' && ch <= '9') {
        num += ch;
      } else {
        let nstr = str.slice(i);

        for (let j = 0; j < wordArr.length; j++)
          if (nstr.startsWith(wordArr[j]))
            num += (j + 1);
      }
    }

    res += +(num[0] + num.at(-1));
  }

  return res;
}