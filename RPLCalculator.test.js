import RPLCalculator from './RPLCalculator'
var mockCli = require('mock-cli');
var assert = require('assert');
 
var argv = ['node', 'hello-world-app.js', '--foo', 'bar']; // Fake argv
var stdio = {
    stdin: require('./mocks/fakeInputStream'), // Hook up a fake input stream
    stdout: process.stdout, // Display the captured output in the main console
    stderr: process.stderr // Display the captured error output in the main console
};

it('is properly initialized on construction', () => {
    const calc = new RPLCalculator()
})