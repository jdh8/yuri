export default {
  name: 'disconnect',
  event () {
    this.emit('warn', 'Disconnected!')
  }
}
