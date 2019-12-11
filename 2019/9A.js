function A(input) {
  const instructions = [];

  input.split(',').forEach(instruction => {
    instructions.push(instruction);
  });

  positionObject = {
    1: 4,
    2: 4,
    3: 2,
    4: 2,
    7: 4,
    8: 4,
    9: 2
  }

  let relativeBase = 0;
  let position = 0;
  let value = 1;

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
