function A(input) {
  // Import SparkMD5
  // https://cdnjs.cloudflare.com/ajax/libs/q.js/1.4.1/q.js
  // https://cdnjs.cloudflare.com/ajax/libs/spark-md5/2.0.2/spark-md5.min.js

  let number = 0;
  let target = input + number.toString();
  let result = '';

  while(result.length < 8) {
    const hash = SparkMD5.hash(target);

    if (hash.startsWith('00000')) {
      result = result.concat(hash[5]);
    }

    number += 1;
    target = input + number.toString();
  }

  return result;
}
