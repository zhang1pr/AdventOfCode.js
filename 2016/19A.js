const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  input = +input;

  let q = [];
  for (let i = 1; i <= input; i++)
    q.push(i);

  while (q.length > 1) {
    let nq = [];

    if (q.length % 2 == 1)
      nq.push(q.at(-1));

    for (let i = 0; i < q.length - 1; i += 2)
      nq.push(q[i]);

    q = nq;
  }

  return q[0];
}