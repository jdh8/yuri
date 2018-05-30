module.exports = {
  name: 'help',
  group: 'core',
  run ({message, args, client}) {
    if (args) {
      if (client.commands.has(args)) {
        message.channel.send(`
          **__KnifeWife Help/${args}__**
          Command help information here or something idk
        `)
      } else {
        message.channel.send(`
          **__KnifeWife Help/Error 404__**
          Could not find command \`${args}\`!
        `)
      }
    } else {
      message.channel.send(`
        **__KnifeWife Help__**
        Prefix: \`${client.prefix}\`
        Use \`${client.prefix}${client.prefixEnforceSpace === 'none' ? '' : ' '}help\` for information about a certain command.
        ${client.groups.keyArray().map(key => `**${key}**: ${client.groups.get(key).map(cmd => `\`${cmd}\``).join(', ')}`).join('\n')}
      `)
    }
  }
}
