const {Collection} = require('discord.js')
const {ArgumentHandler} = require('./handler')

class ArgumentProcessor {
  constructor ({args}) {
    const argsClctn = args instanceof Collection
      ? args
      : new Collection(Object.values(args).map(arg => [arg.name, arg]))
    argsClctn.forEach((arg, name) => {
      argsClctn.set(name, arg instanceof ArgumentHandler
        ? arg
        : new ArgumentHandler(arg)
      )
    })
    this.args = argsClctn
  }
  process ({args: argsString, message}) {
    const argsObject = new Collection()
    let remaining = argsString
    for (const [name, arg] of this.args) {
      let grabbed
      ({grabbed, remaining} = arg.handle({args: remaining, message}))
      argsObject.set(name, grabbed)
    }
    return argsObject
  }
}

module.exports = {
  ArgumentProcessor
}
