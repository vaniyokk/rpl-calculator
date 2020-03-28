const STARTUP_TEXT = 
`------------------------------------------------------------
This is CLI RPN (Reverse Polish Notation) calculator.
You can perform input as single string or sequentially input
operands and operators one by one.
Enter 'q' or press Ctrl+D to exit. 
-------------------------------------------------------------`
const EXIT_TEXT = '\nGood Bye!';
const EXIT_SYMBOL = 'q';
const RESET_SYMBOL = 'r';
const VALID_INPUT_REGEXP = /^[\d\s\+\-\*\/\.]+$/

export {
    STARTUP_TEXT,
    EXIT_TEXT,
    EXIT_SYMBOL,
    RESET_SYMBOL,
    VALID_INPUT_REGEXP
}