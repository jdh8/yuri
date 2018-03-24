const Commando = require('discord.js-commando')
const {oneLine, stripIndent} = require('common-tags')

module.exports = class ChangeProfilePicCommand extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'set-nickname',
      aliases: ['change-nickname', 'set-nick', 'chnick'],
      group: 'uncat',
      memberName: 'change-nickname',
      description: 'Chanes the bot\'s nickname',
      ownerOnly: true,
      guildOnly: true,
      args: [
        {
          key: 'nick',
          prompt: 'What would you like to set the bot\'s nickname to?',
          type: 'string',
          default: ''
        }
      ]
    })
  }
  async run (message, args) {
    const messages = []
    try {
      await message.guild.members.find('id', this.client.user.id)
        .setNickname(args.nick || 'hmmmm')
      messages.push(await message.reply(oneLine`
        Successfully set nickname!
      `))
    } catch (err) {
      messages.push(await message.reply(stripIndent`
        There was an error setting the nickname:
        \`\`\`js
        ${err}
        \`\`\`
      `))
    }
    return messages
  }
}
