const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function B(input) {
  let arr = readnum(input);

  function dfs(idx) {
    let [childNum, metadataNum] = [arr[idx], arr[idx + 1]];
    let curIdx = idx + 2;
    let curSum = 0;
    let childSum = [];

    if (childNum > 0) {
      for (let i = 0; i < childNum; i++) {
        let results = dfs(curIdx);
        curIdx = results[0];
        childSum.push(results[1]);
      }

      for (let i = 0; i < metadataNum; i++) {
        curSum += childSum[arr[curIdx] - 1] || 0;
        curIdx++;
      }
    } else {
      for (let i = 0; i < metadataNum; i++) {
        curSum += arr[curIdx];
        curIdx++;
      }
    }

    return [curIdx, curSum];
  }

  return dfs(0)[1];
}