export const validateRPL = (list) => {
    return list.length > 2 
        && list.reduce((accum, item) => accum += (item == +item) ? 1 : -1, 0) === 1
}

export const calculateRPL = (list) => {
    const operands = [];

    for(let item of list) {
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
        throw new Error('Syntax error! Check your input and try again from scratch!');
    } else {
        return operands.pop()
    }
}