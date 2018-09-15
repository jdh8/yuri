import chalk from 'chalk'
import {generatePrefix} from '../../prefix/generate'
import {timestamp} from '../../util/timestamp'

export default {
  name: 'ready',
  event () {
    const time = new Date()
    this.print.log(`${timestamp(chalk.green('ready'))} Client logged in as ${this.user.username}#${this.user.discriminator} (${this.user.id})`)
    this.prefix = generatePrefix(this.prefix.options, this.user.id)
  }
}
