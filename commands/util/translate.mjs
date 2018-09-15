import translate from 'google-translate-api'
import Discord from 'discord.js'
import {aliases, flags} from '../../assets/translate-langs'

function flag (lang) { return `:flag_${flags.get(aliases.has(lang) ? aliases.get(lang) : lang)}:` }

export default {
  name: 'translate',
  aliases: ['translation', 't'],
  group: 'util',
  args: [
    {
      name: 'from',
      optional: true,
      defaultValue: undefined,
      regex: /^(\S+) *-> *(.+)$/,
      type: 'string'
    },
    {
      name: 'lang',
      regex: /^(\S+) *([^]+)$/,
      type: 'string'
    },
    {
      name: 'text',
      regex: /^([^]+)$/,
      type: 'string'
    }
  ],
  desc: 'Translate text using Google Translate. Specify a language to translate to and text to translate. The translator can pick out the language you are translating from with relative accuracy, however you can force a language by specify it followed by a `->` before the result language',
  usage: '[fromLang->] <toLang> <text>',
  examples: [
    ['english こんにちは', 'Translates given text ("こんにちは") to given language (English)'],
    ['en もしもし', 'Language can be specifed with an ISO abbreviation'],
    ['french -> japanese dont', 'Specifying a langauge for the orginal text, in case the translator selects the wrong one'],
    ['fr->ja dont', 'The above except with shorthand and less whitespace']
  ],
  run ({message, args, argsCollection}) {
    const originalText = argsCollection.get('text')
    const fromLang = argsCollection.get('from') === 'undefined' ? undefined : argsCollection.get('from')
    const toLang = argsCollection.get('lang')
    translate(originalText, {from: fromLang, to: toLang})
      .then(res => {
        const embed = new Discord.RichEmbed()
          .setColor(0x4b8bf5)
          .setTitle('Translation')
          .addField('Original', `${flag(fromLang || res.from.language.iso)} ${res.from.text.autoCorrected ? res.from.text.value : originalText}`, true)
          .addField('Result', `${flag(toLang)} ${res.text}`, true)
          .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
          .setTimestamp(message.createdAt)
        if (res.from.text.didYouMean || res.from.language.didYouMean) {
          embed.addField('Did you mean...', `${flag(res.from.language.iso)} ${res.from.text.value || originalText}`)
        }
        message.channel.send('', embed)
      })
      .catch(e => message.client.commands.onArgumentError(message, e))
  }
}
