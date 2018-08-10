const {KwClient} = require('./lib')
const commands = require('./commands')

const client = new KwClient({
  info: {
    name: 'KnifeWife',
    desc: 'A Yuri-themed Discord bot',
    version: '1.0.0-alpha',
    developer: 'owm#1337',
    owner: '212212754033934336',
    repo: 'https://github.com/owm111/knife-wife'
  }
})
client.addDefaults()
client.commands.groups.add([
  ['interjections', 'Interjections', '*Hnnnnng*'],
  ['test', 'Test', '`test`']
])
client.commands.add(commands)

client.login(process.env.KNIFEWIFE_TOKEN)
