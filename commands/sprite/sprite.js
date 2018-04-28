const Discord = require('discord.js')
const Commando = require('discord.js-commando')
const Jimp = require('jimp')
const fs = require('fs')
const util = require('util')
const {stripIndent} = require('common-tags')

Jimp.prototype.getBufferAsync = util.promisify(Jimp.prototype.getBuffer)

const eyeSprites = fs.readdirSync('assets/sprite/eyes')
  .map(eyes => eyes.slice(0, -4))
const mouthSprites = fs.readdirSync('assets/sprite/mouth')
  .map(mouth => mouth.slice(0, -4))
const poses = {
  normal: ['normal', 'normal'],
  right: ['normal', 'hand'],
  both: ['hand', 'hand'],
  cuts: ['hand', 'cuts'],
  cutsonly: ['normal', 'cuts']
}

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
      name: 'sprite',
      aliases: ['yuri-sprite'],
      group: 'sprite',
      memberName: 'sprite',
      description: 'Composites a Yuri sprite',
      details: stripIndent`
        Arguments can be entered through prompts.
        **Eyes sprites:** ${list(eyeSprites)}
        **Mouth sprites:** ${list(mouthSprites)}
        **Poses:** ${list(poses)}
        **Clothing options: \`casual\`/\`yes\` or \`uniform\`/\`school\`/\`no\`
      `,
      examples: [
        'yuri sprite',
        'yuri sprite happy smile both casual',
        'yuri sprite insane-eyebrows fangs normal uniform'
      ],
      args: [
        {
          key: 'eyes',
          label: 'eyes sprites',
          prompt: stripIndent`
            Which eyes sprite do you want to use?
            **Eye sprites:** ${list(eyeSprites)}
          `,
          error: stripIndent`
            You provided an invalid sprite name. Please try again.
            **Eye sprites:** ${list(eyeSprites)}
          `,
          validate: eyes => eyeSprites.indexOf(eyes.toLowerCase()) !== -1,
          parse: eyes => eyes.toLowerCase()
        },
        {
          key: 'mouth',
          label: 'mouth sprites',
          prompt: stripIndent`
            Which mouth sprite do you want to use?
            **Mouth sprites:** ${list(mouthSprites)}
          `,
          error: stripIndent`
            You provided an invalid sprite name. Please try again.
            **Mouth sprites:** ${list(mouthSprites)}
          `,
          validate: mouth => mouthSprites.indexOf(mouth.toLowerCase()) !== -1,
          parse: mouth => mouth.toLowerCase()
        },
        {
          key: 'pose',
          label: 'pose',
          prompt: stripIndent`
            Which pose do you want to use?
            **Poses:** ${list(poses)}
          `,
          error: stripIndent`
            You provided an invalid pose name. Please try again.
            **Poses:** ${list(poses)}
          `,
          validate: pose => poses[pose.toLowerCase()],
          parse: pose => pose.toLowerCase()
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
    const eyes = `assets/sprite/eyes/${args.eyes}.png`
    const mouth = `assets/sprite/mouth/${args.mouth}.png`
    const left = `assets/sprite/left/${poses[args.pose][0]}${args.cas}.png`
    const right = `assets/sprite/right/${poses[args.pose][1]}${args.cas}.png`

    const buffer = await Jimp.read(left).then(async image => {
      return image
        .composite(await Jimp.read(eyes), 0, 0)
        .composite(await Jimp.read(mouth), 0, 0)
        .composite(await Jimp.read(right), 0, 0)
        .getBufferAsync('image/png')
    })
    const attachment = new Discord.MessageAttachment(buffer, 'yuri.png')

    return message.reply('', attachment)
  }
}
