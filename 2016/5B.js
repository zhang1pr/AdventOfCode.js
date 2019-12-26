function B(input) {
  // Import SparkMD5
  // https://cdnjs.cloudflare.com/ajax/libs/q.js/1.4.1/q.js
  // https://cdnjs.cloudflare.com/ajax/libs/spark-md5/2.0.2/spark-md5.min.js

  let number = 0;
  let target = input + number.toString();
  let result = [];

  while (result.filter(Boolean).length < 8) {
    const hash = SparkMD5.hash(target);

    if (hash.startsWith('00000') && !Number.isNaN(parseInt(hash[5], 10)) && parseInt(hash[5], 10) >= 0 && parseInt(hash[5], 10) <= 7) {
      const position = parseInt(hash[5], 10);

      if (position != null && !result[position]) {
        result[position] = hash[6];
      }
    }

    number += 1;
    target = input + number.toString();
  }

  return result.join('');
}
