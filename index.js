const Commando = require('discord.js-commando')
const sqlite = require('sqlite')
const path = require('path')

const client = new Commando.Client({
  commandPrefix: 'yuri',
  nonCommandEditable: false,
  unknownCommandResponse: false,
  owner: '212212754033934336'
})

client
  .on('ready', () => {
    console.log(`Client logged in as ${client.user.tag} (${client.user.id})`)
  })

client.setProvider(
  sqlite.open(path.join(__dirname, 'settings.sqlite3'))
    .then(db => new Commando.SQLiteProvider(db))
).catch(console.error)

client.registry
  .registerDefaults()

client.login(process.env.KNIFEWIFE_TOKEN)
