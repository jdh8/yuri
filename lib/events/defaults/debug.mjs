import chalk from 'chalk'
import timestamp from '../../util/timestamp'

export default {
  name: 'debug',
  event (text) {
    const time = new Date()
    console.log(`${timestamp(chalk.italic.blue('debug'))} ${text}`)
  }
}
