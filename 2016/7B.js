function B(input) {
  const ips = [];
  let count = 0;

  input.split('\n').forEach(line => {
    let start = 0;
    let outsides = [];
    let insides = [];

    for (let i = 0; i < line.length; i++) {
      if (line[i] === '[') {
        outsides.push(line.slice(start, i));
        start = i + 1;
      } else if (line[i] === ']') {
        insides.push(line.slice(start, i));
        start = i + 1;
      }

      if (i === line.length-1) {
        outsides.push(line.slice(start));
      }
    }

    ips.push([outsides, insides]);
  });

  for (const ip of ips) {
    let flag = false;

    const outsideArray = checkABA(ip[0]);
    const insideArray = checkABA(ip[1]);

    for (const outside of outsideArray) {
      for (const inside of insideArray) {
        if (outside[0] === inside[1] && outside[1] === inside[0]) {
          flag = true;
          break;
        }
      }
    }

    if (flag) {
      count += 1;
    }
  }

  return count;
}

function checkABA(stringArray) {
  const array = [];

  for (const string of stringArray) {
    for (let i = 0; i < string.length-2; i++) {
      if (string[i] === string[i+2] && string[i] !== string[i+1]) {
        array.push([string[i], string[i+1]]);
      }
    }
  }

  return array;
}
