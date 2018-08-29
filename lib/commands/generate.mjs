import Discord from 'discord.js'
import {processDefaultCommands} from './process-defaults'

export function generateCommands (options = {
  disableDefaults: [],
  aliasGen: null,
  onArgumentError (message, error) {
    if (error instanceof Error) error = error.message
    message.channel.send(new Discord.RichEmbed({
      color: 0xff0000,
      title: `Command Error`,
      description: error,
      footer: {
        text: `Message from ${message.author.username}#${message.author.discriminator}`
      },
      timestamp: message.createdAt
    }))
  }
}) {
  const commands = {
    options,
    defaults: processDefaultCommands(options.disableDefaults),
    map: new Discord.Collection(),
    aliases: new Discord.Collection(),
    patterns: new Discord.Collection(),
    onArgumentError: options.onArgumentError
  }
  return commands
}
