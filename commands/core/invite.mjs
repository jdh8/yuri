import tags from 'common-tags'

export default {
  name: 'invite',
  aliases: ['invite-link'],
  group: 'core',
  desc: 'Generates an invite link to invite me to your server',
  usage: '',
  async run ({message, args}) {
    message.channel.send(tags.stripIndents`
      Invite me to your server!
      ${await message.client.generateInvite()}
    `)
  }
}
