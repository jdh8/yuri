const {KwClient} = require('./lib')
const commands = require('./commands')

const client = new KwClient()
client.addDefault()
client.addGroups([
  ['interjections', 'Interjections', '*Hnnnnng*'],
  ['test', 'Test', '`test`']
])
client.addCommands(commands)

client.login(process.env.KNIFEWIFE_TOKEN)
