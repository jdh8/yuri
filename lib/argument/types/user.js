function inexactSearch (search) {
  return member =>
    member.user.username.toLowerCase().includes(search) ||
      (member.nickname && member.nickname.toLowerCase().includes(search)) ||
      `${member.user.username.toLowerCase()}#${member.user.discriminator}`.includes(search)
}
function exactSearch (search) {
  return member =>
    member.user.username.toLowerCase() === search ||
      (member.nickname && member.nickname.toLowerCase() === search) ||
      `${member.user.username.toLowerCase()}#${member.user.discriminator}` === search
}

module.exports = {
  name: 'user',
  validate (arg, message) {
    const match = /^(?:<@!?)?([0-9]+)>?$/.exec(arg)
    if (match && message.guild.members.has(match[1])) return true
    const search = arg.toLowerCase()
    const members = message.guild.members.filter(inexactSearch(search))
    if (members.size === 0) return false
    if (members.size === 1) return true
    const membersExact = members.filter(exactSearch(search))
    if (membersExact === 0) return false
    if (membersExact === 1) return true
    return {error: 'toobroad'}
  },
  transform (arg, message) {
    const match = /^(?:<@!?)?([0-9]+)>?$/.exec(arg)
    if (match) return match[1]
    const search = arg.toLowerCase()
    const members = message.guild.members.filter(inexactSearch(search))
    if (members.size === 1) return members.first()
    const membersExact = members.filter(exactSearch(search))
    if (membersExact === 1) return membersExact.first()
    return null
  }
}
