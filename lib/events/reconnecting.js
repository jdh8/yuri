module.exports = {
  name: 'reconnecting',
  event () {
    this.emit('warn', 'Reconnecting...')
  }
}
