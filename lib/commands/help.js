module.exports = {
  name: 'help',
  aliases: ['h', 'help-menu'],
  group: 'core',
  run ({message, args}) {
    // Check if a command name was given
    if (args) {
      // Command name given
      // Check if it is a valid command
      if (message.client.commands.has(args)) {
        // Send command info
        message.channel.send(`
          **__KnifeWife Help/${args}__**
          Command help information here or something idk
        `)
      } else {
        // Send error
        message.channel.send(`
          **__KnifeWife Help/Error 404__**
          Could not find command \`${args}\`!
        `)
      }
    } else {
      // General help
      message.channel.send(`
        **__KnifeWife Help__**
        Prefix: \`${message.client.prefix}\`
        Use \`${message.client.prefix}${message.client.prefixEnforceSpace === 'none' ? '' : ' '}help\` for information about a certain command.
        ${message.client.groups.keyArray().map(key => `**${key}**: ${message.client.groups.get(key).map(cmd => `\`${cmd}\``).join(', ')}`).join('\n')}
      `)
    }
  }
}
