# rpl-calculator - simple CLI reverse polish notation calculator

## Installation
1. Install node.js
2. Clone repository and go into project directory. Run 
```console
$ npm install
```

## How to use
To start application execute

```console
$ npm run start
```
You can write an RPL expression in one line or by parts (see examples below). Calculation starts when you end up entering whole valid expression. Calculations are made with 9 decimal places precision.

It's possible to use a result of previous evaluation.
Or if you want you can reset calculation and start from scratch by entering **'r'** symbol.

To close application enter **'q'** symbol or press **Ctrl+D**.

## Usage examples:

- Enter expression parts one by one
```
> 5
5
> 8
8
> +
13
```
---
- enter whole expression at once / use previous calculation
```
> 5 5 5 8 + + -
-13
> 13 +
0
```
---
- use more operands
```
> 5
5
> 9
9
> 1
1
> -
-
> /
0.625
```
---
## Development

To create build with babel run
```console
$ npm run build
```

If you want to run tests, execute following command
```console
$ npm run test
```

To lint your code with ESLint run
```console
$ npm run lint
```

## Architecture concepts
- validation has 2 stages: per-input stage and calculaton stage. First stage checks user input with regular expression (allows control characters and math expressions). First stage validation doesn't guarantee that whole expression is valid because it's not completed. Second stage is performed when stack is being processed and calculated. 
- calculation starts when user input ends with any supported operator and total operator count in expression is one less than operands count
- **big.js** library is used to perform calculations to avoid floating point accuracy error
- calculator function extracted from main app to better testability and separation of concerns
- Babel transpilation is done to allow ES module import and allow usage of all new JS language features
- ESlint used to ensure code quality rules

## TODO list:
- [x] use accurate math for calculations
- [ ] recover from input errors without previously entered data loss
- [ ] abstract and separate UI output
- [ ] enable lint before commit