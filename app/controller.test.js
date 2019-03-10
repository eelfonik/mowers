const { move, turn, runCmds } = require('./controller')

test('move function test', () => {
  const lawn = {
    startPoint: [0, 0],
    endPoint: [10, 10]
  }
  expect(move([4, 8, 'N'], lawn)).toEqual([4, 9, 'N'])
  expect(move([4,8,"E"], lawn)).toEqual([5, 8, "E"])
  expect(move([4,8,"W"], lawn)).toEqual([3, 8, "W"])
  expect(move([4,8,"S"], lawn)).toEqual([4, 7, "S"])
  expect(() => move([4, 8, "F"], lawn)).toThrow()
})

test('turn different direction', () => {
  const initPos = [4, 8, 'N']
  expect(turn([4, 8, 'N'], 'R')).toEqual([4, 8, 'E'])
  expect(turn([4, 8, 'S'], 'R')).toEqual([4, 8, 'W'])
  expect(turn([4, 8, 'W'], 'R')).toEqual([4, 8, 'N'])
  expect(turn([4, 8, 'E'], 'R')).toEqual([4, 8, 'S'])
  expect(() => turn([4, 8, "F"], 'R')).toThrow()
  expect(() => turn(initPos, 'G')).toThrow()
})

test("test final position", () => {
  const data = {
    cmds: ["L", "F", "R", "F", "L", "R", "F", "F", "R"],
    lawn: {
      startPoint: [0, 0],
      endPoint: [5, 7]
    },
    mower: {
      key: 2,
      initPos: [5, 7, "N"]
    } 
  }
  const result = runCmds(data)
  const unexpected = ['9 10 E']
  // the results should not contain any value larger than the lawn size
  expect(result).not.toEqual(expect.arrayContaining(unexpected))
  expect(result).toEqual([4,7,"E"])
});
