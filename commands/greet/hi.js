const Commando = require('discord.js-commando')
const {oneLine} = require('common-tags')

module.exports = class extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'hi',
      aliases: ['hello', 'greet'],
      group: 'greet',
      memberName: 'hi',
      description: 'Say hi to Yuri or have Yuri say hi to someone',
      details: oneLine`
        If there is no one mentioned, Yuri will greet user.
        If someone (user, bot, role, everyone or here) is mentioned, Yuri will
        greet them.
      `,
      examples: ['yuri hi', 'yuri greet @user', 'Hi Yuri!'],
      args: [
        {
          key: 'mention',
          prompt: 'Who would you like me to say hi to?',
          type: 'string',
          validate: mention => /<@[&!]?\d+>|@here|@everyone/.test(mention),
          default: message => message.author.toString()
        }
      ],
      argsPromptLimit: 1,
      patterns: [new RegExp(oneLine`
        (hi|he[nl]lo|heyo?)
        (yuri|<@40765263605425766>)
      `)]
    })
  }
  async run (message, args) {
    const response = 'Hi'
    return message.channel.send(oneLine`
      ${response}
      ${args.mention || message.author.toString()}!
    `)
  }
}
