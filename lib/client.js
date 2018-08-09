const {Client} = require('discord.js')
const {EventModule, PrefixModule, CommandModule} = require('./modules')

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
    prefix: undefined,
    command: undefined,
    info: {}
  }) {
    super(options)
    /**
     * Client's {@link EventModule}
     * @type {EventModule}
     */
    this.events = new EventModule({client: this})
    /**
     * Client's {@link PrefixModule}
     * @type {PrefixModule}
     */
    console.log(prefix)
    this.prefix = new PrefixModule({client: this, options: prefix})
    /**
     * Client's {@link PrefixModule}
     * @type {PrefixModule}
     */
    this.commands = new CommandModule({client: this, options: command})
    /**
     * Information about the bot
     * @type {Object}
     */
    this.info = info
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
