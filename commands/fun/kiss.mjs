export default {
  name: 'kiss',
  aliases: ['muah'],
  group: 'fun',
  args: [
    {
      name: 'user',
      optional: true,
      defaultValue: ({message}) => message.author,
      type: 'user'
    }
  ],
  desc: 'Kiss a user',
  examples: [
    ['', 'Yuri kisses you'],
    ['@user', 'Give @user a kiss'],
    ['user', 'Also gives @user a kiss']
  ],
  run ({message, args, argsCollection}) {
    const user = argsCollection.get('user')
    const kisser = user.id === message.author.id ? 'Yuri' : message.author
    message.channel.send('', {
      embed: {
        description: `${kisser} kisses ${user}!`,
        image: {
          url: 'https://cdn.discordapp.com/attachments/403299886352695297/438112675310993408/gg.png'
        }
      }
    })
  }
}
