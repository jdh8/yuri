import Discord from 'discord.js'
import chalk from 'chalk'
import {addCommands} from './commands/add'
import {generateCommands} from './commands/generate'
import {addEvents} from './events/add'
import {generateEvents} from './events/generate'
import {addGroups} from './groups/add'
import {generateGroups} from './groups/generate'
import {generatePrefix} from './prefix/generate'
import {addTypes} from './types/add'
import {generateTypes} from './types/generate'

export class KwClient extends Discord.Client {
  constructor ({
    events,
    prefix,
    types,
    groups,
    commands,
    info,
    print,
    ...options
  } = {}) {
    super(options)
    this.events = generateEvents(events)
    this.prefix = generatePrefix(prefix)
    this.types = generateTypes(types)
    this.groups = generateGroups(groups)
    this.commands = generateCommands(commands)
    this.info = info
    this.print = print || console
    addEvents(this, this.events.defaults)
    addGroups(this, this.groups.defaults)
    addCommands(this, this.commands.defaults)
    addTypes(this, this.types.defaults)
    this.emit('debug', chalk.green('All defaults successfully added!'))
  }
  addEvents (events) { addEvents(this, events) }
  addTypes (types) { addTypes(this, types) }
  addGroups (groups) { addGroups(this, groups) }
  addCommands (commands) { addCommands(this, commands) }
}
