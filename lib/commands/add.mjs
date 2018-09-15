import tags from 'common-tags'
import {addEvents} from '../events/add'
import {validateCommand} from './validate'
import {ArgumentError} from './arguments/argument-error'
import {getType} from '../types/get'
import {processArgs} from './arguments/process'

export function addCommands (client, commands) {
  if (!Array.isArray(commands)) commands = Object.values(commands)
  for (const command of commands) {
    validateCommand(client, command)
    // Mutate
    if (command.aliasGen == null) command.aliasGen = client.commands.options.aliasGen
    if (command.args) {
      for (const arg of command.args) {
        if (arg.optional == null) arg.optional = false
        if (!arg.regex) arg.regex = /^('(?:\\'|[^'])+'|`(?:\\`|[^`])+`|"(?:\\"|[^"])+"|[^\s"`]+)(?:(?: *)(.+))?$/
        arg.type = typeof arg.type === 'string' ? getType(client, arg.type) : arg.type
        if (!arg.validate && arg.type) arg.validate = arg.type.validate
        if (!arg.transform && arg.type) arg.transform = arg.type.transform
        if (!arg.unspecMsg && arg.type) arg.unspecMsg = arg.type.unspecMsg
        if (!arg.invalidMsg && arg.type) arg.invalidMsg = arg.type.invalidMsg
        arg.usageString = arg.usageString
          ? arg.usageString
          : tags.oneLineTrim`
            ${arg.optional ? '[' : '<'}
            ${arg.name}
            ${arg.type && (arg.type.name !== arg.name) ? `: ${arg.type.name}` : ''}
            ${arg.optional ? ']' : '>'}
          `
      }
      if (!command.usage) command.usage = command.args.map(arg => arg.usageString).join(' ')
      command.execute = async function ({message, args}) {
        let argsCollection
        try {
          argsCollection = await processArgs(message, args, command.args)
        } catch (e) {
          if (e instanceof ArgumentError) {
            console.log(client.commands.onArgumentError)
            client.commands.onArgumentError(message, e)
          } else {
            throw e
          }
        }
        command.run({message, args, argsCollection})
      }
    } else {
      command.execute = command.run
    }
    // Add it
    client.commands.map.set(command.name, command)
    client.groups.map.get(command.group).commands.add(command.name)
    const aliases = new Set(
      [command.name]
        .concat(command.aliases || [])
        .map(command.aliasGen ? alias => alias.replace(/-/g, '') : x => x)
    )
    aliases.delete(null)
    for (const alias of aliases) {
      client.commands.aliases.set(alias, command.name)
    }
    if (command.pattern) client.commands.patterns.set(command.pattern, command.name)
    if (command.events) addEvents(client, command.events)
    client.emit('debug', `Successfully added command "${command.name}"`)
  }
}
