const readline = require('readline');

const STARTUP_TEXT = 
`
------------------------------------------------------------
This is CLI RPN (Reverse Polish Notation) calculator.
You can perform input as single string or sequentially input
operands and operators one by one.
-> Press Enter to start. 
<- Enter 'q' or press Ctrl+D to exit. 
-------------------------------------------------------------
`
const EXIT_TEXT = 'Good Bye!';
const ESC_SYMBOL = 'q';
const VALID_INPUT_REGEXP = /[\d\s\+\-\*\\\.]+/

export default class RPLCalculator {

    constructor(input, output) {
        this.io = readline.createInterface({
            input,
            output
        });
        this.inputStack = [];
        this.isStarted = false;
        this.opTypeCounter = 0;
    }

    start() {
        this.io.write(STARTUP_TEXT);
        this.io
            .on('line', this._onNewLine.bind(this))
            .on('close', this._onClose.bind(this));
    }

    _onNewLine(line) {
        if(line === ESC_SYMBOL) {
            this.io.close();
            return;
        }
        
        if(this.isStarted) {
            this._processInput(line);
        } else {
            this.isStarted = true;
            this.io.prompt()
        }
    }

    _onClose() {
        console.log(EXIT_TEXT);
        process.exit(0);
    }

    _processInput(input) {
        const trimmedInput = input.trim();

        try {
            if(!trimmedInput.match(VALID_INPUT_REGEXP)) {
                throw new Error('Invalid input value! Try again from scratch!\n');
            } else if(this.inputStack.length === 0 && trimmedInput.includes(' ')) {
                this.inputStack = trimmedInput.split(' ');
                this._calculate()
            } else {
                this.inputStack.push(trimmedInput);
                this.opTypeCounter += (+trimmedInput == trimmedInput) ? 1 : -1;
    
                if(this._isReadyToCalculate()) {
                    this._calculate()
                } else {
                    console.log(trimmedInput);
                    this.io.prompt();
                }
            }
        } catch(e) {
            console.log('ERROR:', e.message)
            this._reset();
        }
    }

    _isReadyToCalculate() {
        return this.inputStack.length > 1 && this.opTypeCounter === 1
    }

    _calculate() {
        const operands = [];

        for(let item of this.inputStack) {
            const num = +item; // cast to Number

            if(num == item) { // if casting successful - it's operand
                operands.push(num)
            } else { // it's an operator
                if('+-*/'.indexOf(item) === -1) {
                    throw new Error(`Unknown operator '${item}' found! Check your input and try again from scratch!\n`)
                }
                if(operands.length < 2) {
                    throw new Error(`Insufficient operands! Try again from scratch!\n`)
                }
                let o2 = operands.pop()
                let o1 = operands.pop()
                switch(item) {
                    case '+':
                        operands.push(o1 + o2); 
                        break;
                    case '-':
                        operands.push(o1 - o2); 
                        break;
                    case '*':
                        operands.push(o1 * o2); 
                        break;
                    case '/':
                        operands.push(o1 / o2); 
                        break;
                }
            }
        }

        if(operands.length !== 1) {
            throw new Error('Unknown error! Check your input and try again from scratch!');
        } else {
            console.log('Result:', operands.pop(), '\n');
            this._reset();
        }
    }

    _reset() {
        this.inputStack = [];
        this.opTypeCounter = 0;
        this.io.prompt();
    }
}