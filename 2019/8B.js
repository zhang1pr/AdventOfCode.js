function B(input) {
  const array = [];
  const message = [];

  for (let i = 0; i < input.length; i++) {
    array.push(input.slice(0, 25*6));
    input = input.slice(25*6);
  }

  for (let i = 0; i <25*6; i++) {
    message.push('2');
  }

  for (let i=0; i<array.length; i++) {
    for (let j=0; j<25*6; j++) {
      if (message[j] === '2') {
        message[j] = array[i][j];
      }
    }
  }

  return message.join('');
}
