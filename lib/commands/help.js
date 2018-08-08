const {isGroup} = require('../util/is-group')

const bullet = '> '

module.exports = {
  name: 'help',
  aliases: ['h'],
  group: 'core',
  run ({message, args}) {
    const client = message.client
    if (!args) {
      // General help
      const groupsList = client.groups.array()
      const commandsList = groupsList.map(group =>
        `**${group.name}: **${[...group.commands.values()].map(name =>
          `\`${name}\``
        ).join(', ')}`
      )
      message.channel.send(`**__KnifeWife Help__**
Prefix: \`${client.prefix}\`
Use \`${client.prefixWs}help <command>\` for more infromation about a command.
${commandsList.join('\n')}
      `)
    } else if (client.findCommand(args)) {
      // Command help
      const command = client.findCommand(args)
      // Command's group name
      const group = client.findGroup(command.group).name
      // Command's description
      const desc = command.desc || '*No description found.*'
      // Command's aliases
      const aliases = command.aliases
        ? `\n**Aliases: **${command.aliases.map(alias =>
          `\`${alias}\``
        ).join(', ')}`
        : ''
      // Command's usage string
      const usage = command.usage
        ? `\n**Usage: **\`${client.prefixWs}${command.name} ${command.usage}\``
        : ''
      // Command's examples
      const examples = command.examples
        ? `\n**Examples: **\n${command.examples.map(example =>
          `\`${client.prefixWs}${command.name} ${example[0]}\` - ${example[1]}`
        ).join('\n')}`
        : ''
      message.channel.send(`**__KnifeWife Help/${group}/${command.name}__**
${desc}${aliases}${usage}${examples}
      `)
    } else if (client.findGroup(isGroup(args))) {
      // Group help
      const group = client.findGroup(isGroup(args))
      const commandsList = [...group.commands.values()].map(name =>
        `\`${name}\``
      )
      message.channel.send(`**__KnifeWife Help/${group.name}__**
${group.desc}
${bullet}${commandsList.join(`\n${bullet}`)}
      `)
    } else {
      // Unknown
      // A possible group with same name
      const possibleGroup = client.findGroup(args)
        ? `However, found a group \`${args}/\`. To view information about this group, run \`${client.prefixWs}help ${args}/\`.`
        : ''
      // A possbile command with same name
      const argsCmd = client.findCommand(args.slice(0, -1))
      const possibleCommand = argsCmd
        ? `However, found a command \`${argsCmd.name}\`. To view information about this command, run \`${client.prefixWs}help ${argsCmd.name}\`.`
        : ''
      message.channel.send(`**__KnifeWife Help/Error 404: Not Found__**
Couldn't find a ${isGroup(args) ? 'group' : 'command'} "${args}". Run \`${client.prefixWs}help\` for a list of all commands and groups.
${possibleGroup}${possibleCommand}
      `)
    }
  }
}
