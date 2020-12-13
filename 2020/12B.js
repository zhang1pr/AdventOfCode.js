function B(input) {
  const dMap = new Map();
  dMap.set('E', [1, 0]);
  dMap.set('W', [-1, 0]);
  dMap.set('S', [0, -1]);
  dMap.set('N', [0, 1]);

  const waypointMap = new Map([['E', 10], ['N', 1]]); 

  const rDir = ['N', 'E', 'S', 'W'];
  const lDir = rDir.slice().reverse();

  const arr = input.split('\n');
  let x = 0;
  let y = 0;
  for (const ins of arr) {
    const d = ins[0];
    let num = Number(ins.slice(1));

    if (d == 'F') {
      x += num * waypointMap.get('E');
      y += num * waypointMap.get('N');

      continue;
    }
 
    let cur1 = 'E';
    let cur1Val = waypointMap.get('E');
    let cur2 = 'N';
    let cur2Val = waypointMap.get('N');

    if (d == 'R' || d == 'L') {
      if (d == 'R') {
        cur1 = rDir[(rDir.indexOf(cur1) + num / 90) % 4];
        cur2 = rDir[(rDir.indexOf(cur2) + num / 90) % 4];
      }
     
      if (d == 'L') {
        cur1 = lDir[(lDir.indexOf(cur1) + num / 90) % 4];
        cur2 = lDir[(lDir.indexOf(cur2) + num / 90) % 4];
      }
  
      if (cur1 == 'W') {
        cur1Val = -cur1Val;
        cur1 = 'E';
      } else if (cur1 == 'S') {
        cur1Val = -cur1Val;
        cur1 = 'N';
      }
  
      if (cur2 == 'W') {
        cur2Val = -cur2Val;
        cur2 = 'E';
      } else if (cur2 == 'S') {
        cur2Val = -cur2Val;
        cur2 = 'N';
      }
    } else if (d == 'E' || d == 'W') {
      if (d == 'W') {
        num = -num;
      }

      cur1Val += num;
    } else {
      if (d == 'S') {
        num = -num;
      }

      cur2Val += num;
    }

    waypointMap.set(cur1, cur1Val);
    waypointMap.set(cur2, cur2Val);
  }

  return Math.abs(x) + Math.abs(y);
}
