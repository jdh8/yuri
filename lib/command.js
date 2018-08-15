const {ArgumentProcessor, ArgumentError} = require('./argument')

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
 * @typedef CommandOptions
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

class Command {
  constructor ({
    name,
    aliases,
    aliasGen = true,
    group,
    args,
    desc,
    usage,
    examples,
    pattern,
    run,
    events
  }) {
    this.name = name
    this.aliases = aliases
    this.aliasGen = aliasGen
    this.group = group
    this.args = args instanceof ArgumentProcessor || args === undefined
      ? args
      : new ArgumentProcessor({args})
    this.desc = desc
    this.usage = usage || (this.args && this.args.usageString)
    this.examples = examples
    this.pattern = pattern
    this.run = run
    this.events = events
    this.execute = ({message, args}) => {
      let argsCollection
      if (this.args) {
        try {
          argsCollection = this.args.process({message, args})
        } catch (e) {
          if (e instanceof ArgumentError) {
            message.channel.send(e.message)
          } else {
            throw e
          }
        }
      }
      this.run({
        message,
        args,
        argsCollection
      })
    }
  }
}

module.exports = {
  Command
}
