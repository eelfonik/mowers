const chalk = require('chalk');

const info = text => console.log(chalk.green(text))
const warn = text => console.debug(chalk.yellow(text))
const error = text => console.error(chalk.red(text))
const notif = text => console.log(chalk.blue(text))

module.exports = {
  info,
  warn,
  error,
  notif
}
