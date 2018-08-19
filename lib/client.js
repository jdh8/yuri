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
   * @property {BotInfo} [info] - Information about the bot
   */

  /**
   * @param {KwClientOptions} [options] - Options for the client
   */
  constructor ({
    events,
    prefix,
    command,
    info,
    ...options
  } = {
    events: undefined,
    prefix: undefined,
    command: undefined,
    info: {}
  }) {
    super(options)
    /**
     * Client's {@link EventModule}
     * @type {EventModule}
     */
    this.events = new EventModule({client: this, options: events})
    /**
     * Client's {@link PrefixModule}
     * @type {PrefixModule}
     */
    this.prefix = new PrefixModule({client: this, options: prefix})
    /**
     * Client's {@link PrefixModule}
     * @type {PrefixModule}
     */
    this.commands = new CommandModule({client: this, options: command})
    /**
     * Information about the bot
     * @type {BotInfo}
     */
    this.info = info
  }
}

// Export
module.exports = {
  KwClient
}
