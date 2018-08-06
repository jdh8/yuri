module.exports = {
  name: 'disconnect',
  event () {
    this.emit('warn', 'Disconnected!')
  }
}
