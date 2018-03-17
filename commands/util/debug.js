const Commando = require('discord.js-commando')

module.exports = class DebugCommand extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'debug',
      group: 'util',
      memberName: 'debug',
      description: 'debugging command',
      ownerOnly: true,
      args: [
        {
          key: 'guild',
          prompt: 'guild id',
          type: 'string'
        },
        {
          key: 'channel',
          prompt: 'channel name',
          type: 'string'
        },
        {
          key: 'debug',
          prompt: 'debug',
          type: 'string'
        }
      ]
    })
  }
  async run (message, args) {
    return this.client
      .guilds.find('id', args.guild)
      .channels.find('name', args.channel)
      .send(args.debug)
  }
}
