module.exports = {
  createInterface: jest.fn().mockReturnValue({
    question: jest
      .fn()
      .mockImplementationOnce((_question, cb) => cb("5 5"))
      .mockImplementationOnce((_question, cb) => cb("2 3 E"))
      .mockImplementationOnce((_question, cb) => cb("FF")),
    close: jest.fn().mockImplementationOnce(() => {}),
  })
};
