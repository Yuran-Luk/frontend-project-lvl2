export default (array) => array
  .reduce((acc, n, index) => {
    const [indicate, key, value] = n;
    const newAcc = `${acc}\n  ${indicate} ${key}: ${value}`;
    if (index === array.length - 1) {
      return `${newAcc}\n}`;
    }
    return newAcc;
  }, '{');
