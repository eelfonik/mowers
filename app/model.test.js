const { Lawn, Mower, Commands } = require('./model');

test('build lawn with input info', () => {
  const lawn =  Lawn('8 9')
  // start point should always be the same [0, 0]
  expect(lawn).toHaveProperty('startPoint', [0, 0]);
  // end point should corresponds with the input size
  expect(lawn).toHaveProperty('endPoint', [8, 9]);
})

test("build mower with input info", () => {
  const lawn = {
    startPoint: [0, 0],
    endPoint: [8, 9]
  }
  expect(Mower('4 5 E', { lawn })).toEqual([4, 5, 'E']);
  expect(Mower('10 100 90', { lawn })).toBeNull
  expect(Mower('4 5 E', {lawn: {}})).toBeNull
})

test("build cmds with command input", () => {
  const lawn = {
    startPoint: [0, 0],
    endPoint: [8, 9]
  }
  const mower = {
    key: 2,
    initPos: [2, 3,'N']
  }
  expect(Commands(2, 'FLRT', { lawn, mower })).toEqual({
    cmds: ["F", "L", "R", "T"],
    lawn,
    mower,
  });
  // if the pariKey is not equal the key of mower, the Commands build should return null
  expect(Commands(4, 'FLRT', { lawn, mower })).toBeNull
})