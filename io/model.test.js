const { initReadStatus } = require('./model')

test('init read status with input source', () => {
  const inputSource = 'blabla';
  const init = initReadStatus(inputSource);
  expect(init).toHaveProperty('lineCount');
  expect(init).toHaveProperty('data', { inputSource })
})