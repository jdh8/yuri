const Commando = require('discord.js-commando')
const {stripIndent} = require('common-tags')

module.exports = class extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'set-avatar',
      aliases: ['chavatar', 'chpfp'],
      group: 'util',
      memberName: 'set-avatar',
      description: 'Changes the Yuri\'s profile picture to a given URL',
      ownerOnly: true,
      args: [
        {
          key: 'pic',
          prompt: 'What would you like to set my avatar to?',
          type: 'string'
        }
      ],
      argsPrmoptLimit: 1
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
