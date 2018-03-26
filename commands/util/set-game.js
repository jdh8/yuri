const Commando = require('discord.js-commando')
const {oneLine, stripIndent} = require('common-tags')

module.exports = class extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'set-game',
      aliases: ['chgame'],
      group: 'util',
      memberName: 'set-game',
      description: 'Changes the Yuri\'s game status',
      ownerOnly: true,
      args: [
        {
          key: 'game',
          prompt: 'What would you like to set my game to?',
          type: 'string',
          default: ''
        }
      ],
      argsPrmoptLimit: 1
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
