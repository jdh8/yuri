const Commando = require('discord.js-commando')
const {stripIndent} = require('common-tags')

module.exports = class ChangeProfilePicCommand extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'set-avatar',
      aliases: ['change-avatar', 'set-pfp', 'chavatar', 'chpfp'],
      group: 'uncat',
      memberName: 'change-profile-pic',
      description: 'Chanes the bot\'s profile picture to a given URL',
      ownerOnly: true,
      args: [
        {
          key: 'pic',
          prompt: 'What would you like to set the avatar to?',
          type: 'string'
        }
      ]
    })
  }
  async run (message, args) {
    const messages = []
    try {
      await this.client.user.setAvatar(args.pic)
      messages.push(await message.reply('Successfully set avatar!'))
    } catch (err) {
      messages.push(await message.reply(stripIndent`
        There was an error setting the avatar:
        \`\`\`js
        ${err}
        \`\`\`
      `))
    }
    return messages
  }
}
