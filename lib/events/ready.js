module.exports = function () {
  this.emit('debug', `Client logged in as ${this.user.username}#${this.user.discriminator} (${this.user.id})`)
}
