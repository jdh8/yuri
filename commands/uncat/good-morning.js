const Commando = require('discord.js-commando')
const {oneLine} = require('common-tags')

module.exports = class GoodMorningCommand extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'good-morning',
      aliases: ['gm'],
      group: 'uncat',
      memberName: 'good-morning',
      description: oneLine`
        Say good morning to Yuri or have Yuri say good morning to someone
      `,
      details: oneLine`
        If there is no one mentioned, Yuri will say good morning user.
        If someone (user, bot, role, everyone or here) is mentioned, Yuri will
        say good morning them.
      `,
      examples: ['yuri good-morning', 'yuri gm @user', 'Good morning Yuri!'],
      args: [
        {
          key: 'mention',
          prompt: 'Who would you like me to say good morning to?',
          type: 'string',
          validate: mention => /<@[&!]?\d+>|@here|@everyone/.test(mention),
          default: message => message.author.toString()
        }
      ],
      patterns: [new RegExp(oneLine`
        ((good[- ]?)?morning|gm)
        (yuri|<@407652636054257665>)
      `)]
    })
  }
  async run (message, args) {
    const response = 'Good morning'
    message.channel.send(oneLine`
      ${response}
      ${args.mention || message.author.toString()}!
    `)
  }
}
