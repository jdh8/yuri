const Commando = require('discord.js-commando')
const {oneLine} = require('common-tags')

module.exports = class ByeCommand extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'welcome-back',
      aliases: ['wb'],
      group: 'uncat',
      memberName: 'welcome-back',
      description: oneLine`
        Have Yuri say good night to someone
      `,
      details: oneLine`
        If there is no one mentioned, Yuri will say welcome back user.
        If someone (user, bot, role, everyone or here) is mentioned, Yuri will
        say welcome back them.
      `,
      examples: ['yuri welcome-back @user'],
      args: [
        {
          key: 'mention',
          prompt: 'Who would you like me to say welcome back to?',
          type: 'string',
          validate: mention => /<@[&!]?\d+>|@here|@everyone/.test(mention),
          default: message => message.author.toString()
        }
      ]
    })
  }
  async run (message, args) {
    const response = 'Welcome back'
    message.channel.send(oneLine`
      ${response}
      ${args.mention || message.author.toString()}!
    `)
  }
}
