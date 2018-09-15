export default {
  name: 'hug',
  aliases: ['daki'],
  group: 'fun',
  args: [
    {
      name: 'user',
      optional: true,
      defaultValue: ({message}) => message.author,
      type: 'user'
    }
  ],
  desc: 'Hug a user',
  examples: [
    ['', 'Yuri hugs you'],
    ['@user', 'Give @user a hug'],
    ['user', 'Also gives @user a hug']
  ],
  run ({message, args, argsCollection}) {
    const user = argsCollection.get('user')
    const hugger = user.id === message.author.id ? 'Yuri' : message.author
    message.channel.send('', {
      embed: {
        description: `${hugger} hugs ${user}!`,
        image: {
          url: 'https://cdn.discordapp.com/attachments/403697069857964042/432740154621427712/yuri-hug.png'
        }
      }
    })
  }
}
