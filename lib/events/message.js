module.exports = {
  name: 'message',
  event (message) {
  // Ignore if from bot
    if (message.author.bot) return
    // Match to prefix
    const match = this.prefixRegex.exec(message)
    // Check if message has prefix
    if (match !== null) {
      // Running a command
      // Find command in aliases collection
      if (this.aliases.has(match[2])) {
        // Find command from alias
        const command = this.commands.get(this.aliases.get(match[2]))
        // Run command
        command.run({
          message,
          args: match[4]
        })
      }
    } else {
      // Check if it is a pattern
      for (const [pattern, command] of this.patterns) {
        if (pattern.exec(message)) {
          command.run({
            message
          })
        }
      }
    }
  }
}
