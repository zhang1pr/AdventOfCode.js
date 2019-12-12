function B(input) {
  let length = input.length;

  while (input.indexOf('(') !== -1) {
    const index1 = input.indexOf('(');
    const index2 = input.indexOf(')');
    const marker = input.slice(index1, index2+1);
    const parts = marker.split('x');
    const number1 = parseInt(parts[0].slice(1), 10);
    const number2 = parseInt(parts[1].slice(0, -1), 10);
    let string = input.slice(index2+1, index2+1+number1);
    let stringCopy = string;
    let lengthDiff = 0;

    let markerCount = 0;
    for (let i = 0; i < string.length; i++) {
      if (markerCount !== 0) {
        markerCount --;
      }

      if (markerCount === 0 && string[i] !== '(') {
        length = length + number2 -1;
      }

      if (markerCount === 0 && string[i] === '(') {
        const otherIndex = string.indexOf(')', i);
        if (otherIndex === -1) {
          length = length + number2 -1;
          continue;
        }

        const innerMarkerPre = string.slice(i, otherIndex+1);
        const innerParts = innerMarkerPre.split('x');
        const innerNumber1 = parseInt(innerParts[0].slice(1), 10);
        const innerNumber2Pre = parseInt(innerParts[1].slice(0, -1), 10);
        const innerNumber2Post = innerNumber2Pre * number2;
        const innerMarkerPost = innerParts[0] + 'x' + innerNumber2Post.toString() + ')';

        stringCopy = stringCopy.slice(0, i+lengthDiff) + innerMarkerPost + stringCopy.slice(otherIndex+1+lengthDiff);
        markerCount += innerMarkerPre.length + innerNumber1;
        lengthDiff += innerNumber2Post.toString().length - innerNumber2Pre.toString().length;
      }
    }

    length += lengthDiff;
    length -= marker.length;
    input = input.slice(0, index1) + stringCopy + input.slice(index2+1+number1);
  }

  return length;
}
