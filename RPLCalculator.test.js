import RPLCalculator from './RPLCalculator';
import { EXIT_SYMBOL, RESET_SYMBOL, DIVIDER } from './config';
import mockPrint from './helpers';

jest.mock('readline');
jest.mock('./helpers');

const mockReadline = require('readline');

let calc = null;
beforeEach(() => {
  calc = new RPLCalculator(null, null);
  mockPrint.mockReset();
});

it('is properly initialized on construction', () => {
  expect(calc.inputStack).toEqual([]);
  expect(mockReadline.createInterface).toHaveBeenCalled();
});

it('is properly resets after calculation or error', () => {
  calc.inputStack = [1, 2, 3];
  calc.reset();
  expect(calc.inputStack).toEqual([]);
});

it('is binds listeners and shows prompt on start', () => {
  calc.start();
  expect(calc.io.on).toHaveBeenNthCalledWith(1, 'line', expect.any(Function));
  expect(calc.io.on).toHaveBeenNthCalledWith(2, 'close', expect.any(Function));
  expect(calc.io.prompt).toHaveBeenCalled();
});

it('is closes if receives exit symbol as input', () => {
  calc.onInput(EXIT_SYMBOL);
  expect(calc.io.close).toHaveBeenCalled();
});

it('shuts down gracefully when closed', () => {
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
  calc.onClose();
  expect(mockExit).toHaveBeenCalledWith(0);
  mockExit.mockRestore();
});

it('resets when input not passing regexp check', () => {
  const mockReset = jest.spyOn(calc, 'reset');
  calc.onInput('invalid');
  expect(mockReset).toHaveBeenCalled();
});

it('perform calculation when stack is ready', () => {
  const mockCalculate = jest.spyOn(calc, 'calculateAndRemember');
  calc.inputStack = ['5'];
  calc.onInput('6 +');
  expect(mockCalculate).toHaveBeenCalled();
});

it('ask for new input when stack is not ready yet', () => {
  calc.onInput('6');
  calc.onInput('5');
  expect(calc.io.prompt).toHaveBeenCalledTimes(2);
});

it('remembers calculation result for use', () => {
  calc.inputStack = ['5', '5', '+'];
  calc.calculateAndRemember();
  expect(calc.inputStack[0]).toEqual(10);
});

it('resets when user enter reset symbol', () => {
  const handleValidInput = jest.spyOn(calc, 'handleValidInput');
  const mockReset = jest.spyOn(calc, 'reset');
  calc.onInput(RESET_SYMBOL);
  expect(handleValidInput).toHaveBeenCalled();
  expect(mockPrint).toHaveBeenCalledWith(DIVIDER);
  expect(mockReset).toHaveBeenCalled();
});
