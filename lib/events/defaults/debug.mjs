import chalk from 'chalk'
import {timestamp} from '../../util/timestamp'

export default {
  name: 'debug',
  event (text) {
    const time = new Date()
    this.print.log(`${timestamp(chalk.italic.blue('debug'))} ${text}`)
  }
}
