const {KwClient} = require('./lib/client')
const commands = require('./commands')

const client = new KwClient()
client.addDefaultEvents()
client.addDefaultGroups()
client.addDefaultCommands()
client.addGroups([
  ['interjections', 'Interjections', '*Hnnnnng*'],
  ['test', 'Test', '`test`']
])
client.addCommands(commands)

client.login(process.env.KNIFEWIFE_TOKEN)
