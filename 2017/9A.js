function A(input) {
  const characters = [...input];
  let count = 0;
  let group = 0;
  let flag = 0;

  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];

    if (flag === 0) {
      switch (char) {
        case '{':
          group++;
          break;
        case '}':
          count += group;
          group--;
          break;
        case '<':
          flag++;
      }
    } else {
      switch (char) {
        case '>':
          flag--;
          break;
        case '!':
          i++;
      }
    }
  }

  return count;
}
