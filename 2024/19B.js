const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set(), res = 0;
  let [pattern, design] = readword(input);
  pattern = pattern.split(', ');
  design = design.split('\n');

  for (let p of pattern)
    set.add(p);

  for (let str of design) {
    let dp = Array(str.length + 1).fill(0);
    dp[0] = 1;

    for (let i = 0; i < str.length; i++)
      for (let s of set)
        if (str.slice(i, i + s.length).startsWith(s))
          dp[i + s.length] += dp[i];

    res += dp[str.length];
  }

  return res;
}

console.log(solve(input));