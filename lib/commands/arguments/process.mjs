import Discord from 'discord.js'
import {ArgumentError} from './argument-error'

export async function processArgs (message, passed, args) {
  const argsCollection = new Discord.Collection()
  let remaining = passed
  for (const arg of args) {
    let grabbed
    [, grabbed, remaining] = arg.regex.exec(passed)
    if (grabbed === '' || grabbed === 'undefined') {
      if (arg.optional) {
        return {
          grabbed: typeof arg.defaultValue === 'function'
            ? arg.defaultValue({message, args: passed})
            : arg.defaultValue,
          remaining
        }
      } else {
        throw new ArgumentError(`Argument "${arg.name}" must be provided`)
      }
    }
    if (arg.validate) {
      const valid = arg.validate(grabbed, message)
      if (!valid) {
        throw new ArgumentError(`Provided argument "${arg.name}" should be of type ${arg.type.name}`)
      } else if (valid === 'toobroad') {
        throw new ArgumentError(`Provided argument "${arg.name}" was too broad; please be more specific`)
      }
    }
    if (arg.transform) grabbed = arg.transform(grabbed, message)
    // Set
    argsCollection.set(arg.name, grabbed)
  }
  return argsCollection
}
