import tags from 'common-tags'

export default {
  name: 'support',
  aliases: ['support-server'],
  group: 'core',
  desc: 'Get a link to my support server',
  usage: '',
  examples: [
    ['', 'Give an invitation to the bot\'s support server']
  ],
  run ({message, args}) {
    const client = message.client
    message.channel.send(client.info.invite
      ? tags.stripIndents`
          Here is a link to my support server!
          ${client.info.invite}
        `
      : 'I don\'t have a support server...'
    )
  }
}
