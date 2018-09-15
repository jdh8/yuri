export default {
  name: 'greet',
  aliases: ['hi', 'hello'],
  group: 'fun',
  args: [
    {
      name: 'user',
      optional: true,
      defaultValue: ({message}) => message.author,
      type: 'user'
    }
  ],
  desc: 'Greets a user\n\n*Other greets will be added in a future update!*',
  examples: [
    ['', 'Greets you'],
    ['@user', 'Greets @user'],
    ['user', 'Also greets @user']
  ],
  run ({message, args, argsCollection}) {
    const user = argsCollection.get('user')
    message.channel.send(`Hello, ${user}! <a:yuriwave:451348959831523339>`)
  }
}
