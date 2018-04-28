const Discord = require('discord.js')
const Commando = require('discord.js-commando')
const Jimp = require('jimp')
const fs = require('fs')
const util = require('util')
const {stripIndent} = require('common-tags')

Jimp.prototype.getBufferAsync = util.promisify(Jimp.prototype.getBuffer)

const faceSprites = fs.readdirSync('assets/sprite/face-turned')
  .map(face => face.slice(0, -4))

function list (list) {
  if (Array.isArray(list)) {
    return list.map(item => `\`${item}\``).join(', ')
  } else {
    return Object.getOwnPropertyNames(list).map(item => `\`${item}\``)
      .join(', ')
  }
}

module.exports = class extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'sprite-shy',
      aliases: ['sprite-turned', 'yuri-sprite-turned', 'yuri-sprite-turned'],
      group: 'sprite',
      memberName: 'sprite-shy',
      description: 'Composites a shy Yuri sprite',
      details: stripIndent`
        Arguments can be entered through prompts.
        **Face sprites:** ${list(faceSprites)}
        **Clothing options: \`casual\`/\`yes\` or \`uniform\`/\`school\`/\`no\`
      `,
      examples: [
        'yuri sprite-shy',
        'yuri sprite-shy smile casual',
        'yuri sprite-shy normal uniform'
      ],
      args: [
        {
          key: 'face',
          label: 'face sprites',
          prompt: stripIndent`
            Which face sprite do you want to use?
            **Face sprites:** ${list(faceSprites)}
          `,
          error: stripIndent`
            You provided an invalid sprite name. Please try again.
            **Face sprites:** ${list(faceSprites)}
          `,
          validate: face => faceSprites.indexOf(face.toLowerCase()) !== -1,
          parse: face => face.toLowerCase()
        },
        {
          key: 'cas',
          label: 'outfit',
          prompt: 'Which outfit should be used?',
          validate: cas => /yes|cas|casual|no|school|uniform/i.test(cas),
          parse: cas => /yes|cas|casual/i.test(cas) ? '-cas' : ''
        }
      ],
      argsPromptLimit: 1
    })
  }
  async run (message, args) {
    const face = `assets/sprite/face-turned/${args.face}.png`
    const body = `assets/sprite/left/normal${args.cas}.png`

    const buffer = await Jimp.read(face).then(async image => {
      return image
        .composite(await Jimp.read(body), 0, 0)
        .getBufferAsync('image/png')
    })
    const attachment = new Discord.MessageAttachment(buffer, 'yuri.png')

    return message.reply('', attachment)
  }
}
