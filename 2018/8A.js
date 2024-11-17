const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readnum(input);

  function dfs(idx) {
    let [childNum, metadataNum] = [arr[idx], arr[idx + 1]];
    let curIdx = idx + 2;

    for (let i = 0; i < childNum; i++)
      curIdx = dfs(curIdx);

    for (let i = 0; i < metadataNum; i++) {
      res += arr[curIdx];
      curIdx++;
    }

    return curIdx;
  }

  dfs(0);

  return res;
}