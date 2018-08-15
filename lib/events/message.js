const {ArgumentError} = require('../argument/argument-error')

module.exports = {
  name: 'message',
  event (message) {
  // Ignore if from bot
    if (message.author.bot) return
    // Match to prefix
    const match = this.prefix.regex.exec(message)
    // Check if message has prefix
    if (match !== null) {
      // Running a command
      // Find command in aliases collection
      if (this.commands.aliases.has(match[2])) {
        // Find command from alias
        const command = this.commands.map.get(
          this.commands.aliases.get(match[2])
        )
        // Run command
        try {
          command.run({
            message,
            args: match[4]
          })
        } catch (e) {
          if (e instanceof ArgumentError) {
            message.channel.send(e.message)
          } else {
            throw e
          }
        }
      }
    } else {
      // Check if it is a pattern
      for (const [pattern, command] of this.commands.patterns) {
        if (pattern.exec(message)) {
          try {
            command.run({
              message
            })
          } catch (e) {
            if (e instanceof ArgumentError) {
              message.channel.send(e.message)
            } else {
              throw e
            }
          }
        }
      }
    }
  }
}
