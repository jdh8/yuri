import {bestMatch} from '../../util/best-match'

export default {
  name: 'user',
  validate (arg, message) {
    const members = message.guild.members
    const mention = /\d+/.exec(arg)
    return !!(mention
      ? members.get(mention[0])
      : bestMatch(members, arg, 'displayName')
    )
  },
  transform (arg, message) {
    const members = message.guild.members
    const mention = /\d+/.exec(arg)
    return mention
      ? members.get(mention[0])
      : bestMatch(members, arg, 'displayName')
  }
}
