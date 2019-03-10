const {
  spacedStringToArray,
  stringToArray,
  maybeConvertToInt
} = require("./utils/helpers");
const Logger = require("./utils/logger");
const {
  lawnValidated,
  hasValidatedLawn,
  mowerValidated,
  hasAssociatedMower
} = require("./utils/validations");

/** 
 * @param {string} data - data contains info for lawn
 * @returns {object} - object contains startPoint & endPoint for lawn
*/
function Lawn(data) {
  const lawnInfo = spacedStringToArray(data).map(maybeConvertToInt);
  if (!lawnValidated(lawnInfo)) {
    // log then stop the process all together as we cannot resume from a failed lawn init
    Logger.error(
      `Lawn build error : initial size of lawn is not validated number`
    );
    process.exit(1);
  }
  const [x, y] = lawnInfo;
  const startPoint = [0, 0];
  const endPoint = [x, y];
  return { startPoint, endPoint };
}

function Mower(mowerInput, data) {
  if (!hasValidatedLawn(data)) {
    Logger.error("we have an non existing lawn...");
    return null;
  }
  const mowerInfo = spacedStringToArray(mowerInput).map(maybeConvertToInt);
  return mowerValidated(mowerInfo, data) ? mowerInfo : null;
}

function Commands(pairKey, cmdsInput, data) {
  if (!hasAssociatedMower(pairKey, data)) {
    Logger.error(
      `No paired mower NO.${pairKey /
        2} to associate the commands, skip to next mower`
    );
    return null;
  }
  return { cmds: stringToArray(cmdsInput), lawn: data.lawn, mower: data.mower };
}

module.exports = { Lawn, Mower, Commands };
