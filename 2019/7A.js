function A(input) {
  const instructions = [];
  let max = 0;

  input.split(',').forEach(instruction => {
    if (instruction != null) {
      instructions.push(instruction);
    }
  });

  const array = getPermutation([0,1,2,3,4]);

  for (method of array) {
    let value = 0;
    for (element of method) {
      value = From2019Day5B(instructions.slice(), [element, value]);
    }

    max = Math.max(max, value);
  }

  return max;
}

function From2019Day5B(instructions, value) {
  let position = 2;
  let target;

  instructions[instructions[1]] = (value[0]).toString();

  while(true) {
    const opcode = instructions[position];
    let mode;

    if (opcode.length > 1) {
      mode = opcode.slice(opcode.length-2);
    } else {
      mode = opcode;
    }

    if (mode === '99') {
      return parseInt(target, 10);
    } else {
      mode = mode[mode.length-1];
    }

    if (mode === '4') {
      if (instructions[position].length === 3 && instructions[position][0] === '1') {
        target = instructions[position+1];
      } else {
        target = instructions[instructions[position+1]];
      }

      position += 2;
    } else if (mode === '3') {
      if (instructions[position].length === 3 && instructions[position][0] === '1') {
        instructions[position] = (value[1]).toString();
      } else {
        instructions[instructions[position+1]] = (value[1]).toString();
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
        if (parseInt(number1, 10) >= parseInt(number2, 10)) {
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
