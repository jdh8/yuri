const {
  oneLine,
  stripIndents,
  oneLineCommaLists
} = require('common-tags')
const {isGroup} = require('../util/is-group')
const {bullet} = require('../util/bullet')

module.exports = {
  name: 'help',
  aliases: ['h'],
  group: 'core',
  desc: oneLine`
    Displays a list of commands the bot can run. If given a command or group
    name, will display more information about that command or group (note that
    group names must have a \`/\` appended).
  `,
  usage: '[command/group name]',
  examples: [
    ['', 'Displays general help and a command list'],
    ['ping', 'Displays information about the `ping` command'],
    ['core/', 'Displays information about the `core/` command group']
  ],
  run ({message, args}) {
    const client = message.client
    if (!args) {
      // General help
      const groupsList = client.commands.groups.map.array()
      const commandsList = groupsList.map(group => oneLineCommaLists`
        **${group.title}: **${[...group.commands.values()].map(name =>
          `\`${name}\``
        )}
      `)
      message.channel.send(stripIndents`
        **__${client.info.name} Help__**
        Prefix: \`${client.prefix.base}\`
        ${oneLine`
          Use \`${client.prefix.ws}help <command>\` for more infromation about a
          command.
        `}
        ${commandsList.join('\n')}
      `)
    } else if (client.commands.find(args)) {
      // Command help
      const command = client.commands.find(args)
      // Command's group name
      const group = client.commands.groups.find(command.group).title
      // Command's description
      const desc = command.desc || '*No description found.*'
      // Command's aliases
      const aliases = command.aliases
        ? `\n**Aliases: **${command.aliases.map(alias =>
            `\`${alias}\``
          )}`
        : ''
      // Command's usage string
      const usage = command.usage
        ? `\n**Usage: **\`${client.prefix.ws}${command.name} ${command.usage}\``
        : typeof command.usage === 'string'
          ? `\n**Usage: **\`${client.prefix.ws}${command.name}\``
          : ''
      // Command's examples
      const examples = command.examples
        ? `\n**Examples: **\n${bullet}${command.examples.map(example =>
          example.length === 1
          ? `\`${client.prefix.ws}${command.name} ${example[0]}\``
          : oneLine`
              \`${client.prefix.ws}${command.name} ${example[0]}\` -
              ${example[1]}
            `
        ).join(`\n${bullet}`)}`
        : ''
      message.channel.send(stripIndents`
        **__${client.info.name} Help/${group}/${command.name}__**
        **\`${client.prefix.ws}${command.name}\`**
        ${desc}${aliases}${usage}${examples}
      `)
    } else if (client.commands.groups.find(isGroup(args))) {
      // Group help
      const group = client.commands.groups.find(isGroup(args))
      const commandsList = [...group.commands.values()].map(name => {
        const usage = client.commands.map.get(name).usage
        if (typeof usage === 'string') {
          return `\`${name}\` - \`${client.prefix.ws}${name} ${usage}\``
        }
        return `\`${name}\``
      })
      message.channel.send(stripIndents`
        **__${client.info.name} Help/${group.title}__**
        ${group.desc}
        ${bullet}${commandsList.join(`\n${bullet}`)}
      `)
    } else {
      // Unknown
      // A possible group with same name
      const possibleGroup = client.commands.groups.find(args)
        ? oneLine`
            However, found a group \`${args}/\`. To view information about this
            group, run \`${client.prefix.ws}help ${args}/\`.
          `
        : ''
      // A possbile command with same name
      const argsCmd = client.commands.find(args.slice(0, -1))
      const possibleCommand = argsCmd
        ? oneLine`
            However, found a command \`${argsCmd.name}\`. To view information
            about this command, run \`${client.prefix.ws}help ${argsCmd.name}\`.
          `
        : ''
      message.channel.send(stripIndents`
        **__${client.info.name} Help/Error 404: Not Found__**
        ${oneLine`
          Couldn't find a ${isGroup(args) ? 'group' : 'command'} "${args}".
          Run \`${client.prefix.ws}help\` for a list of all commands and groups.
        `}
        ${possibleGroup}${possibleCommand}
      `)
    }
  }
}
