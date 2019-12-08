function B(input) {
  const array = [];
  const message = [];
  let print = '';

  for (let i = 0; i < input.length; i += 25*6) {
    array.push(input.slice(i, (i+25*6)));
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

  for (i = 0; i < message.length; i += 25) {
    print += message.slice(i, (i+25)).join('') + '\n';
  }

  return print.replace(/1/g, '#').replace(/0/g, ' ');
}
