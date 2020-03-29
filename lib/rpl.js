const Big = require('big.js');

/**
 * A list of supported operators
 */
export const Operations = Object.freeze({
  ADD: '+',
  SUBTRACT: '-',
  DIVIDE: '/',
  MULTIPLY: '*',
});

/**
 * Function takes a string representing mathematical expression in reverse polish notation
 * and returns a result of calculation
 * It throws an errors in case of invalid syntax
 * @param array list - calculation stack
 */
export const calculateRPL = (expression) => {
  const PRECISION = 9;
  const operands = [];
  const list = expression.split(' ');

  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    const num = +item; // cast to Number

    // eslint-disable-next-line eqeqeq
    if (num == item) { // if casting to Number successful - it is operand
      operands.push(num);
    } else { // else treat item as an operator
      if (operands.length < 2) {
        throw new Error('Insufficient operands! Try again from scratch!');
      }
      const o2 = operands.pop();
      const o1 = operands.pop();
      switch (item) {
        case Operations.ADD:
          operands.push(Big(o1).plus(o2).toFixed(PRECISION));
          break;
        case Operations.SUBTRACT:
          operands.push(Big(o1).minus(o2).toFixed(PRECISION));
          break;
        case Operations.MULTIPLY:
          operands.push(Big(o1).times(o2).toFixed(PRECISION));
          break;
        case Operations.DIVIDE:
          operands.push(Big(o1).div(o2).toFixed(PRECISION));
          break;
        default:
          throw new Error(`Unknown operator '${item}' found! Check your input and try again from scratch!`);
      }
    }
  }

  if (operands.length !== 1) {
    throw new Error('Syntax error! Check your input and try again from scratch!');
  } else {
    return parseFloat(operands.pop());
  }
};
