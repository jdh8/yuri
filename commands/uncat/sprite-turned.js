const Discord = require('discord.js')
const Commando = require('discord.js-commando')
const Jimp = require('jimp')
const fs = require('fs')
const util = require('util')
const {stripIndent} = require('common-tags')

Jimp.prototype.getBufferAsync = util.promisify(Jimp.prototype.getBuffer)

const faces = fs.readdirSync('assets/sprite/face-turned').map(face =>
  face.slice(0, -4)
)

const facesList = faces.map(face => `\`${face}\``).join(', ')
// Removed since only one option
// const poses = fs.readdirSync('assets/sprite/body-turned').map(pose =>
//   pos.slice(0, -4)
// )
// const posesList = Object.getOwnPropertyNames(poses)
//  .map(pose => `\`${post}\``)
//  .join(', ')

module.exports = class SpriteCommand extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'sprite-turned',
      aliases: ['sprite-shy'],
      group: 'uncat',
      memberName: 'sprite-turned',
      description: 'Composites a shy Yuri sprite',
      details: stripIndent`
        Not all arguments are required when ran; prompts include valid options.
        Valid faces: ${facesList}
        Clothing options: \`casual\`/\`yes\` or \`uniform\`/\`school\`/\`no\`
      `,
      examples: ['yuri sprite-shy', 'yuri sprite-shy smile casual'],
      args: [
        {
          key: 'face',
          prompt: stripIndent`
            What should my expression be?
            Valid faces: ${faces.map(face => `\`${face}\``).join(', ')}
          `,
          label: 'expression',
          type: 'string',
          validate: value => faces.indexOf(value.toLowerCase()) >= 0,
          parse: value => value.toLowerCase()
        },
        // Removed since only one option
        // {
        //   key: 'pose',
        //   prompt: stripIndent`
        //     How should I have hands?
        //     Valid hand positions: ${
        //       Object.getOwnPropertyNames(poses)
        //         .map(pose => `\`${pose}\``)
        //         .join(', ')
        //     }
        //   `,
        //   label: 'hand position',
        //   type: 'string',
        //   validate: value => poses.hasOwnProperty(value.toLowerCase()),
        //   parse: value => value.toLowerCase()
        // },
        {
          key: 'casual',
          prompt: 'Should I wear my casual clothes?\n(`yes` for casual)',
          label: 'clothing option',
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

    const face = `assets/sprite/face-turned/${args.face}.png`
    // const body = `assets/sprite/body-turned/${args.pos}${casual}.png`
    const body = `assets/sprite/body-turned/normal${casual}.png`

    const buffer = await Jimp.read(face).then(async image => {
      return image
        .composite(await Jimp.read(body), 0, 0)
        .getBufferAsync('image/png')
    })

    const attachment = new Discord.MessageAttachment(buffer, 'yuri.png')

    return message.reply('', attachment)
  }
}
