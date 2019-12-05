function A(input) {
  const instructions = [];
  let position = 2;

  input.split(',').forEach(instruction => {
    instructions.push(instruction);
  });

  instructions[instructions[1]] = '1';

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

    if (mode === '4') {
      if (instructions[position].length === 3 && instructions[position][0] === '1') {
        console.log(instructions[position+1]);
      } else {
        console.log(instructions[instructions[position+1]]);
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

      if (mode === '1') {
        instructions[instructions[position+3]] = (parseInt(number1, 10) + parseInt(number2, 10)).toString();
      } else if (mode === '2') {
        instructions[instructions[position+3]] = (parseInt(number1, 10) * parseInt(number2, 10)).toString();
      }

      position += 4;
    }
  }
}
