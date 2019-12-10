function A(input) {
  const asteroids = [];
  let count = 0;
  let localCount;
  let result = [];

  input.split('\n').forEach((line, yIndex) => {
    [...line].forEach((letter, xIndex)=> {
      if (letter === '#') {
        asteroids.push([xIndex, yIndex]);
      }
    });
  });

  for (const indices of asteroids) {
    const set = new Set();
    let zeroFlagLeft = false;
    let zeroFlagRight = false;
    localCount = 0;

    for (const targetIndices of asteroids) {
      if (targetIndices[0] === indices[0] && targetIndices[1] === indices[1]) {
        continue;
      } else if (targetIndices[0] === indices[0]) {
        if (targetIndices[1] > indices[1]) {
          zeroFlagRight = true;
        } else {
          zeroFlagLeft = true;
        }
      } else {
        const slope = (indices[1]-targetIndices[1])/(indices[0]-targetIndices[0]);

        if (!set.has(slope.toString() + (indices[0] > targetIndices[0]).toString())) {
          set.add(slope.toString() + (indices[0] > targetIndices[0]).toString());
          localCount++;
        }
      }
    }

    if (zeroFlagLeft) {
      localCount += 1;
    }

    if (zeroFlagRight) {
      localCount += 1;
    }

    if (localCount > count) {
      result = [indices[0], indices[1]]
    }

    count = Math.max(localCount, count);
  }

  return [count, result];
}
