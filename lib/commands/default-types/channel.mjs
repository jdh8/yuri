function inexactSearch (search) {
  return obj => obj.name.toLowerCase().includes(search)
}
function exactSearch (search) {
  return obj => obj.name.toLowerCase() === search
}
export default {
  name: 'channel',
  validate (arg, message) {
    const match = /^(?:<@#)?([0-9]+)>?$/.exec(arg)
    if (match && message.guild.channels.has(match[1])) return true
    const search = arg.toLowerCase()
    const channels = message.guild.channels.filter(inexactSearch(search))
    if (channels.size === 0) return false
    if (channels.size === 1) return true
    const channelsExact = channels.filter(exactSearch(search))
    if (channelsExact === 0) return false
    if (channelsExact === 1) return true
    return {error: 'toobroad'}
  },
  transform (arg, message) {
    const match = /^(?:<@!?)?([0-9]+)>?$/.exec(arg)
    if (match) return match[1]
    const search = arg.toLowerCase()
    const channels = message.guild.channels.filter(inexactSearch(search))
    if (channels.size === 1) return channels.first()
    const channelsExact = channels.filter(exactSearch(search))
    if (channelsExact === 1) return channelsExact.first()
    return null
  }
}
