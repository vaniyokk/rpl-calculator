const readline = jest.genMockFromModule('readline');

module.exports = {
    createInterface: jest.fn(() => {
        return {
            prompt: jest.fn(),
            on: jest.fn(),
            close: jest.fn()
        }
    })
}