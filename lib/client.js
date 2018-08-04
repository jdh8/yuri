const {Client, Collection} = require('discord.js')
const defaultCommands = require('./commands')
const defaultEvents = require('./events')

const defaultGroups = new Collection([
  ['core', ['Core', 'Core commands of the bot']]
])

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
  addDefaultGroups (groups = defaultGroups.keyArray()) {
    // Replace command names with actual command
    groups = groups.map(group => [group, ...defaultGroups.get(group)])
    // Add comands
    this.addGroups(groups)
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
  addDefaultCommands (commands = true) {
    // If true, set commands to list of all default commands
    if (commands === true) commands = Object.keys(defaultCommands)
    // Replace command names with actual command
    commands = commands.map(cmd => defaultCommands[cmd])
    // Add comands
    this.addCommands(commands)
  }
  addEvents (events) {
    // Convert objects to maps
    if (!(events instanceof Map)) events = new Collection(events)
    // Get most important keys first
    for (const event of ['error', 'warn', 'debug']) {
      if (events.has(event)) {
        this.on(event, events.get(event))
        this.events.set(event, events.get(event))
        events.delete(event)
      }
    }
    // Iterate through commands events to register each
    for (const [event, action] of events) {
      this.on(event, action)
      this.events.set(event, action)
    }
  }
  addDefaultEvents (events = true, noDebug = false) {
    // If true, set events to default events
    if (events === true) events = Object.keys(defaultEvents)
    // Repalce event names with actual event
    const newEvents = new Collection()
    for (const event of events) {
      newEvents.set(event, defaultEvents[event])
    }
    if (noDebug) newEvents.delete('debug')
    // Add events
    this.addEvents(newEvents)
  }
}

// Export
module.exports = {
  KwClient
}
