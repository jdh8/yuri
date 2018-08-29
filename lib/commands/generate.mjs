import Discord from 'discord.js'
import {processDefaultCommands} from './process-defaults'

export function generateCommands (options = {
  disableDefaults: [],
  aliasGen: null
}) {
  const commands = {
    options,
    defaults: processDefaultCommands(options.disableDefaults),
    map: new Discord.Collection(),
    aliases: new Discord.Collection(),
    patterns: new Discord.Collection()
  }
  return commands
}
