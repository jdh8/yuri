const Discord = require('discord.js')
const Commando = require('discord.js-commando')
const Jimp = require('jimp')
const fs = require('fs')
const util = require('util')
const {stripIndent} = require('common-tags')

Jimp.prototype.getBufferAsync = util.promisify(Jimp.prototype.getBuffer)

const faces = fs.readdirSync('assets/sprite/face').map(face =>
  face.slice(0, -4)
)
const poses = {
  normal: ['normal', 'normal'],
  right: ['normal', 'hand'],
  both: ['hand', 'hand']
}

module.exports = class SpriteCommand extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'sprite',
      group: 'uncat',
      memberName: 'sprite',
      description: 'Composites a Yuri sprite',
      details: stripIndent`
        Valid faces: ${faces.map(face => `\`${face}\``).join(', ')}
        Valid hand positions: ${
          Object.getOwnPropertyNames(poses)
            .map(pose => `\`${pose}\``)
            .join(', ')
        }
      `,
      args: [
        {
          key: 'face',
          prompt: stripIndent`
            What should my expression be?
            Valid faces: ${faces.map(face => `\`${face}\``).join(', ')}
          `,
          type: 'string',
          validate: value => faces.indexOf(value.toLowerCase()) >= 0,
          parse: value => value.toLowerCase()
        },
        {
          key: 'pose',
          prompt: stripIndent`
            How should I have hands?
            Valid hand positions: ${
              Object.getOwnPropertyNames(poses)
                .map(pose => `\`${pose}\``)
                .join(', ')
            }
          `,
          label: 'hand position',
          type: 'string',
          validate: value => poses.hasOwnProperty(value.toLowerCase()),
          parse: value => value.toLowerCase()
        },
        {
          key: 'casual',
          prompt: 'Should I wear my casual clothes?\n(`yes` for casual)',
          type: 'string',
          validate: value => /yes|cas|casual|no|school|uniform/i.test(value),
          parse: value => /yes|casual|cas/i.test(value)
        }
      ]
    })
  }
  async run (message, args) {
    message.reply('compositing...')

    const casual = args.casual ? '-cas' : ''

    const face = `assets/sprite/face/${args.face}.png`
    const left = `assets/sprite/left/${poses[args.pose][0]}${casual}.png`
    const right = `assets/sprite/right/${poses[args.pose][1]}${casual}.png`

    const buffer = await Jimp.read(left).then(async image => {
      return image
        .composite(await Jimp.read(face), 0, 0)
        .composite(await Jimp.read(right), 0, 0)
        .getBufferAsync('image/png')
    })

    const attachment = new Discord.MessageAttachment(buffer, 'yuri.png')

    return message.reply('', attachment)
  }
}
