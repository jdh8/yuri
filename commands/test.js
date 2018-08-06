module.exports = {
  name: 'test',
  group: 'test',
  run ({message, args}) {
    console.log('Running command!')
    message.reply('Test command')
  },
  events: [
    {
      name: 'messageDelete',
      event () {
        this.emit('warn', 'A message was deleted!')
      }
    }
  ]
}
