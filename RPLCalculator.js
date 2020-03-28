const readline = require('readline');
import { calculateRPL, validateRPL } from './lib/rpl'
import { 
    STARTUP_TEXT, 
    EXIT_TEXT, 
    EXIT_SYMBOL, 
    VALID_INPUT_REGEXP 
} from './config'

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
        this.io.on('line', this.onInput.bind(this));
        this.io.on('close', this.onClose.bind(this));
        this.io.prompt();
    }

    onInput(input) {
        const trimmedInput = input.trim();
        try {
            if(trimmedInput === EXIT_SYMBOL) {
                this.io.close();
            }

            if(!trimmedInput.match(VALID_INPUT_REGEXP)) {
                throw new Error('Check your input and try again from scratch!\n')
            }

            this.inputStack = this.inputStack.concat(trimmedInput.split(' '));
        
            if(validateRPL(this.inputStack)) {
                this.calculate()
            } else {
                console.log(trimmedInput);
            }
        } catch(e) {
            console.log(`ERROR: ${e.message}`)
            this.reset();
        } finally {
            this.io.prompt();
        }
    }

    onClose() {
        console.log(EXIT_TEXT);
        process.exit(0);
    }

    calculate() {
        const result = calculateRPL(this.inputStack);
        this.inputStack = [result];
        console.log(result);
    }

    reset() {
        this.inputStack = [];
    }
}