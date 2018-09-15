import chalk from 'chalk'
import {timestamp} from '../../util/timestamp'

export default {
  name: 'warn',
  event (text) {
    const time = new Date()
    this.print.warn(`${timestamp(chalk.yellow('warning'))} ${text}`)
  }
}
