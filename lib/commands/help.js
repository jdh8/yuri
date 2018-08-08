function findCommand (client, cmd) {
  // Regular commands
  if (client.aliases.has(cmd)) {
    return client.commands.get(client.aliases.get(cmd))
  }
  // Pattern commands (by name)
  if (client.commands.has(cmd)) return client.commands.get(cmd)
  // Patterns commands (by pattern)
  for (const [pattern, command] of client.patterns) {
    if (pattern.test(cmd)) {
      return command
    }
  }
  return null
}

function findGroup (client, grp) {
  if (client.groups.has(grp)) return client.groups.get(grp)
}

module.exports = {
  name: 'help',
  aliases: ['h'],
  group: 'core',
  run ({message, args}) {
    const prefixTrim = message.client.prefix
    const prefix = `${prefixTrim}${message.client.prefixEnforceSpace === 'none'
      ? ''
      : ' '}`
    if (!args) {
      // General help
      message.channel.send(`**__KnifeWife Help__**
Prefix: \`${prefixTrim}\`
Use \`${prefix}help <command>\` for more infromation about a command.
${[...message.client.groups.values()].map(group =>
  `**${group.name}: **${[...group.commands.values()].map(name =>
    `\`${name}\``
  ).join(', ')}`
).join('\n')}
      `)
    } else if (findCommand(message.client, args)) {
      // Command help
      const command = findCommand(message.client, args)
      message.channel.send(`**__KnifeWife Help/${
        findGroup(message.client, command.group).name
}/${command.name}__**
${command.desc || '*No description found.*'}${
  command.aliases
    ? `\n**Aliases: **${command.aliases.map(alias =>
      `\`${alias}\``
    ).join(', ')}`
    : ''
}${
  command.usage
    ? `\n**Usage: **\`${prefix}${command.name} ${command.usage}\``
    : ''
}${
  command.examples
    ? `\n**Examples: **\n${command.examples.map(example =>
      `\`${prefix}${command.name} ${example[0]}\` - ${example[1]}`
    ).join('\n')}`
    : ''
}
      `)
    } else if (findGroup(message.client, /(.+)\/$/i.exec(args) && /(.+)\/$/i.exec(args)[1])) {
      // Group help
      const group = findGroup(message.client, /(.+)\/$/i.exec(args)[1])
      message.channel.send(`**__KnifeWife Help/${group.name}__**
${group.desc}
> ${[...group.commands.values()].map(name => `\`${name}\``).join('\n>')}
      `)
    } else {
      // Unknown
      message.channel.send(`**__KnifeWife Help/Error 404: Not Found__**
Couldn't find a ${/(.+)\/$/i.test(args) ? 'group' : 'command'} "${args}". Run \`${prefix}help\` for a list of all commands and groups.
${findGroup(message.client, args)
  ? `However, found a group \`${args}/\`. To view information about this group, run \`${prefix}help ${args}/\`.`
  : findCommand(message.client, args.slice(0, -1))
    ? `However, found a command \`${findCommand(message.client, args.slice(0, -1)).name}\`. To view information about this command, run \`${prefix}help ${findCommand(message.client, args.slice(0, -1)).name}\`.`
    : ''}
      `)
    }
  }
}
