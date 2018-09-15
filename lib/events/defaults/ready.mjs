import chalk from 'chalk'
import {generatePrefix} from '../../prefix/generate'
import {timestamp} from '../../util/timestamp'

export default {
  name: 'ready',
  event () {
    const time = new Date()
    this.print.log(`${timestamp(chalk.green('ready'))} Client logged in as ${this.user.username}#${this.user.discriminator} (${this.user.id})`)
    this.prefix = generatePrefix(this.prefix.options, this.user.id)
    this.user.setUsername(this.info.name)
      .then(user => {
        this.emit('debug', `Changed username to ${this.info.name}`)
      })
      .catch(err => this.emit('error', err))
    this.user.setGame(this.info.game)
      .then(user => {
        this.emit('debug', `Changed game to ${this.info.game}`)
      })
      .catch(err => this.emit('error', err))
    this.user.setAvatar(this.info.pfp)
      .then(user => {
        this.emit('debug', `Changed pfp to ${this.info.pfp}`)
      })
      .catch(err => this.emit('error', err))
  }
}
