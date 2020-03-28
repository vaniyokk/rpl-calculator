const readline = require('readline');
import { calculateRPL } from './lib/rpl'
import { 
    STARTUP_TEXT, 
    EXIT_TEXT, 
    EXIT_SYMBOL,
    RESET_SYMBOL,
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
            } else if(trimmedInput === RESET_SYMBOL) {
                this.reset()
                return;
            } else if(!trimmedInput.match(VALID_INPUT_REGEXP)) {
                throw new Error('Syntax error! Check your input and try again from scratch!\n')
            }

            this.inputStack = this.inputStack.concat(trimmedInput.split(' '));
        
            if('+-/*'.indexOf(this.inputStack[this.inputStack.length - 1]) !== -1) {
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
        this.io.prompt();
    }
}