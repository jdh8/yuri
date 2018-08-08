const {isGroup} = require('./util/is-group')

module.exports = {
  name: 'help',
  aliases: ['h'],
  group: 'core',
  run ({message, args}) {
    const client = message.client
    if (!args) {
      // General help
      message.channel.send(`**__KnifeWife Help__**
Prefix: \`${client.prefix}\`
Use \`${client.prefixWs}help <command>\` for more infromation about a command.
${[...message.client.groups.values()].map(group =>
  `**${group.name}: **${[...group.commands.values()].map(name =>
    `\`${name}\``
  ).join(', ')}`
).join('\n')}
      `)
    } else if (client.findCommand(args)) {
      // Command help
      const command = client.findCommand(args)
      message.channel.send(`**__KnifeWife Help/${
        client.findGroup(command.group).name
}/${command.name}__**
${command.desc || '*No description found.*'}${
  command.aliases
    ? `\n**Aliases: **${command.aliases.map(alias =>
      `\`${alias}\``
    ).join(', ')}`
    : ''
}${
  command.usage
    ? `\n**Usage: **\`${client.prefixWs}${command.name} ${command.usage}\``
    : ''
}${
  command.examples
    ? `\n**Examples: **\n${command.examples.map(example =>
      `\`${client.prefixWs}${command.name} ${example[0]}\` - ${example[1]}`
    ).join('\n')}`
    : ''
}
      `)
    } else if (client.findGroup(isGroup(args))) {
      // Group help
      const group = client.findGroup(isGroup(args))
      message.channel.send(`**__KnifeWife Help/${group.name}__**
${group.desc}
> ${[...group.commands.values()].map(name => `\`${name}\``).join('\n>')}
      `)
    } else {
      // Unknown
      message.channel.send(`**__KnifeWife Help/Error 404: Not Found__**
Couldn't find a ${isGroup(args) ? 'group' : 'command'} "${args}". Run \`${client.prefixWs}help\` for a list of all commands and groups.
${client.findGroup(args)
  ? `However, found a group \`${args}/\`. To view information about this group, run \`${client.prefixWs}help ${args}/\`.`
  : client.findCommand(args.slice(0, -1))
    ? `However, found a command \`${client.findCommand(args.slice(0, -1)).name}\`. To view information about this command, run \`${client.prefixWs}help ${client.findCommand(args.slice(0, -1)).name}\`.`
    : ''}
      `)
    }
  }
}
