function B(input) {
  const instructions = [];
  const array = [];

  let score;
  let ball;
  let paddle;
  let joystick;
  let count = 0;
  let output = [];
  let relativeBase = 0;
  let position = 0;

  input.split(',').forEach(instruction => {
    instructions.push(instruction);
  });

  instructions[position] = '2';

  while(true) {
    if (ball > paddle) {
      joystick = 1;
    } else if (ball < paddle) {
      joystick = -1;
    } else {
      joystick = 0;
    }

    output = From2019Day9A(instructions, joystick);

    if (!output) {
      return score;
    }

    const x = output[0];
    const y = output[1];

    if (x === -1 && y === 0) {
      count = count === 2 ? 0 : count + 1;
      score = output[2];
    }

    const key = output[2];

    if (key === 3) {
      paddle = x;
    }

    if (key === 4) {
      ball = x;
    }

    let sign;

    switch (key) {
      case 0:
        sign = ' ';
        break;
      case 1:
        sign = '|';
        break;
      case 2:
        sign = '■';
        break;
      case 3:
        sign = '_';
        break;
      case 4:
        sign = '●';
        break;
    }

    if (!array[y]) {
      array[y] = [];
    }
    array[y][x] = sign;

    if (ball && paddle) {
      setTimeout(console.log(
        array.reduce((prev, curr) => {
          return prev + '\n' + curr.reduce((prev, curr) => {
            return prev + curr;
          });
        }, '')
      ), 500);
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

    let output = [];

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
        output.push(parseInt(instructions[number1], 10));
        if (output.length === 3) {
          position += 2;
          return output;
        }
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
}
