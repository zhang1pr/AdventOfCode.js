function A(input) {
  const dMap = new Map();
  dMap.set('E', [1, 0]);
  dMap.set('W', [-1, 0]);
  dMap.set('S', [0, -1]);
  dMap.set('N', [0, 1]);

  const rDir = ['N', 'E', 'S', 'W'];
  const lDir = rDir.slice().reverse();

  const arr = input.split('\n');
  let cur = 'E';
  let x = 0;
  let y = 0;
  for (let ins of arr) {
    const d = ins[0];
    const num = Number(ins.slice(1));

    if (d == 'F') {
      d = cur;
    }

    if (d == 'R') {
      cur = rDir[(rDir.indexOf(cur) + num / 90) % 4];
      continue;
    }
   
    if (d == 'L') {
      cur = lDir[(lDir.indexOf(cur) + num / 90) % 4];
      continue;
    }

    const [nx,ny] = dMap.get(d);
    x += num * nx;
    y += num * ny;
  }

  return Math.abs(x) + Math.abs(y);
}
