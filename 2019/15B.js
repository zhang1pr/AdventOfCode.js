function B(input) {
  const instructions = [];
  const path = [];
  const backPath = [];
  const wallSet = new Set();
  const visitedSet = new Set();
  const directions = ['N', 'S', 'W', 'E'];
  let system;
  let point = [0, 0];

  let relativeBase = 0;
  let position = 0;

  input.split(',').forEach(instruction => {
    instructions.push(instruction);
  });

  while (true) {
    let newPoint;
    let direction;
    let backDirection;
    let flag = true;
    for (const d of directions) {
      direction = d;

      switch (d) {
        case 'N':
          backDirection = 'S';
          newPoint = [point[0], point[1]+1];
          break;
        case 'S':
          backDirection = 'N';
          newPoint = [point[0], point[1]-1];
          break;
        case 'W':
          backDirection = 'E';
          newPoint = [point[0]-1, point[1]];
          break;
        case 'E':
          backDirection = 'W';
          newPoint = [point[0]+1, point[1]];
      }

      if (!visitedSet.has(newPoint.join(',')) && !wallSet.has(newPoint.join(','))) {
        flag = false;
        break;
      }
    }

    if (flag) {
      if (path.length === 0) {
        break;
      }

      visitedSet.add(point.join(','));
      backDirection = backPath.pop();
      point = path.pop();
      From2019Day9A(instructions, directions.indexOf(backDirection) + 1);
    } else {
      const number = From2019Day9A(instructions, directions.indexOf(direction) + 1);

      if (number === 0) {
        wallSet.add(newPoint.join(','));
      } else {
        if (number === 2) {
          system = point.slice();
        }

        path.push(point.slice());
        visitedSet.add(point.join(','));
        point = newPoint;
        backPath.push(backDirection);
      }
    }
  }

  function From2019Day9A(instructions, value) {
    positionObject = {
      1: 4,
      2: 4,
      3: 2,
      4: 2,
      7: 4,
      8: 4,
      9: 2
    }

    while(true) {
      const opcode = instructions[position];
      let mode;

      if (opcode.length > 1) {
        mode = opcode.slice(opcode.length-2);
      } else {
        mode = opcode;
      }

      if (mode === '99') {
        return;
      } else {
        mode = mode[mode.length-1];
      }

      let number1;
      let number2;
      let number3;
      if (instructions[position].length <= 2) {
        number1 = instructions[position+1];
        number2 = instructions[position+2];
        number3 = instructions[position+3];
      } else if (instructions[position].length === 3) {
        if (instructions[position][0] === '1') {
          number1 = position+1;
        } else if (instructions[position][0] === '2') {
          number1 = parseInt(instructions[position+1], 10) + relativeBase;
        } else {
          number1 = instructions[position+1];
        }

        number2 = instructions[position+2];
        number3 = instructions[position+3];
      } else if (instructions[position].length === 4){
        if (instructions[position][1] === '1') {
          number1 = position+1;
        } else if (instructions[position][1] === '2') {
          number1 = parseInt(instructions[position+1], 10) + relativeBase;
        } else {
          number1 = instructions[position+1];
        }

        if (instructions[position][0] === '1') {
          number2 = position+2;
        } else if (instructions[position][0] === '2') {
          number2 = parseInt(instructions[position+2], 10) + relativeBase;
        } else {
          number2 = instructions[position+2];
        }

        number3 = instructions[position+3];
      } else if (instructions[position].length === 5){
        if (instructions[position][2] === '1') {
          number1 = position+1;
        } else if (instructions[position][2] === '2') {
          number1 = parseInt(instructions[position+1], 10) + relativeBase;
        } else {
          number1 = instructions[position+1];
        }

        if (instructions[position][1] === '1') {
          number2 = position+2;
        } else if (instructions[position][1] === '2') {
          number2 = parseInt(instructions[position+2], 10) + relativeBase;
        } else {
          number2 = instructions[position+2];
        }

        if (instructions[position][0] === '1') {
          number3 = position+3;
        } else if (instructions[position][0] === '2') {
          number3 = parseInt(instructions[position+3], 10) + relativeBase;
        } else {
          number3 = instruction[position+3];
        }
      }

      if (mode === '9') {
        relativeBase += parseInt(instructions[number1], 10);
      } else if (mode === '4') {
        position += 2;
        return parseInt(instructions[number1], 10);
      } else if (mode === '3') {
        instructions[number1] = value.toString();
      } else if (mode === '5') {
        if (instructions[number1] === '0') {
          position += 3;
        } else {
          position = parseInt(instructions[number2], 10);
        }
        continue;
      } else if (mode === '6') {
        if (instructions[number1] !== '0') {
          position += 3;
        } else {
          position = parseInt(instructions[number2], 10);
        }
        continue;
      } else if (mode === '7') {
        if (parseInt(instructions[number1], 10) >= parseInt(instructions[number2], 10)) {
          instructions[number3] = '0';
        } else {
          instructions[number3] = '1';
        }
      } else if (mode === '8') {
        if (instructions[number1] !== instructions[number2]) {
          instructions[number3] = '0';
        } else {
          instructions[number3] = '1';
        }
      } else if (mode === '1') {
        instructions[number3] = (parseInt(instructions[number1], 10) + parseInt(instructions[number2], 10)).toString();
      } else if (mode === '2') {
        instructions[number3] = (parseInt(instructions[number1], 10) * parseInt(instructions[number2], 10)).toString();
      }

      position += positionObject[mode];
    }
  }

  return fillOxygen(visitedSet, system, directions);
}

function fillOxygen(visitedSet, system, directions) {
  let path = [1, system];
  let time = 0;

  while (visitedSet.size > 0 || path.length > 1) {
    const newPath = [];

    while (path.length > 0) {
      const point = path.shift();

      if (point === 1) {
        time += 1;
        continue;
      }

      let newPoint;

      for (const d of directions) {
        switch (d) {
          case 'N':
            newPoint = [point[0], point[1]+1];
            break;
          case 'S':
            newPoint = [point[0], point[1]-1];
            break;
          case 'W':
            newPoint = [point[0]-1, point[1]];
            break;
          case 'E':
            newPoint = [point[0]+1, point[1]];
        }

        if (visitedSet.has(newPoint.join(','))) {
          newPath.push(newPoint.slice());
          visitedSet.delete(newPoint.join(','));
        }
      }
    }

    path = path.concat(1, newPath);
  }

  return time;
}
