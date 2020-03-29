module.exports = {
  createInterface: jest.fn(() => ({
    prompt: jest.fn(),
    on: jest.fn(),
    close: jest.fn(),
  })),
};
