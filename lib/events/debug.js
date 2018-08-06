const chalk = require('chalk')

module.exports = {
  name: 'debug',
  event (text) {
    const time = new Date()
    console.log(`[${
      time.getHours() < 10
      ? `0${time.getHours()}`
      : time.getHours()
    }:${
      time.getMinutes() < 10
      ? `0${time.getMinutes()}`
      : time.getMinutes()
    }:${
      time.getSeconds() < 10
      ? `0${time.getSeconds()}`
      : time.getSeconds()
    } ${chalk.italic.blue('debug')}] ${text}`)
  }
}
