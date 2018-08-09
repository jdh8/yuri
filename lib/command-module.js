const {Collection} = require('discord.js')
const {Module} = require('./module')
const {GroupModule} = require('./group-module')
const defaultCommands = require('./commands')
const {defaultNames} = require('./util/default-names')
const {lowercase} = require('./util/lowercase')

/**
 * Module for handling commands
 * @extends {Module}
 * @see {@link GroupModule}
 */
class CommandModule extends Module {
  /**
   * Options for a {@link CommandModule}
   * @typedef CommandModuleOptions
   * @property {boolean} [aliasGen=true] - Fallback value for command alias
   * generation
   */

   /**
    * @param {Object} options - Options for the module
    * @param {KwClient} options.client - Client this module is apart of
    * @param {CommandModuleOptions} [options.options] - Options for the module
    */
  constructor ({client, options = {
    aliasGen: true
  }}) {
    super(client)
    /**
     * Options for the module
     * @type {CommandModuleOptions}
     */
    this.options = options
    /**
     * Group module
     * @type {GroupModule}
     */
    this.groups = new GroupModule({client})
    /**
     * Map of the client's commands
     * @type {Collection<string, Command>}
     */
    this.map = new Collection()
    /**
     * Map of the client's command aliases, and their associated command
     * @type {Collection<string, string>}
     */
    this.aliases = new Collection()
    /**
     * Map of the client's command patterns, with their associated commands
     * @type {Collection<RegExp, Command>}
     */
    this.patterns = new Collection()
  }

  /**
   * Add commands to the client
   * @param {Array<Command>|Object<string, Command>} commands - Array or object
   * of commands to be added to the client
   * @return {void}
   */
  add (commands) {
    // Convert objects to arrays
    if (!Array.isArray(commands)) commands = Object.values(commands)
    // Iterate through commands to register each
    for (const command of commands) {
      // Check for errors
      // Lowercase name
      if (!lowercase.test(command.name)) {
        this.client.emit('error',
          `Command "${command.name}" should have a lowercase name! Skipping...`
        )
        continue
      }
      // Lowercase aliases
      if (command.aliases && !lowercase.test(command.aliases.join())) {
        this.client.emit('error',
          `Command "${command.name}" should have lowercase aliases! Skipping...`
        )
        continue
      }
      // Group exists
      if (!this.groups.map.has(command.group)) {
        this.client.emit('error',
          `Cannot find group "${command.group}" (from command ${command.name})! Skipping...`
        )
        continue
      }
      // Already exists
      if (this.map.has(command.name)) {
        this.client.emit('error',
          `Command "${command.name}" already exists! Skipping...`
        )
      }

      // Add command to commands collection
      this.map.set(command.name, command)
      // Add command to group
      this.groups.map.get(command.group).commands.add(command.name)
      // Check if regular command or uses a pattern
      if (!command.pattern) {
        // Regular command
        // Add command name and aliases to aliases collection
        const aliases = new Set([command.name].concat(command.aliases || []))
        // Check if alias generation is enabled
        if (
          command.aliasGen == null ? this.options.aliasGen : command.aliasGen
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
      if (command.events) this.client.events.add(command.events)
    }
  }

  /**
   * Add default commands to the client
   * @param {...string} [exclude] - Default commands to exclude, i.e. not add
   * @return {void}
   */
  addDefaults (...exclude) {
    const excludeSet = new Set(exclude)
    // Check for errors
    for (const command of excludeSet) {
      if (!defaultNames.commands.has(command)) {
        this.client.emit('error',
          `Default command "${command}" cannot be found! Skipping...`
        )
        excludeSet.delete(command)
      }
    }

    // Add comands
    this.add(
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
  find (command, options = {
    name: false,
    aliases: false,
    pattern: false
  }) {
    if (!options.aliases && this.aliases.has(command)) {
      // Command aliases (finds regular commands)
      return this.map.get(this.aliases.get(command))
    } else if (!options.name && this.map.has(command)) {
      // Command names (finds all commands)
      return this.map.get(command)
    } else if (!options.pattern) {
      // Command patterns (finds pattern commands)
      for (const [pattern, patternCommand] of this.patterns) {
        if (pattern.test(command)) return patternCommand
      }
    }
    return null
  }
}

// Export
module.exports = {
  CommandModule
}
