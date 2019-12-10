function B(input) {
  const asteroids = [];
  const map = new Map();
  const indices = [29, 28];
  let count = 0;
  let slope;
  let direction;
  let currentDirection;
  let nonNegativeSlopes = [];
  let negativeSlopes = [];

  input.split('\n').forEach((line, yIndex) => {
    [...line].forEach((letter, xIndex)=> {
      if (letter === '#') {
        asteroids.push([xIndex, yIndex]);
      }
    });
  });

  for (const targetIndices of asteroids) {
    if (targetIndices[0] === indices[0] && targetIndices[1] === indices[1]) {
      continue;
    } else if (targetIndices[0] === indices[0]) {
      slope = 'none';

      if (targetIndices[1] < indices[1]) {
        direction = 'right';
      } else {
        direction = 'left';
      }

      if (!map.has(slope)) {
        map.set(slope, {
          [direction]: [[targetIndices[0], targetIndices[1]]]
        });
      } else {
        const temp = map.get(slope);
        if (temp[direction]) {
          temp[direction].push([targetIndices[0], targetIndices[1]]);
          temp[direction] = temp[direction].sort((a,b) => b[0] - a[0]);
        } else {
          temp[direction] = [[targetIndices[0], targetIndices[1]]];
        }
        map.set(slope, temp);
      }
    } else {
      slope = (indices[1]-targetIndices[1])/(targetIndices[0]-indices[0]);

      if (slope >= 0) {
        if (!nonNegativeSlopes.includes(slope)) {
          nonNegativeSlopes.push(slope);
        }
      } else {
        if (!negativeSlopes.includes(slope)) {
          negativeSlopes.push(slope);
        }
      }

      if (targetIndices[0] >= indices[0]) {
        direction = 'right';
      } else {
        direction = 'left';
      }

      if (!map.has(slope)) {
        map.set(slope, {
          [direction]: [[targetIndices[0], targetIndices[1]]]
        });
      } else {
        const temp = map.get(slope);
        if (temp[direction]) {
          temp[direction].push([targetIndices[0], targetIndices[1]]);
          temp[direction] = temp[direction].sort((a,b) => b[0] - a[0]);
        } else {
          temp[direction] = [[targetIndices[0], targetIndices[1]]];
        }
        map.set(slope, temp);
      }
    }
  }

  nonNegativeSlopes.sort((a, b) => b-a);
  negativeSlopes.sort((a, b) => b-a);

  while (count <= 200) {
    currentDirection = currentDirection === 'right' ? 'left' : 'right';

    if (map.has('none') && map.get('none')[currentDirection] && map.get('none')[currentDirection].length > 0) {
      const target = map.get('none')[currentDirection].pop();
      count += 1;
      console.log(target);

      if (count === 200) {
        return 100*target[0] + target[1];
      }
    }

    for (const s of nonNegativeSlopes) {
      if (map.has(s) && map.get(s)[currentDirection] && map.get(s)[currentDirection].length > 0) {
        const target = map.get(s)[currentDirection].pop();
        count += 1;
        console.log(target);

        if (count === 200) {
          return 100*target[0] + target[1];
        }
      }
    }

    for (const s of negativeSlopes) {
      if (map.has(s) && map.get(s)[currentDirection] && map.get(s)[currentDirection].length > 0) {
        const target = map.get(s)[currentDirection].pop();
        count += 1;
        console.log(target);

        if (count === 200) {
          return 100*target[0] + target[1];
        }
      }
    }
  }

  return count;
}
