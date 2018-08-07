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

/**
 * @external Client
 * @see {@link https://discord.js.org/#/docs/main/master/class/Client}
 */
/**
 * @external ClientOptions
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/ClientOptions}
 */

/**
 * Event that can be added to {@link KwClient}
 * @typedef {Object} KwEvent
 * @property {string} name - Name of the event, i.e the first parameter passed
 * to `EventEmitter.on()`
 * @property {Function} event - Event to run, i.e. the second parameter passed
 * to `EventEmitter.on()`
 */
/**
 * A group for commands that can be added to {@link KwClient}
 * @typedef {Array} Group
 * @property {string} 0 - Name of the group (must be lowercased). This is how
 * the group will be referenced by [Commands]{@link Command} that will be
 * included in it
 * @property {string} 1 - Title for the group; acts the same as name, but may
 * use upper- and lowercased characters
 * @property {string} 2 - Description of the group
 */
/**
 * The information for a {@link Group}
 * @typedef {Object} GroupInfo
 * @property {string} name - Title of the group
 * @property {string} desc - Description of the group
 * @property {Set<string>} commands - Names of [Commands]{@link Command} that
 * are inside this group
 * @see Group
 */
/**
 * Command that can be run by an {@link KwClient}
 * @typedef {Object} Command
 * @property {string} name - Name of the command (must be lowercased)
 * @property {Array<string>} [aliases] - Aliases for the command (all must be
 * lowercased)
 * @property {boolean} [aliasGen=true] - Whether or not to automatically
 * generate aliases for the command. Falls back to
 * {@link KwClient#commandAliasGen}
 * @property {string} group - Name of the command group for the command to be
 * registered in
 * @property {RegExp} [pattern] - If speicifed, the command will run when this
 * pattern is matched, instead of using the {@link KwClient#prefixRegex} and
 * command name
 * @property {Function} run - Run the command
 * @property {Array<KwEvent>} [events] - Events to register alongside the
 * command
 */

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
        errs.push(['warn',
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
    for (const group of groups) {
      // Check for errors
      // Lowercase name
      if (group[0].toLowerCase() !== group[0]) {
        this.emit('error',
          `Group "${group[0]}" should have a lowercase name! Skipping...`
        )
        continue
      }
      // Doesn't already exist
      if (this.groups.has(group[0])) {
        this.emit('error',
          `Group "${group[0]}" has already been registered! Skipping...`
        )
        continue
      }

      // Add the group
      this.groups.set(group[0], {
        name: group[1],
        desc: group[2],
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
      if (command.name.toLowerCase() !== command.name) {
        this.emit('error',
          `Command "${command.name}" should have a lowercase name! Skipping...`
        )
        continue
      }
      // Lowercase aliases
      if (command.aliases) {
        const aliasesString = command.aliases.join()
        if (aliasesString.toLowerCase() !== aliasesString) {
          this.emit('error',
            `Command "${command.name}" should have lowercase aliases! Skipping...`
          )
          continue
        }
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
