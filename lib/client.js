const {Client, Collection} = require('discord.js')
const defaultCommands = require('./commands')
const defaultEvents = require('./events')

const defaultGroups = [
  ['core', 'Core', 'Core commands of the bot']
]

const defaultNames = {
  events: new Set(Object.values(defaultEvents).map(event => event.name)),
  groups: defaultGroups.reduce((acc, group) => acc.add(group[0]), new Set()),
  commands: new Set(Object.values(defaultCommands).map(command => command.name))
}

const lowercase = /^[-._a-z0-9]+$/

/**
 * Discord.js Client with framework built on top
 * @extends {Client}
 */
class KwClient extends Client {
  /**
   * Options for a {@link KwClient}
   * @typedef {ClientOptions} KwClientOptions
   * @property {string} [prefix='kw'] - Prefix for commands
   * @property {boolean} [mentionPrefix=true] - If a mention can be used for a
   * prefix
   * @property {boolean|'none'} [prefixEnforceSpace=false] - Whether a space is
   * require between the prefix and command. For example, using the prefix `kw!`
   * and command `cmd`: setting this to `false` will mean `kw! cmd`, `kw!cmd`
   * and any other amount of whitespace are all valid; setting this to `true`
   * means that only `kw! cmd` and any greater amount of whitespace are valid;
   * and `'none'` means that only `kw!cmd` is valid
   * @property {boolean} [prefixI=true] - Whether or not the prefix is case
   * insensitive
   * @property {boolean} [commandAliasGen=true] - Fallback value for
   * automatically generating command aliases ({@link Command#aliasGen})
   */

  /**
   * @param {KwClientOptions} [options] - Options for the client
   */
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
    /**
     * Prefix for commands
     * @type {string}
     */
    this.prefix = prefix
    /**
     * If a mention can be used for a prefix
     * @type {boolean}
     */
    this.mentionPrefix = mentionPrefix
    /**
     * Whether a space is require between the prefix and command. For example,
     * using the prefix `kw!` and command `cmd`: setting this to `false` will
     * mean `kw! cmd`, `kw!cmd` and any other amount of whitespace are all
     * valid; setting this to `true` means that only `kw! cmd` and any greater
     * amount of whitespace are valid; and `'none'` means that only `kw!cmd` is
     * valid
     * @type {boolean|'none'}
     */
    this.prefixEnforceSpace = prefixEnforceSpace
    /**
     * Whether or not the prefix is case insensitive
     * @type {boolean}
     */
    this.prefixI = prefixI

    // Commands
    /**
     * Fallback value for automatically
     * [generating command aliases]{@link Command#aliasGen}
     * @type {boolean}
     */
    this.commandAliasGen = commandAliasGen
    /**
     * Map of the client's regular commands
     * @type {Map<string, Command>}
     */
    this.commands = new Collection()
    /**
     * Map of the client's command groups, with their associated commands
     * @type {Map<string, GroupInfo>}
     */
    this.groups = new Collection()
    /**
     * Map of the client's command aliases, with their associated command's name
     * @type {Map<string, string>}
     */
    this.aliases = new Collection()
    /**
     * Map of the client's pattern-based commands
     * @type {Map<RegExp, Command>}
     */
    this.patterns = new Collection()

