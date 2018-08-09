const {Module} = require('./module')

/**
 * Module for handling the prefix
 * @extends {Module}
 */
class PrefixModule extends Module {
  /**
   * Options for a {@link PrefixModule}
   * @typedef PrefixModuleOptions
   * @property {string} [base='kw'] - Prefix for commands
   * @property {boolean} [mention=true] - If a mention can be used for a prefix
   * @property {boolean|'none'} [enforceSpace=false] - Whether a space is
   * required between the prefix and command. For example, using the prefix
   * `kw!` and command `cmd`: setting this to `false` will mean `kw! cmd`,
   * `kw!cmd` and any other amount of whitespace are all valid; setting this to
   * `true` means that only `kw! cmd` and any greater amount of whitespace are
   * valid; and `'none'` means that only `kw!cmd` is valid
   * @property {boolean} [i=true] - Whether or not the prefix is case
   * insensitive
   */

  /**
   * @param {Object} options - Options for the module
   * @param {KwClient} options.client - Client this module is apart of
   * @param {PrefixModuleOptions} [options.options] - Options for the module
   */
  constructor ({client, options = {
    base: 'kw',
    mention: true,
    enforceSpace: false,
    i: true
  }}) {
    super(client)
    /**
     * Options for the module
     * @type {PrefixModuleOptions}
     */
    this.options = options
  }

  /**
   * Base command prefix
   * @type {string}
   */
  get base () {
    return this.options.base
  }
  set base (prefix) {
    this.options.base = prefix
  }

  /**
   * How to enforce the space in the prefix
   * @type {string}
   * @readonly
   * @see {@link PrefixModuleOptions#enforceSpace}
   */
  get space () {
    return this.options.enforceSpace
      ? this.options.enforceSpace === 'none'
        ? ''
        : '\\s+'
      : '\\s*'
  }

  /**
   * Command prefix including the space after
   * @type {string}
   * @readonly
   */
  get ws () {
    return `${this.base}${this.space ? ' ' : ''}`
  }

  /**
   * Regex for testing a message to determine if it is a command and what
   * arguments were past to it (if any)
   * @type {RegExp}
   * @readonly
   */
  get regex () {
    return new RegExp(`^(${this.base}${this.space ? ' ' : ''}${
      this.options.mention
      ? `|<@!?${this.client.user.id}>\\s*`
      : ''
    })(\\S*)(\\s+(.*))?`, this.options.i ? 'i' : '')
  }
}

// Export
module.exports = {
  PrefixModule
}
