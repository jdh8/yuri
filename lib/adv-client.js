const {Client} = require('discord.js')

/**
 * Discord.js Client with a more minimal, expandable framework built on top
 * @extends Client
 */
class KwAdvClient extends Client {
  /**
   * Options for a {@link KwAdvClient}
   * @typedef {ClientOptions} KwAdvClientOptions
   * @property {BotInfo} [info] - Information about the bot
   */

  /**
   * @param {KwAdvClientOptions} [options] - Options for the client
   */
  constructor ({
    info,
    ...options
  } = {
    info: {}
  }) {
    super(options)
    /**
     * Information about the bot
     * @type {BotInfo}
     */
    this.info = info
  }

  /**
   * Adds a module to the client
   * @param {string} name - Name of the module on the client
   * @param {Module} ModuleClass - Module class to add
   * @param {Object} [options] - Options to pass to the module constructor
   * @return {void}
   */
  addModule (name, ModuleClass, options) {
    this[name] = new ModuleClass({client: this, options})
  }
}

// Export
module.exports = {
  KwAdvClient
}
