const {KwClient} = require('./lib/client')
const commands = require('./commands')

const client = new KwClient({
})
client.addDefaultEvents()
client.addDefaultCommands()
client.addCommands(commands)

client.login(process.env.KNIFEWIFE_TOKEN)
