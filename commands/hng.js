module.exports = {
  name: 'hng',
  group: 'interjections',
  pattern: /^[*`~_]*h+n+g+[*`~_]*|[*`~_]*h+n+g+[*`~_]*$/im,
  run ({message, args, client}) {
    message.channel.send('', {embed: {
      image: {
        url: 'https://cdn.discordapp.com/attachments/403299886352695297/424809981066608640/hnng.gif'
      },
      color: 0x9800FF
    }})
  }
}
