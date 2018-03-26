const Commando = require('discord.js-commando')

module.exports = class extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'hnng',
      group: 'fun',
      memberName: 'hnng',
      description: '*HNNNNNG*',
      example: ['*HNNG*'],
      defaultHandling: false,
      patterns: [/^[*`~_]*h+n+g+[*`~_]*|[*`~_]*h+n+g+[*`~_]*$/im]
    })
  }
  async run (message, args) {
    return message.channel.send('', {embed: {
      image: {
        url: 'https://cdn.discordapp.com/attachments/403299886352695297/424809981066608640/hnng.gif'
      },
      color: 0x9800FF
    }})
  }
}
