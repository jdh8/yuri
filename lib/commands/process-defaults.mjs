import defaultCommands from './defaults'

const defaultNames = new Set(Object.values(defaultCommands).map(event => event.name))

export function processDefaultCommands (disabled) {
  const exclude = new Set(disabled)
  for (const command of exclude) {
    if (!defaultNames.has(command)) {
      throw new RangeError(`Default command "${command}" cannot be found!`)
    }
  }
  return Object.values(defaultCommands).filter(command => !exclude.has(command.name))
}
