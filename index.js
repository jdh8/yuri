const {KwClient} = require('./lib')
const commands = require('./commands')

const client = new KwClient()
client.addDefaults()
client.commands.groups.add([
  ['interjections', 'Interjections', '*Hnnnnng*'],
  ['test', 'Test', '`test`']
])
client.commands.add(commands)

client.login(process.env.KNIFEWIFE_TOKEN)
