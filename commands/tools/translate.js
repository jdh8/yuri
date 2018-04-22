const Commando = require('discord.js-commando')
const translate = require('google-translate-api')
const japanese = require('japanese')
const kpop = require('kpop')
const {oneLine, stripIndent, oneLineCommaLists} = require('common-tags')

const translateLangs = require('../../assets/translate-langs')

const langs = {
  'romanized-japanese': {
    alias: ['romanji', 'romanized-japanese'],
    flag: 'flag_jp',
    fromFlag: 'flag_jp',
    translate: text => japanese.romanize(text)
  },
  'katakanized-japanese': {
    alias: ['katakana', 'katakanized-japanese'],
    flag: 'flag_jp',
    fromFlag: 'flag_jp',
    translate: text => japanese.katakanize(text)
  },
  'hiraganized-japanese': {
    alias: ['hiragana', 'hiraganized-japanese'],
    flag: 'flag_jp',
    fromFlag: 'flag_jp',
    translate: text => japanese.hiraganize(text)
  },
  'romanized-korean': {
    alias: ['romankr', 'romanized-korean'],
    flag: 'flag_kr',
    fromFlag: 'flag_kr',
    translate: text => kpop.romanize(text)
  },
  'hangulified-korean': {
    alias: ['hangul', 'hangulified-korean'],
    flag: 'flag_kr',
    fromFlag: 'flag_kr',
    translate: text => kpop.hangulify(text)
  },
  ...translateLangs
}

function getLang (language) {
  for (const lang in langs) {
    for (const alias of langs[lang].alias) {
      if (new RegExp(`^${alias}$`, 'i').test(language)) {
        return langs[lang]
      }
    }
  }
}

module.exports = class extends Commando.Command {
  constructor (client) {
    super(client, {
      name: 'translate',
      aliases: ['t'],
      group: 'tools',
      memberName: 'translate',
      description: 'Translate text into a another language',
      details: oneLine`
        Takes the specified text and translates it into the specified langauge,
        using Google Translate and a handful of other libraries. Can use all
        languages on Google Translate (plus a few more), and can be specified
        with either the full language name or the two letter "flag code" (e.g.
        japanese => ja or jp; english => en).
      ` + '\n' + oneLineCommaLists`
        **Available languages:** ${Object.values(langs).map(el => el.alias[1])}
      `,
      examples: [
        'yuri translate english 百合は最高ドキ',
        'yuri t en 人生のためのナイフ妻',
        'yuri t katana ゆり'
      ],
      args: [
        {
          key: 'language',
          prompt: 'What language do you want to translate into?',
          type: 'string',
          error: stripIndent`
            You provided an invalid language. Please try again.
            You can get a full list of available languages in the help entry.
          `,
          validate: language => getLang(language),
          parse: language => getLang(language)
        },
        {
          key: 'text',
          prompt: 'What text would you like to translate',
          type: 'string',
          max: 600,
          error: oneLine`
            The text you provided was too long! Please try again with less
            text.
          `
        }
      ]
    })
  }
  async run (message, args) {
    const messages = []
    try {
      if (args.language.translate) {
        const translated = args.language.translate(args.text)
        messages.push(await message.reply(stripIndent`
          here is your translation:
          :${args.language.fromFlag}: ${args.text}
          :${args.language.flag}: ${translated}
        `))
      } else {
        translate(args.text, {to: args.language.alias[0]}).then(async res => {
          const fromFlag = langs[res.from.language.iso].flag
          messages.push(await message.reply(stripIndent`
            here is your translation:
            :flag_${fromFlag}: ${res.from.text.value || args.text}
            :flag_${args.language.flag}: ${res.text}
          `))
        })
      }
    } catch (err) {
      messages.push(await message.reply(oneLine`
        there was a problem reaching the API! Please try again later.
      `))
    }
  }
}
