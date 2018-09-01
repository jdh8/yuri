import tags from 'common-tags'

export default {
  name: 'ping',
  group: 'core',
  desc: `Tests the bot's resopnse time, or heartbeat ping.`,
  usage: '',
  examples: [
    ['', 'Pong! Displays the reponse time']
  ],
  run ({message, args}) {
    const tick = process.hrtime()
    message.channel.send(tags.oneLine`
      <a:yurispinl:466077404805201921>
      \`Pinging...\`
      <a:yurispin:466077395057639424>
    `).then(message => {
      const ping = process.hrtime(tick)
      message.edit(tags.oneLine`
        <:yuripointl:466391949876789258>
        Pong! ${(ping[0] * 1e3 + ping[1] * 1e-6).toFixed()} ms
        <:yuripoint:466391577632309253>
      `)
    })
  }
}
