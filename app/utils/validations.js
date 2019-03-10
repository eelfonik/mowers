const { ORIENTATIONS, DIRECTIONS, CMDS } = require("../constants");
const { isNumeric } = require("./helpers");
const Logger = require("./logger");

// constant check
const directionValidated = direction => DIRECTIONS.includes(direction);
const cmdsValidated = cmd => CMDS.includes(cmd);
const orientationValidated = orientation =>
  Object.values(ORIENTATIONS).includes(orientation);

// value check
const lawnValidated = lawnInfo => {
  const [x, y] = lawnInfo;
  return (
    isNumeric(x) && isNumeric(y) && x > 0 && y > 0 && lawnInfo.length === 2
  );
};

const hasValidatedLawn = data =>
  !!data.lawn && !!data.lawn.endPoint && lawnValidated(data.lawn.endPoint);

const mowerValidated = (mowerInfo, data) => {
  const [x, y, orientation] = mowerInfo;
  if (!isNumeric(x) || !isNumeric(y)) {
    Logger.error("initial position of mower is not validated number");
    return false;
  }
  if (!orientationValidated(orientation)) {
    Logger.error("orientation should be one of N, E, W, S");
    return false;
  }
  const [lawnX, lawnY] = data.lawn.endPoint;
  if (x > lawnX || x < 0 || y > lawnY || y < 0) {
    Logger.error(
      "one or more mowers is/are outside of lawn, please check their initial positions"
    );
    return false;
  }
  return true;
};

const hasAssociatedMower = (pairKey, data) =>
  !!data.mower && data.mower.key === pairKey && !!data.mower.initPos;

module.exports = {
  directionValidated,
  cmdsValidated,
  orientationValidated,
  lawnValidated,
  hasValidatedLawn,
  mowerValidated,
  hasAssociatedMower
};
