const Commando = require('discord.js-commando')
const {oneLine, stripIndent} = require('common-tags')

module.exports = class ChangeProfilePicCommand extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'set-game',
      aliases: ['change-game', 'chgame'],
      group: 'uncat',
      memberName: 'change-game',
      description: 'Chanes the bot\'s game status',
      ownerOnly: true,
      args: [
        {
          key: 'game',
          prompt: 'What would you like to set the bot\'s game to?',
          type: 'string',
          default: ''
        }
      ]
    })
  }
  async run (message, args) {
    const messages = []
    try {
      await this.client.user.setActivity(args.game || '')
      messages.push(await message.reply(oneLine`
        Successfully set game!
      `))
    } catch (err) {
      messages.push(await message.reply(stripIndent`
        There was an error setting the game:
        \`\`\`js
        ${err}
        \`\`\`
      `))
    }
    return messages
  }
}
