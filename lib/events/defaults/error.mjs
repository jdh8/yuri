import chalk from 'chalk'
import {timestamp} from '../../util/timestamp'

export default {
  name: 'error',
  event (text) {
    const time = new Date()
    this.print.error(`${timestamp(chalk.bold.red('error'))} ${text}`)
  }
}
