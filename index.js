const Commando = require('discord.js-commando')
const sqlite = require('sqlite')
const path = require('path')
const {oneLine} = require('common-tags')

const client = new Commando.Client({
  commandPrefix: process.env.KNIFEWIFE_PREFIX || 'yuri',
  nonCommandEditable: false,
  unknownCommandResponse: false,
  owner: '212212754033934336'
})

client
  .on('error', console.error)
  .on('warn', console.warn)
  .on('debug', console.log)
  .on('ready', () => {
    console.log(`Client logged in as ${client.user.tag} (${client.user.id})`)
  })
  .on('disconnect', () => {
    console.warn('Disconnected!')
  })
  .on('reconnecting', () => {
    console.warn('Reconnecting...')
  })
  .on('commandError', (cmd, err) => {
    if (err instanceof Commando.FriendlyError) return
    console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err)
  })
  .on('commandBlocked', (msg, reason) => {
    console.log(oneLine`
      Command ${msg.command ? `${msg.command.groupID}` : ''} blocked; ${reason}
    `)
  })
  .on('commandPrefixChange', (guild, prefix) => {
    console.log(oneLine`
      Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'default'}`}
      ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
    `)
  })
  .on('commandStatusChange', (guild, command, enabled) => {
    console.log(oneLine`
      Command ${command.groupID}:${command.memberName}
      ${enabled ? 'enabled' : 'disabled'}
      ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
    `)
  })
  .on('groupStatusChange', (guild, group, enabled) => {
    console.log(oneLine`
      Group ${group.id}
      ${enabled ? 'enabled' : 'disabled'}
      ${guild ? `in guild ${guild.aname} (${guild.id})` : 'globally'}.
    `)
  })

client.setProvider(
  sqlite.open(path.join(__dirname, 'settings.sqlite3'))
    .then(db => new Commando.SQLiteProvider(db))
).catch(console.error)

client.registry
  .registerGroups([
    ['greet', 'Greeting Commands'],
    ['fun', 'Fun Commands'],
    ['tools', 'Useful Commands'],
    ['sprite', 'Sprite Commands'],
    ['uncat', 'Uncategorized']
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, 'commands'))

client.login(process.env.KNIFEWIFE_TOKEN)
