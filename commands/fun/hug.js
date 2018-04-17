const Commando = require('discord.js-commando')
const {oneLineCommaListsAnd} = require('common-tags')

module.exports = class extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'hug',
      group: 'fun',
      memberName: 'hug',
      description: 'Mention someone to hug',
      examples: ['yuri hug @user'],
      args: [
        {
          key: 'person',
          label: 'mention',
          prompt: 'Who would you like to hug? (mention one or more users)',
          type: 'string',
          validate: person => /^((<@[!&]?\d+>|@everyone|@here)\s*)+$/.test(person),
          parse: person => person.replace(/\s/g, ',').split(',')
        }
      ]
    })
  }
  async run (message, args) {
    return message.channel.send('', {
      embed: {
        description: oneLineCommaListsAnd`
          ${message.author.toString()} hugs
          ${args.person}
        `,
        image: {
          url: 'https://cdn.discordapp.com/attachments/403697069857964042/432740154621427712/yuri-hug.png'
        },
        color: 0x9800FF
      }
    })
  }
}
