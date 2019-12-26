function A(input) {
  const visitedSet = new Set();
  const directions = ['U', 'R', 'D', 'L'];
  let queue = [[1, 1]];
  let nextQueue = [];
  let steps = 1;

  while (true) {
    if (queue.length === 0) {
      queue = queue.concat(nextQueue);
      nextQueue = [];
      steps++;
    }

    const target = queue.shift();

    for (const directon of directions) {
      const newTarget = target.slice();

      switch (directon) {
        case 'U':
          newTarget[1] -= 1;
          break;
        case 'R':
          newTarget[0] += 1;
          break;
        case 'D':
          newTarget[1] += 1;
          break;
        case 'L':
          newTarget[0] -= 1;
      }

      if (newTarget[0] === 31 && newTarget[1] === 39) {
        return steps;
      }

      if (newTarget[0] < 0 || newTarget[1] < 0) {
        continue;
      }

      if (!visitedSet.has(newTarget.join(',')) && isOpenSpace(newTarget[0], newTarget[1], input)) {
        visitedSet.add(newTarget.join(','));
        nextQueue.push(newTarget);
      }
    }
  }
}

function isOpenSpace(x, y, input) {
  const number = x*x + 3*x + 2*x*y + y + y*y + input;
  const bits = [...(number).toString(2)].filter(a => a === '1').length;

  return bits % 2 === 0;
}