    // Events
    /**
     * Map of the client's events
     * @type {Map<string, KwEvent>}
     * @see KwClient#addEvents
     */
    this.events = new Collection()
  }

  /**
   * The RegExp for testing a message to determine if it is a command and what
   * arguments were past to it (if any)
   * @type {RegExp}
   * @readonly
   */
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

  /**
  * A string representing the prefix, including whitespace
  * @type {string}
  * @readonly
  */
  get prefixWs () {
    return `${this.prefix}${this.prefixEnforceSpace === 'none' ? '' : ' '}`
  }

  /**
   * Add events to the client, and to the client's map of events
   * @param {Array<Event>|Object<string, Event>} events - Array or object of
   * events to be added to the client
   * @param {Array<Array<string>>} [errs=[]] - Array of any errors that occurred
   * before the "error" event was registered, to be emitted after
   * @return {void}
   * @see KwClient#events
   */
  addEvents (events, errs = []) {
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
      // Check for errors
      // No checks

      // Add events
      this.on(name, event)
      this.events.set(name, event)
    }

    // Display errors from addDefaultEvents
    for (const err of errs) {
      this.emit(...err)
    }
  }

  /**
   * Add default events to the client
   * @param {...string} [exclude] - Default events to exclude, i.e. not add
   * @return {void}
   */
  addDefaultEvents (...exclude) {
    const excludeSet = new Set(exclude)
    // Check for errors
    const errs = []
    for (const event of excludeSet) {
      if (!defaultNames.events.has(event)) {
        errs.push(['error',
          `Default event "${event}" cannot be found! Skipping...`
        ])
        excludeSet.delete(event)
      }
    }

    // Add events
    this.addEvents(
      Object.values(defaultEvents).filter(event => !excludeSet.has(event.name)),
      errs
    )
  }

  /**
   * Add command groups to the client
   * @param {Array<Group>} group - Array of groups to add to be added to the
   * client
   * @return {void}
   */
  addGroups (groups) {
    // Iterate through groups to register each
    for (const [group, name, desc] of groups) {
      // Check for errors
      // Lowercase name
      if (!lowercase.test(group)) {
        this.emit('error',
          `Group "${group}" should have a lowercase name! Skipping...`
        )
        continue
      }
      // Doesn't already exist
      if (this.groups.has(group)) {
        this.emit('error',
          `Group "${group}" has already been registered! Skipping...`
        )
        continue
      }

      // Add the group
      this.groups.set(group, {
        name,
        desc,
        commands: new Set()
      })
    }
  }

  /**
   * Add default groups to the client
   * @param {...string} [exclude] - Default groups to exclude, i.e. not add
   * @return {void}
   */
  addDefaultGroups (...exclude) {
    const excludeSet = new Set(exclude)
    // Check for errors
    for (const group of excludeSet) {
      if (!defaultNames.groups.has(group)) {
        this.emit('error',
          `Default group "${group}" cannot be found! Skipping...`
        )
        excludeSet.delete(group)
      }
    }

    // Add comands
    this.addGroups(
      defaultGroups.filter(group => !excludeSet.has(group[0]))
    )
  }

  /**
   * Find a group by name. Returns the group if it is found; `null` if it isn't
   * @param {string} group - Group to find
   * @return {Group|null}
   */
  findGroup (group) {
    if (this.groups.has(group)) return this.groups.get(group)
    return null
  }

  /**
   * Add commands to the client
   * @param {Array<Command>|Object<string, Command>} commands - Array or object
   * of commands to be added to the client
   * @return {void}
   */
  addCommands (commands) {
    // Convert objects to arrays
    if (!Array.isArray(commands)) commands = Object.values(commands)
    // Iterate through commands to register each
    for (const command of commands) {
      // Check for errors
      // Lowercase name
      if (!lowercase.test(command.name)) {
        this.emit('error',
          `Command "${command.name}" should have a lowercase name! Skipping...`
        )
        continue
      }
      // Lowercase aliases
      if (command.aliases && !lowercase.test(command.aliases.join())) {
        this.emit('error',
          `Command "${command.name}" should have lowercase aliases! Skipping...`
        )
        continue
      }
      // Group exists
      if (!this.groups.has(command.group)) {
        this.emit('error',
          `Cannot find group "${command.group}" (from command ${command.name})! Skipping...`
        )
        continue
      }
      // Already exists
      if (this.commands.has(command.name)) {
        this.emit('error',
          `Command "${command.name}" already exists! Skipping...`
        )
      }

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

  /**
   * Add default commands to the client
   * @param {...string} [exclude] - Default commands to exclude, i.e. not add
   * @return {void}
   */
  addDefaultCommands (...exclude) {
    const excludeSet = new Set(exclude)
    // Check for errors
    for (const command of excludeSet) {
      if (!defaultNames.commands.has(command)) {
        this.emit('error',
          `Default command "${command}" cannot be found! Skipping...`
        )
        excludeSet.delete(command)
      }
    }

    // Add comands
    this.addCommands(
      Object.values(defaultCommands)
        .filter(command => !excludeSet.has(command.name))
    )
  }

  /**
   * Find a command by name, aliases or by pattern matching. Returns the command
   * if found; `null` if it isn't.
   * @param {string} command - Command to find
   * @param {Object} [dontCheck] - Options to disable checking for
   * @param {boolean} [dontCheck.name=false] - To check for command name or not
   * @param {boolean} [dontCheck.aliases=false] - To check for command aliases or
   * not
   * @param {boolean} [dontCheck.pattern=false] - To check for pattern commands
   * by testing the string for on the pattern commands' patterns
   * @return {Command|null}
   */
  findCommand (command, {
    name = false,
    aliases = false,
    pattern = false
  } = {
    name: false,
    aliases: false,
    pattern: false
  }) {
    // Command aliases (finds regular commands)
    if (!aliases && this.aliases.has(command)) {
      return this.commands.get(this.aliases.get(command))
    // Command names (finds all commands)
    } else if (!name && this.commands.has(command)) {
      return this.commands.get(command)
    // Command patterns (finds pattern commands)
    } else if (!pattern) {
      for (const [pattern, patternCommand] of this.patterns) {
        if (pattern.test(command)) return patternCommand
      }
    }
    return null
  }

  /**
   * Add default events, groups and commands all at once
   * @param {Object} [exclude] - Object containing events, groups and commmands
   * to exclude, i.e. not add
   * @param {Array<string>} [exclude.events=[]] - Default events to exclude,
   * i.e. not add
   * @param {Array<string>} [exclude.groups=[]] - Default groups to exclude,
   * i.e. not add
   * @param {Array<string>} [exclude.commands=[]] - Default commands to exclude,
   * i.e. not add
   * @return {void}
   */
  addDefault ({
    events = [],
    groups = [],
    commands = []
  } = {
    events: [],
    groups: [],
    commands: []
  }) {
    this.addDefaultEvents(...events)
    this.addDefaultGroups(...groups)
    this.addDefaultCommands(...commands)
  }
}

// Export
module.exports = {
  KwClient
}
