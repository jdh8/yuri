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
    name: 'Yuri',
    desc: 'A Yuri-themed Discord bot. Currently in public beta! Please join the support server for information about future updates!',
    version: '1.0.0-beta.1',
    developer: 'owm#1337',
    owner: '212212754033934336',
    repo: 'https://github.com/owm111/knife-wife',
    invite: 'https://discord.gg/PEgCkej',
    game: 'Use y.help',
    pfp: './assets/avatar.jpg'
  }
})
client.addGroups([
  ['fun', 'Fun', 'Non-serious commands'],
  ['util', 'Utility', 'Useful commands']
])
client.addCommands(commands)

client.login(process.env.KNIFEWIFE_TOKEN)
