const isNumeric = num => !isNaN(parseFloat(num)) && isFinite(num);
const isEven = num => isNumeric(num) ? num % 2 == 0 : false;
const getPairLine = num => isNumeric(num) ? num - 1 : null;
const maybeConvertToInt = num => isNumeric(num) ? parseInt(num, 10) : num;
const spacedStringToArray = str => str.split(" ").map(maybeConvertToInt);
const stringToArray = str => str.split("").map(maybeConvertToInt);

module.exports = { isNumeric, isEven, getPairLine, maybeConvertToInt, spacedStringToArray, stringToArray };