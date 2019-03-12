const Logger = require("./utils/logger");
const { isEven, getPairLine } = require("./utils/helpers");
const { Lawn, Mower, Commands } = require("./model");
const { runCmds } = require('./controller');

// This can be turned to a fully functional node server
// for now we just return the lineHandler construction function
const _noop = () => {}
// the callback is required when use `event-stream` map
const lineHandler = ({ lineCount, data }) => (line, cb = _noop) => {
  lineCount += 1;
  // The first line is the coordinates of the upper-right corner of the lawn
  if (lineCount === 1) {
    data.lawn = Lawn(line);
    Logger.info("lawn initialized");
    cb();
    return;
  }
  // The following first line (with even lineCount as the first one is lawn info)
  // gives the initial position and orientation of a mower.
  if (isEven(lineCount)) {
    const initPos = Mower(line, data);
    if (initPos) {
      data.mower = {
        key: lineCount,
        initPos
      };
      Logger.info(`mower NO.${lineCount / 2} initialized`);
    }
    cb();
    return;
  }
  // following second line is a sequence of instruction driving THAT mower across the lawn.
  // associate it with the first line as they belong to the same mower
  const pairKey = getPairLine(lineCount);
  const cmds = Commands(pairKey, line, data);
  const pos = runCmds(cmds);
  if (pos) {
    const result = `${pos.join(" ")}\n`
    Logger.notif(`The results for mower NO.${pairKey / 2} has been saved! It's ${result}`);
    cb(null, result);
    return;
  }
  cb();
};

module.exports = { lineHandler };
