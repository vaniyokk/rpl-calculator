import { Operations, calculateRPL } from './lib/rpl';
import {
  STARTUP_TEXT,
  EXIT_TEXT,
  EXIT_SYMBOL,
  RESET_SYMBOL,
  VALID_INPUT_REGEXP,
  DIVIDER,
} from './config';

const readline = require('readline');

export default class RPLCalculator {
  constructor(inputStream, outputStream) {
    this.io = readline.createInterface({
      input: inputStream,
      output: outputStream,
    });
    this.inputStack = [];
  }

  static shutDown() {
    console.log(EXIT_TEXT);
    process.exit(0);
  }

  start() {
    console.log(STARTUP_TEXT);
    this.io.on('line', this.onInput.bind(this));
    this.io.on('close', RPLCalculator.shutDown);
    this.io.prompt();
  }

  onInput(input) {
    const trimmedInput = input.trim();

    try {
      if (!trimmedInput.match(VALID_INPUT_REGEXP)) {
        throw new Error('Syntax error! Check your input and try again from scratch!');
      }
      this.handleValidInput(trimmedInput);
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
      this.reset();
    } finally {
      this.io.prompt();
    }
  }

  /**
   * returns true if last symbol in stack is an operator
   * stack length greater than 1
   * and count of operators is one less than operands count
   */
  isStackReadyToCalculate() {
    // eslint-disable-next-line eqeqeq
    const readyReducer = (accum, item) => accum + ((item == +item) ? 1 : -1);
    const lastSymbol = this.inputStack[this.inputStack.length - 1];
    const isLastSymbolAnOperator = Object.values(Operations).join('').indexOf(lastSymbol) !== -1;
    const isOperatorsCountMatchOperands = this.inputStack.length > 1
      && this.inputStack.reduce(readyReducer, 0) === 1;
    return isLastSymbolAnOperator && isOperatorsCountMatchOperands;
  }

  handleValidInput(trimmedInput) {
    if (trimmedInput === EXIT_SYMBOL) {
      this.io.close();
    } else if (trimmedInput === RESET_SYMBOL) {
      this.reset();
      return;
    }

    this.inputStack = this.inputStack.concat(trimmedInput.split(' '));

    if (this.isStackReadyToCalculate()) {
      this.calculate();
    } else {
      console.log(trimmedInput);
    }
  }

  calculate() {
    const result = calculateRPL(this.inputStack.join(' '));
    this.inputStack = [result];
    console.log(result);
  }

  reset() {
    this.inputStack = [];
    console.log(DIVIDER);
  }
}
