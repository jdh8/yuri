import Jimp from 'jimp'
import tags from 'common-tags'
import fs from 'fs'

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
    return Object.getOwnPropertyNames(list).map(item => `\`${item}\``).join(', ')
  }
}

export default {
  name: 'sprite',
  aliases: ['yuri-sprite'],
  group: 'fun',
  desc: tags.stripIndents`
    Composities a Yuri sprite using given parameters. Here are the valid values for said parameters:
    **Eyes:** ${list(eyeSprites)}
    **Mouth:** ${list(mouthSprites)}
    **Poses:** ${list(poses)}
    **Outfits:** \`casual\`/\`cas\`/\`yes\` or \`uniform\`/\`no\`
  `,
  usage: '<eyes sprite> <mouth sprite> <pose> <outfit>',
  examples: [
    ['happy smile both casual', 'A happy Yuri in her sweater and tights'],
    ['insane-eyebrows fangs normal uniform', 'A crazy Yuri in her uniform']
  ],
  args: [
    {
      name: 'eyes',
      type: 'string',
      validate: val => eyeSprites.includes(val),
      transform: val => val.toLowerCase(),
      unspecMsg: () => 'Please provide an eye sprite name',
      invalidMsg: (arg, val) => tags.oneLine`
        ${val} is not a valid eye sprite; see help for list of valid sprites
      `
    },
    {
      name: 'mouth',
      type: 'string',
      validate: val => mouthSprites.includes(val),
      transform: val => val.toLowerCase(),
      unspecMsg: () => 'Please provide a mouth sprite name',
      invalidMsg: (arg, val) => tags.oneLine`
        ${val} is not a valid mouth sprite; see help for list of valid sprites
      `
    },
    {
      name: 'pose',
      type: 'string',
      validate: val => poses[val.toLowerCase()],
      transform: val => val.toLowerCase(),
      unspecMsg: () => 'Please provide a pose name',
      invalidMsg: (arg, val) => tags.oneLine`
        ${val} is not a valid pose; see help for list of valid pose
      `
    },
    {
      name: 'outfit',
      type: 'string',
      validate: val => /yes|cas(?:ual)?|no|school|uniform/i.test(val),
      transform: val => /yes|cas(?:ual)?/.test(val) ? '-cas' : '',
      unspecMsg: () => 'Please provide an outfit name',
      invalidMsg: (arg, val) => tags.oneLine`
        ${val} is not a valid outfit; see help for list of valid outfits
      `
    }
  ],
  async run ({message, args, argsCollection}) {
    const eyesOption = argsCollection.get('eyes')
    const mouthOption = argsCollection.get('mouth')
    const pose = argsCollection.get('pose')
    const cas = argsCollection.get('outfit')

    const eyes = `assets/sprite/eyes/${eyesOption}.png`
    const mouth = `assets/sprite/mouth/${mouthOption}.png`
    const left = `assets/sprite/left/${poses[pose][0]}${cas}.png`
    const right = `assets/sprite/right/${poses[pose][1]}${cas}.png`

    const buffer = await Jimp.read(left)
      .then(async image => {
        return image
          .composite(await Jimp.read(eyes), 0, 0)
          .composite(await Jimp.read(mouth), 0, 0)
          .composite(await Jimp.read(right), 0, 0)
          .getBufferAsync('image/png')
      })
    message.channel.send(tags.oneLine`
      <a:yurispinl:466077404805201921>
      \`Compositing...\`
      <a:yurispin:466077395057639424>
    `).then(async msg => {
      await buffer
      await msg.delete()
      message.channel.send(tags.oneLine`
        <:yuripointl:466391949876789258>
        Here is your image ${message.author}!
        <:yuripoint:466391577632309253>
        `, {files: [buffer]})
    })
  }
}
