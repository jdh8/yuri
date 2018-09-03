import * as tags from 'common-tags'

function isGroup (group) {
  const match = /(.+)\/$/.exec(group)
  return match && match[1]
}

const bullet = '> '

export default {
  name: 'help',
  aliases: ['h'],
  group: 'core',
  desc: tags.oneLine`
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
      const groupsList = client.groups.map.array()
      const commandsList = groupsList.map(group => tags.oneLineCommaLists`
        **${group.title}: **${[...group.commands.values()].map(name =>
          `\`${name}\``
        )}
      `)
      message.channel.send(tags.stripIndents`
        **__${client.info.name} Help__**
        Prefix: \`${client.prefix.base}\`
        ${tags.oneLine`
          Use \`${client.prefix.ws}help <command>\` for more infromation about a
          command.
        `}
        ${commandsList.join('\n')}
      `)
    } else if (client.commands.aliases.has(args)) {
      // Command help
      const command = client.commands.map.get(client.commands.aliases.get(args))
      // Command's group name
      const group = client.groups.map.get(command.group).title
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
          : tags.oneLine`
              \`${client.prefix.ws}${command.name} ${example[0]}\` -
              ${example[1]}
            `
        ).join(`\n${bullet}`)}`
        : ''
      message.channel.send(tags.stripIndents`
        **__${client.info.name} Help/${group}/${command.name}__**
        **\`${client.prefix.ws}${command.name}\`**
        ${desc}${aliases}${usage}${examples}
      `)
    } else if (client.groups.map.has(isGroup(args))) {
      // Group help
      const group = client.groups.map.get(isGroup(args))
      const commandsList = [...group.commands.values()].map(name => {
        const usage = client.commands.map.get(name).usage
        if (typeof usage === 'string') {
          return `\`${name}\` - \`${client.prefix.ws}${name} ${usage}\``
        }
        return `\`${name}\``
      })
      message.channel.send(tags.stripIndents`
        **__${client.info.name} Help/${group.title}__**
        ${group.desc}
        ${bullet}${commandsList.join(`\n${bullet}`)}
      `)
    } else {
      // Unknown
      // A possible group with same name
      const possibleGroup = client.groups.map.get(args)
        ? tags.oneLine`
            However, found a group \`${args}/\`. To view information about this
            group, run \`${client.prefix.ws}help ${args}/\`.
          `
        : ''
      // A possbile command with same name
      const argsCmd = client.commands.map.get(args.slice(0, -1))
      const possibleCommand = argsCmd
        ? tags.oneLine`
            However, found a command \`${argsCmd.name}\`. To view information
            about this command, run \`${client.prefix.ws}help ${argsCmd.name}\`.
          `
        : ''
      message.channel.send(tags.stripIndents`
        **__${client.info.name} Help/Error 404: Not Found__**
        ${tags.oneLine`
          Couldn't find a ${isGroup(args) ? 'group' : 'command'} "${args}".
          Run \`${client.prefix.ws}help\` for a list of all commands and groups.
        `}
        ${possibleGroup}${possibleCommand}
      `)
    }
  }
}
