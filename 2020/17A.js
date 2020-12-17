function A(input) {
  let set = new Set();

  let x1 = Infinity;
  let x2 = -Infinity;
  let y1 = Infinity;
  let y2 = -Infinity;
  let z1 = 0;
  let z2 = 0;

  const arr = input.split('\n');
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] == '#') {
        x1 = Math.min(x1, i);
        x2 = Math.max(x2, i);
        y1 = Math.min(y1, j);
        y2 = Math.max(y2, j);
        
        set.add(i.toString() + ',' + j.toString() + ',0');
      }
    }
  }

  for (let i = 0; i < 6; i++) {
    const newSet = new Set();  
    let nx1 = Infinity;
    let nx2 = -Infinity;
    let ny1 = Infinity;
    let ny2 = -Infinity;
    let nz1 = Infinity;
    let nz2 = -Infinity;

    for (let x = x1 - 1; x <= x2 + 1; x++) {
      for (let y = y1 - 1; y <= y2 + 1; y++) {
        for (let z = z1 - 1; z <= z2 + 1; z++) {
          const isActive = set.has(x.toString() + ',' + y.toString() + ',' + z.toString());
          let count = 0;

          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              for (let dz = -1; dz <= 1; dz++) {
                if (dx == 0 && dy == 0 && dz == 0) {
                  continue;
                }

                const nx = x + dx;
                const ny = y + dy;
                const nz = z + dz;
                
                if (set.has(nx.toString() + ',' + ny.toString() + ',' + nz.toString())) {
                  count++;
                }
              }
            }
          }

          if (isActive && (count == 2 || count == 3)) {
            newSet.add(x.toString() + ',' + y.toString() + ',' + z.toString());
            nx1 = Math.min(nx1, x);
            nx2 = Math.max(nx2, x);
            ny1 = Math.min(ny1, y);
            ny2 = Math.max(ny2, y);
            nz1 = Math.min(nz1, z);
            nz2 = Math.max(nz2, z);
          }

          if (!isActive && count == 3) {
            newSet.add(x.toString() + ',' + y.toString() + ',' + z.toString());
            nx1 = Math.min(nx1, x);
            nx2 = Math.max(nx2, x);
            ny1 = Math.min(ny1, y);
            ny2 = Math.max(ny2, y);
            nz1 = Math.min(nz1, z);
            nz2 = Math.max(nz2, z);
          }
        }
      }  
    }

    set = newSet;
    x1 = nx1;
    x2 = nx2;
    y1 = ny1;
    y2 = ny2;
    z1 = nz1;
    z2 = nz2;
  }

  return set.size;
}
