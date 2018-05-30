module.exports = {
  name: 'ping',
  group: 'core',
  run ({message, args, client}) {
    const tick = process.hrtime()
    message.channel.send('Pinging...').then(message => {
      const ping = process.hrtime(tick)
      message.edit(`Pong! Heartbeat ping: ${(ping[0] * 1e3 + ping[1] * 1e-6).toFixed()} ms`)
    })
  }
}
