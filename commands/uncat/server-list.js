const Commando = require('discord.js-commando')
const {oneLine, stripIndents} = require('common-tags')

module.exports = class ServerListCommand extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'server-list',
      group: 'uncat',
      memberName: 'server-list',
      description: 'Lists all server Knife-Wife is apart of',
      ownerOnly: true
    })
  }
  async run (message, args) {
    const messages = []
    try {
      messages.push(await message.direct(stripIndents`
        __**KnifeWife Server List** (${this.client.guilds.array().length} total)__
        ${this.client.guilds
          .map(guild => `${guild.name} (${guild.id})`)
          .join('\n')
        }
      `))
      if (message.channel.type !== 'dm') {
        messages.push(await message.reply('Sent you a DM with information.'))
      }
    } catch (err) {
      messages.push(await message.reply(oneLine`
        Unable to send you help in DM. You probably have DMs disabled.
      `))
    }
    return messages
  }
}
