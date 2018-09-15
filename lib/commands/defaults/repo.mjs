import tags from 'common-tags'

export default {
  name: 'repo',
  aliases: ['gh'],
  group: 'core',
  desc: 'Gives a link to the bot\'s repository',
  usage: '',
  examples: [
    ['', 'Displays bot\'s repository link']
  ],
  run ({message, args}) {
    const client = message.client
    message.channel.send(client.info.repo
      ? tags.stripIndents`
          Here is a link to my repository!
          ${client.info.repo}
        `
      : 'I don\'t have a repository...'
    )
  }
}
