export default {
  name: 'reconnecting',
  event () {
    this.emit('warn', 'Reconnecting...')
  }
}
