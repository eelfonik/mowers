const { ORIENTATIONS, DIRECTIONS, CMDS } = require('./constants');
const { directionValidated, cmdsValidated } = require('./utils/validations');
const Logger = require('./utils/logger');
const { N, E, W, S } = ORIENTATIONS;

function move([x, y, orientation], lawn) {
  const { startPoint, endPoint } = lawn;
  const [minX, minY] = startPoint;
  const [maxX, maxY] = endPoint;
  switch (orientation) {
    case N:
      return y >= maxY ? [x, y, orientation] : [x, y + 1, orientation];
    case E:
      return x >= maxX ? [x, y, orientation]: [x + 1, y , orientation];
    case W:
      return x <= minX ? [x, y, orientation] : [x - 1, y , orientation];
    case S:
      return y <= minY ? [x, y, orientation] : [x, y - 1, orientation];
    default:
      throw new Error(`Coordinate info must contain orientation, and it should be one of ${Object.values(ORIENTATIONS)}`);
  }
}

function turn([x, y, orientation], direction) {
  if (!directionValidated(direction)) {
    throw new Error(`direction should be one of ${DIRECTIONS}`);
  }
  switch (orientation) {
    case N:
      return direction === 'R' ? [x, y, E] : [x, y, W];
    case E:
      return direction === 'R' ? [x, y, S] : [x, y, N];
    case W:
      return direction === 'R' ? [x, y, N] : [x, y, S];
    case S:
      return direction === 'R' ? [x, y, W] : [x, y, E];
    default:
      throw new Error(`Coordinate info must contain orientation, and it should be one of ${Object.values(ORIENTATIONS)}`);
  }
}

function runCmds(data) { 
  if (!data) {
    return null;
  }
  let erroredCmds = []
  const { cmds, lawn, mower } = data;
  const result = cmds.reduce((prevPos, cmd) => {
    if (!cmdsValidated(cmd)) {
      Logger.warn(`command ${cmd} not validated! Should be one of ${CMDS}. Move to next command`)
      erroredCmds.push(cmd)
      return prevPos
    }
    return cmd === 'F' ? move(prevPos, lawn) : turn(prevPos, cmd)
  }, mower.initPos)

  erroredCmds.length
    ? Logger.warn(
        `mower NO.${mower.key / 2} finished commands with invalid command: ${erroredCmds}`
      )
    : Logger.info(`mower NO.${mower.key / 2} finished all commands`);
  return result;
}

module.exports = { move, turn, runCmds };