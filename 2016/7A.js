function A(input) {
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
    let outsideFlag = false;
    let insideFlag = true;

    for (const outside of ip[0]) {
      if (checkABBA(outside)) {
        outsideFlag = true;
        break;
      }
    }

    for (const inside of ip[1]) {
      if (checkABBA(inside)) {
        insideFlag = false;
        break;
      }
    }

    if (outsideFlag && insideFlag) {
      count += 1;
    }
  }

  return count;
}

function checkABBA(string) {
  for (let i = 0; i < string.length-3; i++) {
    if (string[i] === string[i+3] && string[i+1] === string[i+2] && string[i] !== string[i+1]) {
      return true;
    }
  }

  return false;
}
