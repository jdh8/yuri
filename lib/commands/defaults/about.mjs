import tags from 'common-tags'

const bullet = '> '

export default {
  name: 'about',
  group: 'core',
  desc: 'Displays some information about the bot',
  usage: '',
  examples: [
    ['', 'Displays bot information']
  ],
  run ({message, args}) {
    const client = message.client
    const version = client.info.version ? ` v${client.info.version}` : ''
    const desc = client.info.desc || '*No description found.*'
    const developer = client.info.developer
      ? Array.isArray(client.info.developer) && client.info.developer.length > 1
        ? '\n' + tags.stripIndents`
            **Developers:**
            ${bullet}${client.info.developer.join(`\n${bullet}`)}
          `
        : `\n**Developer:** ${client.info.developer}`
      : ''
    const repo = client.info.repo
      ? `\n**Repository:** ${client.info.repo}`
      : ''
    message.channel.send(tags.stripIndents`
      **__${client.info.name}__**${version}
      ${desc}
      ${developer}${repo}
    `)
  }
}
