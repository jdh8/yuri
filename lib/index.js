const {KwClient} = require('./client.js')

module.exports = {
  KwClient
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
 * @property {string} name - Title of the group
 * @property {string} desc - Description of the group
 * @property {Set<string>} commands - Names of [Commands]{@link Command} that
 * are inside this group
 * @see Group
 */
/**
 * Callback for running a command; function that is ran when a command is
 * executed
 * @callback runCallback
 * @param {Object} args - Arguments passed into the command
 * @param {Message} args.message - Discord.js message that triggered the
 * command
 * @param {string} args.args - Arguments that the command was ran with, i.e.
 * anything after the prefix and command name
 * @return {void}
 * @see Command
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
 * @property {string} [desc] - Description of the command
 * @property {string} [usage] - The arguments the command excepts and their
 * ordering; prefix and command name are prepended automatically, they shouldn't
 * be included here. Used for help command
 * @property {Array<Array<string>>} [examples] - Examples of how the command is
 * used. Each child array should have the command ran as `[0]`, and the result
 * or a description in `[1]`. Prefix and command name are prepended
 * automatically, they shouldn't be included on examples. Used for the help
 * command
 * @property {RegExp} [pattern] - If speicifed, the command will run when this
 * pattern is matched, instead of using the {@link KwClient#prefixRegex} and
 * command name
 * @property {runCallback} run - Run the command
 * @property {Array<KwEvent>} [events] - Events to register alongside the
 * command
 */
