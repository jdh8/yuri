import defaultTypes from './defaults'

const defaultNames = new Set(Object.values(defaultTypes).map(type => type.name))

export function processDefaultTypes (disabled) {
  const exclude = new Set(disabled)
  for (const type of exclude) {
    if (!defaultNames.has(type)) {
      throw new RangeError(`Default type "${type}" cannot be found`)
    }
  }
  return Object.values(defaultTypes).filter(type => !exclude.has(type.name))
}
