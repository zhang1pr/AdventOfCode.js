function B(input) {
  const characters = [...input];
  let count = 0;
  let flag = 0;

  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];

    if (flag === 0) {
      if (char === '<') {
        flag++;
      }
    } else {
      switch (char) {
        case '>':
          flag--;
          break;
        case '!':
          i++;
          break;
        default:
          count++;
      }
    }
  }

  return count;
}
