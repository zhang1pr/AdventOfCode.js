const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function A(input) {
  let arr = input.split(',').map(a=>+a);
  let nums = [...Array(256)].map((_,idx)=>idx);
  let skip = 0;
  let i = 0;

  for (let len of arr) {
    let end1 = i, end2 = i+len;

    if (end2 < nums.length) {
      nums = [...nums.slice(0,end1), ...nums.slice(end1, end2).reverse(), ...nums.slice(end2)];
    } else {
      end2 = end2 % nums.length;
      let reversed = [...nums.slice(end1), ...nums.slice(0, end2)].reverse();
      let newEnd = nums.length - end1;
      nums = [...reversed.slice(newEnd), ...nums.slice(end2, end1), ...reversed.slice(0, newEnd)];
    }

    i = (i + len + skip) % nums.length;
    skip++;
  }

  return nums[0]*nums[1];
}
