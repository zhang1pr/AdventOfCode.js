function A(input) {
  // Import SparkMD5
  // https://cdnjs.cloudflare.com/ajax/libs/q.js/1.4.1/q.js
  // https://cdnjs.cloudflare.com/ajax/libs/spark-md5/2.0.2/spark-md5.min.js

  let number = 0;
  let target = input;

  while (!SparkMD5.hash(target).startsWith('000000')) {
    number += 1;
    target = input + number.toString();
  }

  return number;
}
