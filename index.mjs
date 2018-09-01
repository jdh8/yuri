import {KwClient} from './lib'
import commands from './commands'

const client = new KwClient({
  prefix: {
    base: 'y.',
    enforceSpace: 'none'
  },
  commands: {
    disableDefaults: ['ping']
  },
  info: {
    name: 'KnifeWife',
    desc: 'A Yuri-themed Discord bot; Currently in public beta!',
    version: '1.0.0-beta.1',
    developer: 'owm#1337',
    owner: '212212754033934336',
    repo: 'https://github.com/owm111/knife-wife',
    invite: 'https://discord.gg/hb2MYX7'
  }
})
client.addGroups([
  ['fun', 'Fun', 'Non-serious commands'],
  ['util', 'Utility', 'Useful commands']
])
client.addCommands(commands)

client.login(process.env.KNIFEWIFE_TOKEN)
