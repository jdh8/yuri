const Discord = require('discord.js')
const Commando = require('discord.js-commando')
const Jimp = require('jimp')
const fs = require('fs')

const faces = fs.readdirSync('assets/sprite/face').map(face =>
  face.slice(5, -4)
)

module.exports = class SpriteCommand extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'sprite',
      group: 'uncat',
      memberName: 'sprite',
      description: 'Composites a Yuri sprite',
      details: ``,
      args: [
        {
          key: 'face',
          prompt: 'What should my expression be? (normal or sprite name)',
          type: 'string',
          validate: value => faces.indexOf(value.toLowerCase()) >= 0,
          parse: value => value.toLowerCase()
        },
        {
          key: 'hands',
          prompt: 'Which hands should I have up? (none, right or both)',
          type: 'string',
          validate: value => /none|right|both/i.test(value),
          parse: value => [/both/i.test(value), /both|right/i.test(value)]
        },
        {
          key: 'casual',
          prompt: 'Should I wear my casual clothes? (yes for casual)',
          type: 'string',
          validate: value => /yes|casual|no|school|uniform/i.test(value),
          parse: value => /yes|casual/i.test(value)
        }
      ]
    })
  }
  async run (message, args) {
    message.channel.send('Compositing...')

    const left = `assets/sprite/left/left${args.casual ? '-cas' : ''}${args.hands[0] ? '-hand' : ''}.png`
    const face = `assets/sprite/face/face-${args.face}.png`
    const right = `assets/sprite/right/right${args.casual ? '-cas' : ''}${args.hands[1] ? '-hand' : ''}.png`

    Jimp.read(left).then(async image => {
      image
        .composite(await Jimp.read(face), 0, 0)
        .composite(await Jimp.read(right), 0, 0)
        .getBuffer('image/png', (err, buffer) => {
          if (err) throw err
          message.reply('', new Discord.MessageAttachment(buffer, 'yuri.png'))
        })
    })
  }
}
