const Commando = require('discord.js-commando')
const {oneLine} = require('common-tags')

module.exports = class extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'nut',
      group: 'fun',
      memberName: 'nut',
      description: 'Nut on someone or something',
      details: 'If the object starts with "in", that will replace "on"',
      examples: ['yuri nut the floor', 'yuri nut in a bucket'],
      args: [
        {
          key: 'object',
          label: 'object to nut on',
          prompt: 'What would you like to nut on?',
          type: 'string'
        }
      ]
    })
  }
  async run (message, args) {
    return message.channel.send(oneLine`
      ${message.author.toString()} nuts
      ${/^in/i.test(args.object) ? 'in' : 'on'}
      ${args.object.replace(/^[io]n/i, '')}.
    `)
  }
}
