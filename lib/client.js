const Discord = require('discord.js')
const defaultCommands = require('./commands')

class KwClient extends Discord.Client {
  constructor ({prefix = 'kw', mentionPrefix = true, prefixEnforceSpace = false, prefixI = true, commandAliasGen = true, ...options}) {
    // Default setup for Discord.js client
    super(options)
    // Prefix Options
    this.prefix = prefix
    this.mentionPrefix = mentionPrefix
    this.prefixEnforceSpace = prefixEnforceSpace
    this.prefixI = prefixI
    // Commands
    this.commandAliasGen = commandAliasGen
    this.commands = new Discord.Collection()
    this.groups = new Discord.Collection()
    this.aliases = new Discord.Collection()
    this.patterns = new Discord.Collection()

    // Set events
    // Message
    this.on('message', message => {
      // Ignore if from bot
      if (message.author.bot) return false
      // Match to prefix
      const match = this.prefixRegex.exec(message)
      // Check if message has prefix
      if (match !== null) {
        // Running a command
        // Find command in aliases collection
        if (this.aliases.has(match[2])) {
          // Find command from alias
          const command = this.commands.get(this.aliases.get(match[2]))
          // Run command
          command.run({
            message,
            args: match[3] ? match[4] : null
          })
        }
      } else {
        // Check if it is a pattern
        for (const [pattern, command] of this.patterns) {
          if (pattern.exec(message)) {
            command.run({
              message
            })
          }
        }
      }
    })
  }
  get prefixRegex () {
    // Add space options
    const space = this.prefixEnforceSpace ? this.prefixEnforceSpace === 'none' ? '' : '\\s+' : '\\s*'
    // Return
    return new RegExp(`^(${this.prefix}${space}${this.mentionPrefix ? `|<@!?${this.user.id}>\\s*` : ''})(\\S*)(\\s+(.*))?`, this.prefixI ? 'i' : '')
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
      // Check if regular command or uses a pattern
      if (!command.pattern) {
        // Regular command
        // Add command name and aliases to aliases collection
        const aliases = [command.name].concat(command.aliases || [])
        // Check if alias generation is enabled
        if (this.commandAliasGen && (command.aliasGen === true || command.aliasGen === undefined)) {
          for (const alias of aliases) {
            const newAlias = alias.replace(/-/, '')
            if (newAlias !== alias) aliases.push(newAlias)
          }
        }
        // Add aliases to alias collection
        for (const alias of aliases) {
          // Don't add null aliases
          if (alias === null) continue
          this.aliases.set(alias, command.name)
        }
      } else {
        // Pattern
        // Add to patterns collection
        this.patterns.set(command.pattern, command)
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
