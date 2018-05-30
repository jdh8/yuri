module.exports = {
  name: 'test',
  group: 'test',
  run ({message, args}) {
    console.log('Running command!')
    message.reply('Test command')
  }
}
