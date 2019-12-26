function B(input) {
  // Import SparkMD5
  // https://cdnjs.cloudflare.com/ajax/libs/q.js/1.4.1/q.js
  // https://cdnjs.cloudflare.com/ajax/libs/spark-md5/2.0.2/spark-md5.min.js
  const map = new Map();
  let number = 0;
  let target = input + number.toString();
  let count = 0;
  let tripletNumber;

  while (count < 64) {
    let hash;
    if (map.has(number)) {
      hash = map.get(number);
    } else {
      hash = getHash(target);
      map.set(number, hash);
    }

    const letter = findTriplet(hash);
    if (letter) {
      tripletNumber = number+1;

      while (tripletNumber <= number + 1000) {
        target = input + tripletNumber.toString();

        let hash;
        if (map.has(tripletNumber)) {
          hash = map.get(tripletNumber);
        } else {
          hash = getHash(target);
          map.set(tripletNumber, hash);
        }

        if (findQuintuplet(hash, letter)) {
          count++;

          if (count === 64) {
            return number;
          }
        }

        tripletNumber++;
      }
    }

    number++;
    target = input + number.toString();
  }
}

function findTriplet(string) {
  for (let i = 0; i < string.length - 2; i++) {
    if (string[i+1] === string[i+2]) {
      if (string[i] === string[i+1]) {
        return string[i];
      }
    } else {
      i++;
      continue;
    }
  }

  return false;
}

function findQuintuplet(string, letter) {
  return string.indexOf(letter.repeat(5)) !== -1;
}

function getHash(hash) {
  let times = 2017;

  while (times > 0) {
    hash = SparkMD5.hash(hash);
    times--;
  }

  return hash;
}
