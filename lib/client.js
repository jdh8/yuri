const {Client, Collection} = require('discord.js')
const defaultCommands = require('./commands')
const defaultEvents = require('./events')

const defaultGroups = [
  ['core', 'Core', 'Core commands of the bot']
]

class KwClient extends Client {
  constructor ({
    prefix = 'kw',
    mentionPrefix = true,
    prefixEnforceSpace = false,
    prefixI = true,
    commandAliasGen = true,
    ...options
  } = {
    prefix: 'kw',
    mentionPrefix: true,
    prefixEnforceSpace: false,
    prefixI: true,
    commandAliasGen: true
  }) {
    // Default setup for Discord.js client
    super(options)
    // Prefix Options
    this.prefix = prefix
    this.mentionPrefix = mentionPrefix
    this.prefixEnforceSpace = prefixEnforceSpace
    this.prefixI = prefixI
    // Commands
    this.commandAliasGen = commandAliasGen
    this.commands = new Collection()
    this.groups = new Collection()
    this.aliases = new Collection()
    this.patterns = new Collection()
    // Events
    this.events = new Collection()
  }
  get prefixRegex () {
    // Return
    return new RegExp(`^(${this.prefix}${
      this.prefixEnforceSpace
      ? this.prefixEnforceSpace === 'none'
        ? ''
        : '\\s+'
      : '\\s*'
    }${
      this.mentionPrefix
      ? `|<@!?${this.user.id}>\\s*`
      : ''
    })(\\S*)(\\s+(.*))?`, this.prefixI ? 'i' : '')
  }
  addGroups (groups) {
    // Iterate through groups to register each
    for (const group of groups) {
      this.groups.set(group[0], {
        name: group[1],
        desc: group[2],
        commands: new Set()
      })
    }
  }
  addDefaultGroups (...exclude) {
    const excludeSet = new Set(exclude)
    // Add comands
    this.addGroups(
      defaultGroups.filter(group => !excludeSet.has(group[0]))
    )
  }
  addCommands (commands) {
    // Convert objects to arrays
    if (!Array.isArray(commands)) commands = Object.values(commands)
    // Iterate through commands to register each
    for (const command of commands) {
      // Add command to commands collection
      this.commands.set(command.name, command)
      // Add command to group
      this.groups.get(command.group).commands.add(command.name)
      // Check if regular command or uses a pattern
      if (!command.pattern) {
        // Regular command
        // Add command name and aliases to aliases collection
        const aliases = new Set([command.name].concat(command.aliases || []))
        // Check if alias generation is enabled
        if (
          command.aliasGen == null ? this.commandAliasGen : command.aliasGen
        ) {
          // Generate aliases
          for (const alias of aliases) {
            aliases.add(alias.replace(/-/, ''))
          }
        }
        // Remove null
        aliases.delete(null)
        // Add aliases to alias collection
        for (const alias of aliases) {
          this.aliases.set(alias, command.name)
        }
      } else {
        // Pattern
        // Add to patterns collection
        this.patterns.set(command.pattern, command)
      }
      // Check if command has events with it; add them
      if (command.events) this.addEvents(command.events)
    }
  }
  addDefaultCommands (...exclude) {
    const excludeSet = new Set(exclude)
    // Add comands
    this.addCommands(
      Object.values(defaultCommands)
        .filter(command => !excludeSet.has(command.name))
    )
  }
  addEvents (events) {
    // Convert object to array
    if (!Array.isArray(events)) events = Object.values(events)
    // Get most important keys first
    const importantEvents = ['warn', 'error', 'debug']
    for (const importantEvent of importantEvents) {
      const index = events.findIndex(event => event.name === importantEvent)
      if (index < 0) continue
      events.unshift(events[index])
      events.splice(index + 1, 1)
    }
    // Iterate through events to register each
    for (const {name, event} of events) {
      this.on(name, event)
      this.events.set(name, event)
    }
  }
  addDefaultEvents (...exclude) {
    const excludeSet = new Set(exclude)
    // Add events
    this.addEvents(
      Object.values(defaultEvents).filter(event => !excludeSet.has(event.name))
    )
  }
}

// Export
module.exports = {
  KwClient
}
