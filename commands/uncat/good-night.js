const Commando = require('discord.js-commando')
const {oneLine} = require('common-tags')

module.exports = class GoodNightCommand extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'good-night',
      aliases: ['gn'],
      group: 'uncat',
      memberName: 'good-night',
      description: oneLine`
        Say good night to Yuri or have Yuri say good night to someone
      `,
      details: oneLine`
        If there is no one mentioned, Yuri will say good night user.
        If someone (user, bot, role, everyone or here) is mentioned, Yuri will
        say good night them.
      `,
      examples: ['yuri good-night', 'yuri gn @user', 'Good night Yuri!'],
      args: [
        {
          key: 'mention',
          prompt: 'Who would you like me to say good night to?',
          type: 'string',
          validate: mention => /<@[&!]?\d+>|@here|@everyone/.test(mention),
          default: message => message.author.toString()
        }
      ],
      patterns: [new RegExp(oneLine`
        ((good[- ]?)?night|gn)
        (yuri|<@407652636054257665>)
      `)]
    })
  }
  async run (message, args) {
    const response = 'Good night'
    message.channel.send(oneLine`
      ${response}
      ${args.mention || message.author.toString()}!
    `)
  }
}
