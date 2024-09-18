module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openingBrackets = new Set();
  const closingBrackets = new Set();
  const matchingBracket = {};

  for (const [open, close] of bracketsConfig) {
      openingBrackets.add(open);
      closingBrackets.add(close);
      matchingBracket[close] = open;
  }

  for (let char of str) {
      if (openingBrackets.has(char)) {
          if (stack.length > 0 && char === matchingBracket[char]) {
              if (stack[stack.length - 1] === char) {
                  stack.pop();
              } else {
                  stack.push(char);
              }
          } else {
              stack.push(char);
          }
      } else if (closingBrackets.has(char)) {
          if (stack.length > 0 && stack[stack.length - 1] === matchingBracket[char]) {
              stack.pop();
          } else {
              return false;
          }
      }
  }

  return stack.length === 0;
};