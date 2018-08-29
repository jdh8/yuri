export default {
  name: 'ping',
  group: 'core',
  desc: `Tests the bot's response time`,
  usage: '',
  examples: [
    ['', 'Pong! Displays the reponse time']
  ],
  run ({message, args}) {
    const tick = process.hrtime()
    message.channel.send('Pinging...').then(message => {
      const ping = process.hrtime(tick)
      message.edit(`Pong! Heartbeat ping: ${(ping[0] * 1e3 + ping[1] * 1e-6).toFixed()} ms`)
    })
  }
}
