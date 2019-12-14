function B(input) {
  return input.split('\n').reduce((prev, curr) => {
    const passwords = curr.split(' ').map(p => p.split('').sort().join(''));
    return prev + (new Set(passwords).size === passwords.length ? 1 : 0);
  }, 0);
}
