function B(input) {
  let grid = [...Array(1000)].map(x => Array(1000).fill(0));

  input.split('\n').forEach(string => {
    if (string[4] !== ' ') {
      string = string.slice(0, 4) + ' ' + string.slice(4);
    }

    parts = string.split(' ');

    grid = takeAction(grid, parts[1], parts[2].split(','), parts[4].split(','));
  });

  return grid.reduce((prev, curr) => {
    return prev + curr.reduce((prev, curr) => {
      return prev + curr;
    });
  }, 0);
}

function takeAction(grid, action, start, end) {
  start[0] = parseInt(start[0], 10);
  start[1] = parseInt(start[1], 10);
  end[0] = parseInt(end[0], 10);
  end[1] = parseInt(end[1], 10);

  if (action === 'on') {
    for (let i = start[0]; i < end[0] + 1; i++) {
      for (let j = start[1]; j < end[1] + 1; j++) {
        grid[i][j] += 1;
      }
    }
  } else if (action === 'off') {
    for (let i = start[0]; i < end[0] + 1; i++) {
      for (let j = start[1]; j < end[1] + 1; j++) {
        if (grid[i][j] !== 0) {
          grid[i][j] -= 1;
        }
      }
    }
  } else {
    for (let i = start[0]; i < end[0] + 1; i++) {
      for (let j = start[1]; j < end[1] + 1; j++) {
        grid[i][j] += 2;
      }
    }
  }

  return grid;
}
