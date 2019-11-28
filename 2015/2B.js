function B(input) {
  return input.split('\n').reduce((prev, curr) => {
    return prev + getRibbon(curr.split('x'));
  }, 0)
}

function getRibbon(array) {
  const sortedArray = array.map(a => parseInt(a, 10)).sort((a,b)=>(a-b));
  return sortedArray[0]*sortedArray[1]*sortedArray[2] + 2*(sortedArray[0] + sortedArray[1])
}
