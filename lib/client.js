const {Client} = require('discord.js')
const {EventModule} = require('./event-module')
const {PrefixModule} = require('./prefix-module')
const {CommandModule} = require('./command-module')

/**
 * Discord.js Client with framework built on top
 * @extends {Client}
 */
class KwClient extends Client {
  /**
   * Options for a {@link KwClient}
   * @typedef {ClientOptions} KwClientOptions
   * @property {PrefixModuleOptions} [prefix] - Prefix options
   * @property {CommandModuleOptions} [command] - Command options
   * @property {Object} [info] - Information about the bot
   */

  /**
   * @param {KwClientOptions} [options] - Options for the client
   */
  constructor ({
    prefix,
    command,
    info,
    ...options
  } = {
    prefix: {},
    command: {},
    info: {}
  }) {
    super(options.options)
    /**
     * Client's {@link EventModule}
     * @type {EventModule}
     */
    this.events = new EventModule({client: this})
    /**
     * Client's {@link PrefixModule}
     * @type {PrefixModule}
     */
    this.prefix = new PrefixModule({client: this, options: options.prefix})
    /**
     * Client's {@link PrefixModule}
     * @type {PrefixModule}
     */
    this.commands = new CommandModule({client: this, options: options.command})
    /**
     * Information about the bot
     * @type {Object}
     */
    this.info = options.info
  }

  addDefaults ({
    events = [],
    groups = [],
    commands = []
  } = {
    events: [],
    groups: [],
    commands: []
  }) {
    this.events.addDefaults(...events)
    this.commands.groups.addDefaults(...groups)
    this.commands.addDefaults(...commands)
  }
}

// Export
module.exports = {
  KwClient
}
