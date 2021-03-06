import {bestMatch} from '../../util/best-match'

export default {
  name: 'channel',
  validate (arg, message) {
    const channels = message.guild.channels
    const mention = /\d+/.exec(arg)
    return !!(mention
      ? channels.get(mention[0])
      : bestMatch(channels, arg)
    )
  },
  transform (arg, message) {
    const channels = message.guild.channels
    const mention = /\d+/.exec(arg)
    return mention
      ? channels.get(mention[0])
      : bestMatch(channels, arg)
  },
  unspecMsg () {
    return 'Please specify a channel.'
  },
  invalidMsg (arg, val) {
    return `Couldn't find channel "${val}," please try again.`
  }
}
