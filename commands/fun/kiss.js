const Commando = require('discord.js-commando')
const {oneLine} = require('common-tags')

module.exports = class extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'kiss',
      group: 'fun',
      memberName: 'kiss',
      description: 'Kiss on someone',
      examples: ['yuri kiss @user', 'yuri kiss user'],
      args: [
        {
          key: 'mention',
          prompt: 'Who would you like to kiss?',
          type: 'user'
        }
      ]
    })
  }
  async run (message, args) {
    message.channel.send('', {embed: {
      description: oneLine`
        <:yurikiss:411663233477509121>   ${message.author.toString()} kissed
        ${args.mention.toString()}!
      `,
      image: {
        url: 'https://cdn.discordapp.com/attachments/403299886352695297/438112675310993408/gg.png'
      },
      color: 0x9800FF
    }})
  }
}
