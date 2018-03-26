const Commando = require('discord.js-commando')
const {oneLine, stripIndent} = require('common-tags')

module.exports = class extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'set-nickname',
      aliases: ['set-nick', 'chnick'],
      group: 'util',
      memberName: 'set-nickname',
      description: 'Changes the Yuri\'s nickname',
      ownerOnly: true,
      guildOnly: true,
      args: [
        {
          key: 'nick',
          prompt: 'What would you like to set the my nickname to?',
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
      await message.guild.members.find('id', this.client.user.id)
        .setNickname(args.nick || '')
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
