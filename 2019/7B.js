function B(input) {
  const instructions = [];
  let max = 0;

  input.split(',').forEach(instruction => {
    if (instruction != null) {
      instructions.push(instruction);
    }
  });

  const array = getPermutation([9,8,7,6,5]);

  for (method of array) {
    let value = 0;
    let flag = true;
    let container = Array(5).fill(0).map(() => [instructions.slice(), 0]);
    let initialFlag = true;

    while (flag) {
      for (let i = 0; i < method.length; i++) {
        if (initialFlag) {
          result = From2019Day5B(container[i][0], container[i][1], [method[i], value]);
        } else {
          result = From2019Day5B(container[i][0], container[i][1], value);
        }

        if (Array.isArray(result) && result.length === 3) {
          value = result[0];
          container[i][1] = result[1];
          container[i][0] = result[2];
        } else {
          if (Array.isArray(result)) {
            value = result[1];
          } else {
            value = result;
          }

          if (i === 4) {
            flag = false;
            break;
          }
        }
      }
      initialFlag = false;
    }

    max = Math.max(max, value);
  }

  return max;
}

function From2019Day5B(instructions, position, value) {
  let target;

  while(true) {
    const opcode = instructions[position];
    let mode;

    if (opcode.length > 1) {
      mode = opcode.slice(opcode.length-2);
    } else {
      mode = opcode;
    }

    if (mode === '99') {
      return value;
    } else {
      mode = mode[mode.length-1];
    }

    if (mode === '4') {
      if (instructions[position].length === 3 && instructions[position][0] === '1') {

        target = instructions[position+1];
        position += 2;
        return [parseInt(target,10), position, instructions];
      } else {
        target = instructions[instructions[position+1]];
        position += 2;
        return [parseInt(target,10), position, instructions];
      }


    } else if (mode === '3') {
      if (Array.isArray(value)) {
        if (instructions[position].length === 3 && instructions[position][0] === '1') {
          instructions[position] = (value[0]).toString();
        } else {
          instructions[instructions[position+1]] = (value[0]).toString();
        }

        value = value[1];
      } else {
        if (instructions[position].length === 3 && instructions[position][0] === '1') {
          instructions[position] = (value).toString();
        } else {
          instructions[instructions[position+1]] = (value).toString();
        }
      }

      position += 2;
    } else {
      let number1;
      let number2;

      if (instructions[position].length <= 2) {
        number1 = instructions[instructions[position+1]];
        number2 = instructions[instructions[position+2]];
      } else if (instructions[position].length === 3) {
        number1 = instructions[position][0] === '1' ? instructions[position+1] : instructions[instructions[position+1]];
        number2 = instructions[instructions[position+2]];
      } else {
        number1 = instructions[position][1] === '1' ? instructions[position+1] : instructions[instructions[position+1]];
        number2 = instructions[position][0] === '1' ? instructions[position+2] : instructions[instructions[position+2]];
      }

      if (mode === '5') {
        if (number1 === '0') {
          position += 3;
        } else {
          position = parseInt(number2, 10);
        }

        continue;
      } else if (mode === '6') {
        if (number1 !== '0') {
          position += 3;
        } else {
          position = parseInt(number2, 10);
        }

        continue;
      }

      if (mode === '7') {
        if (parseInt(number1,10) >= parseInt(number2,10)) {
          instructions[instructions[position+3]] = '0';
        } else {
          instructions[instructions[position+3]] = '1';
        }
      } else if (mode === '8') {
        if (number1 !== number2) {
          instructions[instructions[position+3]] = '0';
        } else {
          instructions[instructions[position+3]] = '1';
        }
      } else if (mode === '1') {
        instructions[instructions[position+3]] = (parseInt(number1, 10) + parseInt(number2, 10)).toString();
      } else if (mode === '2') {
        instructions[instructions[position+3]] = (parseInt(number1, 10) * parseInt(number2, 10)).toString();
      }

      position += 4;
    }
  }
}

function getPermutation(target) {
  let result = [];

  const permute = (array, progress = []) => {
    if (array.length === 0) {
      result.push(progress);
    } else {
      for (let i = 0; i < array.length; i++) {
        let curr = array.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), progress.concat(next));
      }
    }
  }

  permute(target);

  return result;
}
