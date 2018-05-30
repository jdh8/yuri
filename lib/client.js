const Discord = require('discord.js')
const defaultCommands = require('./commands')

class KwClient extends Discord.Client {
  constructor ({prefix = 'kw', mentionPrefix = true, prefixEnforceSpace = false, prefixI = true, ...options}) {
    super(options)
    // Prefix
    this.prefix = prefix
    this.mentionPrefix = mentionPrefix
    this.prefixEnforceSpace = prefixEnforceSpace
    this.prefixI = prefixI
    // Commands
    this.commands = new Discord.Collection()
    this.groups = new Discord.Collection()

    this.on('message', message => {
      if (message.author.bot) return false
      const match = this.prefixRegex.exec(message)
      if (match == null) return false
      if (this.commands.has(match[2])) {
        const command = this.commands.get(match[2])
        command.run({
          message,
          args: match[3] ? match[4] : null,
          client: this
        })
      }
    })
  }
  get prefixRegex () {
    const space = this.prefixEnforceSpace ? this.prefixEnforceSpace === 'none' ? '' : '\\s+' : '\\s*'
    return new RegExp(`^(${this.prefix}${this.mentionPrefix ? `|<@!?${this.user.id}>` : ''})${space}(\\S*)(\\s+(.*))?`, this.prefixI ? 'i' : '')
  }
  addCommands (commands) {
    if (!Array.isArray(commands)) commands = Object.values(commands)
    for (const command of commands) {
      this.commands.set(command.name, command)
      if (!this.groups.has(command.group)) {
        this.groups.set(command.group, [command.name])
      } else {
        const group = this.groups.get(command.group)
        group.push(command.name)
        this.groups.set(command.group, group)
      }
    }
  }
  addDefaultCommands (commands = true) {
    if (commands === true) commands = Object.keys(defaultCommands)
    commands = commands.map(cmd => defaultCommands[cmd])
    this.addCommands(commands)
  }
}

module.exports = {
  KwClient
}
