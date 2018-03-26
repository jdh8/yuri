const Commando = require('discord.js-commando')
const seeded = require('seed-random')

const rigs = {
  yuri: 10,
  '<@407652636054257665>': 10,
  knives: 10
}

module.exports = class extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'rate',
      group: 'fun',
      memberName: 'rate',
      description: 'Rates something out of 10',
      examples: ['yuri rate @user', 'yuri rate knives'],
      args: [
        {
          key: 'toRate',
          label: 'object',
          prompt: 'What would you like me to rate?',
          type: 'string'
        }
      ]
    })
  }
  async run (message, args) {
    const seed = args.toRate.toLowerCase()
    const rating = rigs.hasOwnProperty(seed)
      ? rigs[seed]
      : Math.floor(seeded(seed)() * 100) / 10
    return message.reply(`I give ${args.toRate} a ${rating}/10.`)
  }
}
