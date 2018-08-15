const {Collection} = require('discord.js')
const {oneLine, oneLineCommaLists} = require('common-tags')
const {ArgumentError} = require('./argument-error')
const defaultTypes = require('./types')

const types = new Collection()

class ArgumentHandler {
  constructor ({
    name,
    optional = false,
    defaultValue,
    regex = /^('(?:\\'|[^'])+'|`(?:\\`|[^`])+`|"(?:\\"|[^"])+"|[^\s"`]+)(?:(?: *)(.+))?$/,
    type,
    oneOf,
    validate,
    transform,
    usageString
  }) {
    this.name = name
    this.optional = optional
    this.defaultValue = defaultValue
    this.regex = regex
    this.type = typeof type === 'string'
      ? types.get(type)
      : type
    this.oneOf = oneOf instanceof Set || oneOf === undefined
      ? oneOf
      : new Set(oneOf)
    this.validate = validate || (this.type && this.type.validate)
    this.transform = transform || (this.type && this.type.transform)
    const usageText = name + (this.type && this.type.name !== name
      ? `: ${this.type.name}`
      : '')
    this.usageString = usageString || optional
      ? `[${usageText}]`
      : `<${usageText}>`
  }
  handle ({args, message}) {
    let [, grabbed, remaining] = this.regex.exec(args)
    if (grabbed === '' || grabbed === 'undefined') {
      if (this.optional) {
        return {
          grabbed: typeof this.defaultValue === 'function'
            ? this.defaultValue({message, args})
            : this.defaultValue,
          remaining
        }
      } else {
        throw new ArgumentError(`Argument "${this.name}" must be provided`)
      }
    }
    console.log(this.validate)
    if (this.validate) {
      const valid = this.validate(grabbed, message)
      console.log(valid)
      if (!valid) {
        throw new ArgumentError(oneLine`
          Provided argument "${this.name}" should be of type ${this.type.name}
        `)
      } else if (valid === 'toobroad') {
        throw new ArgumentError(oneLine`
          Provided argument "${this.name}" was too broad; please be more
          specific
        `)
      }
    }
    if (this.transform) grabbed = this.transform(grabbed, message)
    if (this.oneOf && !this.oneOf.includes(grabbed)) {
      throw new ArgumentError(oneLineCommaLists`
        Provided argument "${this.name}" has an invalid value; valid values
        include: ${this.oneOf.map(value => `\`${value}\``).slice(14)}
      `)
    }
    return {grabbed, remaining}
  }
  static addTypes (newTypes) {
    if (!Array.isArray(newTypes)) newTypes = Object.values(newTypes)
    for (const type of newTypes) {
      types.set(type.name, type)
    }
  }
  static types () {
    return types
  }
}

ArgumentHandler.addTypes(defaultTypes)

module.exports = {
  ArgumentHandler
}
