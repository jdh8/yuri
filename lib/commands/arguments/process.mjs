import Discord from 'discord.js'
import {ArgumentError} from './argument-error'

export async function processArgs (message, passed, args) {
  const argsCollection = new Discord.Collection()
  let remaining = passed
  for (const arg of args) {
    let grabbed
    [, grabbed, remaining] = arg.regex.exec(remaining)
    if (grabbed === '' || grabbed === 'undefined') {
      if (arg.optional) {
        grabbed = typeof arg.defaultValue === 'function'
          ? arg.defaultValue({message, args: passed})
          : arg.defaultValue
      } else {
        throw new ArgumentError(arg.unspecMsg
          ? arg.unspecMsg(arg)
          : `Argument "${arg.name}" must be provided`
        )
      }
    }
    if (arg.validate && !arg.validate(grabbed, message)) {
      throw new ArgumentError(arg.invalidMsg
        ? arg.invalidMsg(arg, grabbed)
        : `"${grabbed}" is not of type ${arg.type.name}`
      )
    }
    if (arg.transform) grabbed = arg.transform(grabbed, message)
    // Set
    argsCollection.set(arg.name, grabbed)
  }
  return argsCollection
}
