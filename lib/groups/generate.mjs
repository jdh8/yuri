import Discord from 'discord.js'
import {processDefaultGroups} from './process-defaults'

export function generateGroups (options = {disableDefaults: []}) {
  const groups = {
    options,
    map: new Discord.Collection(),
    defaults: processDefaultGroups(options.disableDefaults)
  }
  return groups
}
