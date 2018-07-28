module.exports = {
  name: 'help',
  group: 'core',
  run ({message, args, client}) {
    // Check if a command name was given
    if (args) {
      // Command name given
      // Check if it is a valid command
      if (client.commands.has(args)) {
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
        Prefix: \`${client.prefix}\`
        Use \`${client.prefix}${client.prefixEnforceSpace === 'none' ? '' : ' '}help\` for information about a certain command.
        ${client.groups.keyArray().map(key => `**${key}**: ${client.groups.get(key).map(cmd => `\`${cmd}\``).join(', ')}`).join('\n')}
      `)
    }
  }
}
