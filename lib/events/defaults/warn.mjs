import chalk from 'chalk'

export default {
  name: 'warn',
  event (text) {
    const time = new Date()
    console.log(time.getSeconds())
    console.warn(`[${
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
    } ${chalk.yellow('warning')}] ${text}`)
  }
}
