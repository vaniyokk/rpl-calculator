const readline = require('readline');
import { calculateRPL, validateRPL } from './lib/rpl'
import { STARTUP_TEXT, EXIT_TEXT, EXIT_SYMBOL } from './config'

export default class RPLCalculator {
    constructor(input, output) {
        this.io = readline.createInterface({
            input,
            output
        });
        this.inputStack = [];
    }

    start() {
        console.log(STARTUP_TEXT);
        this.io
            .on('line', this.onInput.bind(this))
            .on('close', this.onClose.bind(this));
        this.io.prompt();
    }

    onInput(line) {
        if(line === EXIT_SYMBOL) {
            this.io.close();
        }
        this.processInput(line);
    }

    onClose() {
        console.log(EXIT_TEXT);
        process.exit(0);
    }

    processInput(input) {
        const trimmedInput = input.trim();
        this.inputStack = this.inputStack.concat(trimmedInput.split(' '));
        console.log(trimmedInput);
        
        try {
            if(validateRPL(this.inputStack)) {
                this.calculate()
            } else {
                this.io.prompt();
            }
        } catch(e) {
            console.log(`ERROR: ${e.message}`)
            this.reset();
        }
    }

    calculate() {
        const result = calculateRPL(this.inputStack);
        console.log('Result:', result, '\n');
        this.reset();
    }

    reset() {
        this.inputStack = [];
        this.io.prompt();
    }
}