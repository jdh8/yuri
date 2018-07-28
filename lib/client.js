const Discord = require('discord.js')
const defaultCommands = require('./commands')

class KwClient extends Discord.Client {
  constructor ({prefix = 'kw', mentionPrefix = true, prefixEnforceSpace = false, prefixI = true, ...options}) {
    // Default setup for Discord.js client
    super(options)
    // Prefix Options
    this.prefix = prefix
    this.mentionPrefix = mentionPrefix
    this.prefixEnforceSpace = prefixEnforceSpace
    this.prefixI = prefixI
    // Commands
    this.commands = new Discord.Collection()
    this.groups = new Discord.Collection()

    // Set events
    // Message
    this.on('message', message => {
      // Ignore if from bot
      if (message.author.bot) return false
      // Match to prefix
      const match = this.prefixRegex.exec(message)
      // Ignore if doesn't have prefix
      if (match == null) return false
      // Find command
      if (this.commands.has(match[2])) {
        const command = this.commands.get(match[2])
        // Run command
        command.run({
          message,
          args: match[3] ? match[4] : null,
          client: this
        })
      }
    })
  }
  get prefixRegex () {
    // Add space options
    const space = this.prefixEnforceSpace ? this.prefixEnforceSpace === 'none' ? '' : '\\s+' : '\\s*'
    // Return
    return new RegExp(`^(${this.prefix}${this.mentionPrefix ? `|<@!?${this.user.id}>` : ''})${space}(\\S*)(\\s+(.*))?`, this.prefixI ? 'i' : '')
  }
  addCommands (commands) {
    // Convert objects to arrays
    if (!Array.isArray(commands)) commands = Object.values(commands)
    // Iterate through commands to register each
    for (const command of commands) {
      // Add command to commands collection
      this.commands.set(command.name, command)
      // Add command to group
      // Check if command group has already been created
      if (!this.groups.has(command.group)) {
        // Add command to new group
        this.groups.set(command.group, [command.name])
      } else {
        // Add command to existing group
        const group = this.groups.get(command.group)
        group.push(command.name)
        this.groups.set(command.group, group)
      }
    }
  }
  addDefaultCommands (commands = true) {
    // If true, set commands to list of all default commands
    if (commands === true) commands = Object.keys(defaultCommands)
    // Replace command names with actual command
    commands = commands.map(cmd => defaultCommands[cmd])
    // Add comands
    this.addCommands(commands)
  }
}

// Export
module.exports = {
  KwClient
}
