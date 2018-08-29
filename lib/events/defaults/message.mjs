export default {
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
        command.execute({
          message,
          args: match[3]
        })
      }
    } else {
      // Check if it is a pattern
      for (const [pattern, name] of this.commands.patterns) {
        if (pattern.exec(message)) {
          const command = this.commands.map.get(name)
          command.execute({
            message
          })
        }
      }
    }
  }
}
