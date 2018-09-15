import {default as tags} from 'common-tags'

export default {
  name: 'natsuki',
  aliases: ['natsu', 'tsunedere'],
  group: 'core',
  desc: 'A link to my friend, Natsuki',
  usage: '',
  examples: [
    ['', 'Provides a link to Natsuki']
  ],
  run ({message}) {
    message.channel.send(tags.oneLine`
      This is my friend, Natsuki. Although she can be obnoxious at times and
      doesn't know what literature is, she's nice. You can reach her here:
      https://discordbots.org/bot/410315411695992833
    `)
  }
}
