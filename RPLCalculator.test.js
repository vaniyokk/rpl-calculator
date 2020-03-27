import RPLCalculator from './RPLCalculator'

const stdin = require('mock-stdin').stdin()
const stdio = {
    stdin, 
    stdout: process.stdout,
    stderr: process.stderr
};
let calc = null;

beforeEach(() => {
    calc = new RPLCalculator(stdio.stdin, stdio.stdout)
});

it('is properly initialized on construction', () => {
    const calc = new RPLCalculator(stdio.stdin, stdio.stdout)
    expect(calc.inputStack).toEqual([])
})

it('is properly resets after calculation or error', () => {
    const calc = new RPLCalculator(stdio.stdin, stdio.stdout)
    calc.inputStack = [1, 2, 3]
    calc.reset()
    expect(calc.inputStack).toEqual([])
})
