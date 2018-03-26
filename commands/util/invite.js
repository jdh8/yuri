const Commando = require('discord.js-commando')
const {stripIndent} = require('common-tags')

module.exports = class InviteCommand extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'invite',
      aliases: ['invite-link'],
      group: 'util',
      memberName: 'invite',
      description: 'Generates an invite link for KnifeWife'
    })
  }
  // TODO: remake this using Client#generateInvite
  async run (message, args) {
    return message.reply(stripIndent`
      here is your invite link:
      https://discordapp.com/oauth2/authorize?&client_id=407652636054257665&scope=bot
    `)
  }
}
