const {KwClient} = require('./lib/client')
const commands = require('./commands')

const client = new KwClient({
})
  .on('ready', () => {
    console.log('Ready!')
  })
client.addDefaultCommands()
client.addCommands(commands)

client.login(process.env.KNIFEWIFE_TOKEN)
