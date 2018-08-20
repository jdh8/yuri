const {KwClient} = require('./client.js')
const {Command} = require('./command')
const {
  Module,
  EventModule,
  PrefixModule,
  CommandModule,
  GroupModule
} = require('./modules')
const {ArgumentHandler, ArgumentProcessor} = require('./argument')

module.exports = {
  KwClient,
  Module,
  EventModule,
  PrefixModule,
  CommandModule,
  GroupModule,
  ArgumentHandler,
  ArgumentProcessor,
  Command
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
 * @external Message
 * @see {@link https://discord.js.org/#/docs/main/master/class/Message}
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
 * @property {string} name - Name of the group
 * @property {string} title - Title of the group
 * @property {string} desc - Description of the group
 * @property {Set<string>} commands - Names of [Commands]{@link Command} that
 * are inside this group
 * @see Group
 */
/**
 * Information about the bot
 * @typedef BotInfo
 * @property {string} name - Name of the bot
 * @property {string} [desc] - Description of the bot
 * @property {string} [version] - Current version of the bot
 * @property {string|Array<string>} [developer] - Developer(s) of the bot
 * @property {string} owner - The owner of the bot
 * @property {string} [invite] - Invite to the support server
 * @property {string} [website] - URL of the bot's website
 * @property {string} [repo] - URL of the bot's repository
 */
