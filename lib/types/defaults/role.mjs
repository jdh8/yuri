import {bestMatch} from '../../util/best-match'

export default {
  name: 'role',
  validate (arg, message) {
    const roles = message.guild.roles
    const mention = /\d+/.exec(arg)
    return !!(mention
      ? roles.get(mention[0])
      : bestMatch(roles, arg)
    )
  },
  transform (arg, message) {
    const roles = message.guild.roles
    const mention = /\d+/.exec(arg)
    return mention
      ? roles.get(mention[0])
      : bestMatch(roles, arg)
  },
  unspecMsg () {
    return 'Please specify a role.'
  },
  invalidMsg (arg, val) {
    return `Couldn't find role "${val}," please try again.`
  }
}
