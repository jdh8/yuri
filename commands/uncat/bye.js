const Commando = require('discord.js-commando')
const {oneLine} = require('common-tags')

module.exports = class ByeCommand extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'bye',
      aliases: ['good-bye', 'cya', 'see-ya'],
      group: 'uncat',
      memberName: 'bye',
      description: 'Say bye to Yuri or have Yuri say bye to someone',
      details: oneLine`
        If there is no one mentioned, Yuri will say good bye user.
        If someone (user, bot, role, everyone or here) is mentioned, Yuri will
        say good bye them.
      `,
      examples: ['yuri bye', 'yuri cya @user', 'Good bye Yuri!'],
      args: [
        {
          key: 'mention',
          prompt: 'Who would you like me to say bye to?',
          type: 'string',
          validate: mention => /<@[&!]?\d+>|@here|@everyone/.test(mention),
          default: message => message.author.toString()
        }
      ],
      patterns: [new RegExp(oneLine`
        ((good[- ]?)?bye|cya|see[- ]?ya|ttyl)
        (yuri|<@407652636054257665>)
      `)]
    })
  }
  async run (message, args) {
    const response = 'Good bye'
    message.channel.send(oneLine`
      ${response}
      ${args.mention || message.author.toString()}!
    `)
  }
}
