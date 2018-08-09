const {KwAdvClient, PrefixModule, EventModule, CommandModule} = require('./lib')
const commands = require('./commands')

const client = new KwAdvClient()
client.addModule('events', EventModule)
client.events.addDefaults('debug')
client.addModule('prefix', PrefixModule, {
  base: 'adv.',
  mention: false,
  enforceSpace: 'none',
  i: false
})
client.prefix.base = 'adv!'
client.addModule('commands', CommandModule)
client.commands.groups.addDefaults()
client.commands.groups.add([
  ['interjections', 'Interjections', '*Hnnnnng*'],
  ['test', 'Test', '`test`']
])
client.commands.addDefaults()
client.commands.add(commands)

client.login(process.env.KNIFEWIFE_TOKEN)
