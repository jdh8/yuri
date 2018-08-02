const {Collection} = require('discord.js')

module.exports = {
  name: 'test',
  group: 'test',
  run ({message, args}) {
    console.log('Running command!')
    message.reply('Test command')
  },
  events: new Collection().set('messageDelete', function () {
    this.emit('warn', 'A message was deleted!')
  })
}
