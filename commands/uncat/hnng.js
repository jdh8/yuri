const Commando = require('discord.js-commando')

module.exports = class HnngCommand extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'hnng',
      group: 'uncat',
      memberName: 'hnng',
      description: '*HNNNNNG*',
      defaultHandling: false,
      patterns: [/^[*`]*h+n+g+[*`]*/i]
    })
  }
  async run (message, args) {
    return message.channel.send('', {embed: {
      image: {
        url: 'https://cdn.discordapp.com/attachments/403299886352695297/424809981066608640/hnng.gif'
      },
      color: 9961727
    }})
  }
}
