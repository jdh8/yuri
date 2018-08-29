function inexactSearch (search) {
  return obj => obj.name.toLowerCase().includes(search)
}
function exactSearch (search) {
  return obj => obj.name.toLowerCase() === search
}
export default {
  name: 'role',
  validate (arg, message) {
    const match = /^(?:<@#)?([0-9]+)>?$/.exec(arg)
    if (match && message.guild.roles.has(match[1])) return true
    const search = arg.toLowerCase()
    const roles = message.guild.roles.filter(inexactSearch(search))
    if (roles.size === 0) return false
    if (roles.size === 1) return true
    const rolesExact = roles.filter(exactSearch(search))
    if (rolesExact === 0) return false
    if (rolesExact === 1) return true
    return {error: 'toobroad'}
  },
  transform (arg, message) {
    const match = /^(?:<@!?)?([0-9]+)>?$/.exec(arg)
    if (match) return match[1]
    const search = arg.toLowerCase()
    const roles = message.guild.roles.filter(inexactSearch(search))
    if (roles.size === 1) return roles.first()
    const rolesExact = roles.filter(exactSearch(search))
    if (rolesExact === 1) return rolesExact.first()
    return null
  }
}
